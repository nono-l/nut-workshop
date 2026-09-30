import { COLOR_PALETTE, type ColorId, type LevelDef } from "./types";
import { cloneLevel, rememberLevel } from "./levels";
import { sfxUnscrew, sfxWhoosh, sfxWood } from "./audio";

export type ToolMode = "none" | "hammer" | "mallet";

const GRAVITY = 1280;
const MAX_FALL = 1100;


type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  kind: "star" | "heart" | "moon" | "spark";
  rot: number;
  vr: number;
  size: number;
  color: string;
};

type Screw = {
  c: number;
  r: number;
  key: string;
  x: number;
  y: number;
  alive: boolean;
  anim: number;
  dying: boolean;
};

type Plank = {
  id: number;
  color: ColorId;
  z: number;
  holes: { c: number; r: number; lx: number; ly: number }[];
  anchors: string[];
  x: number;
  y: number;
  angle: number;
  length: number;
  thick: number;
  removed: boolean;
  fly: number;
  flyVx: number;
  flyVy: number;
  wiggle: number;
  seed: number;
  vx: number;
  vy: number;
  av: number;
};

type Drag =
  | {
      kind: "move";
      plank: Plank;
      lx: number;
      ly: number;
      lastX: number;
      lastY: number;
      lastT: number;
      av: number;
      vx: number;
      vy: number;
      pointerId: number;
    }
  | {
      kind: "pivot";
      plank: Plank;
      pivotX: number;
      pivotY: number;
      grabAngle: number;
      baseAngle: number;
      pointerId: number;
      lastT: number;
      lastAngle: number;
    };

type Snapshot = {
  screws: { key: string; c: number; r: number; alive: boolean }[];
  planks: {
    id: number;
    anchors: string[];
    x: number;
    y: number;
    angle: number;
    removed: boolean;
  }[];
};

type RewindFrame = {
  timeLeft: number;
  won: boolean;
  lost: boolean;
  held: string | null;
  placing: { key: string; fromX: number; fromY: number; toC: number; toR: number; t: number } | null;
  screws: { key: string; c: number; r: number; x: number; y: number; alive: boolean; anim: number; dying: boolean }[];
  planks: {
    id: number;
    anchors: string[];
    x: number;
    y: number;
    angle: number;
    removed: boolean;
    fly: number;
    flyVx: number;
    flyVy: number;
    vx: number;
    vy: number;
    av: number;
    wiggle: number;
  }[];
};

type PlaceAnim = {
  s: Screw;
  fromX: number;
  fromY: number;
  toC: number;
  toR: number;
  t: number;
};

function gcd(a: number, b: number): number {
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function holesFit(holes: { c: number; r: number }[], cols: number, rows: number) {
  const seen = new Set<string>();
  for (const hole of holes) {
    if (!Number.isInteger(hole.c) || !Number.isInteger(hole.r)) return false;
    if (hole.c < 0 || hole.r < 0 || hole.c >= cols || hole.r >= rows) return false;
    const key = `${hole.c},${hole.r}`;
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return holes.length > 0;
}

function shiftOntoBoard(holes: { c: number; r: number }[], cols: number, rows: number) {
  const cs = holes.map((hole) => hole.c);
  const rs = holes.map((hole) => hole.r);
  const minC = Math.min(...cs);
  const maxC = Math.max(...cs);
  const minR = Math.min(...rs);
  const maxR = Math.max(...rs);
  if (maxC - minC >= cols || maxR - minR >= rows) return null;
  let dc = 0;
  let dr = 0;
  if (minC < 0) dc = -minC;
  if (maxC + dc >= cols) dc = cols - 1 - maxC;
  if (minR < 0) dr = -minR;
  if (maxR + dr >= rows) dr = rows - 1 - maxR;
  const next = holes.map((hole) => ({ c: hole.c + dc, r: hole.r + dr }));
  return holesFit(next, cols, rows) ? next : null;
}

const EIGHT_DIRS = [
  { c: 1, r: 0 },
  { c: 1, r: 1 },
  { c: 0, r: 1 },
  { c: -1, r: 1 },
  { c: -1, r: 0 },
  { c: -1, r: -1 },
  { c: 0, r: -1 },
  { c: 1, r: -1 },
];

function rotateStraight(holes: { c: number; r: number }[]) {
  if (holes.length < 2) return null;
  let dir = -1;
  let gap = 0;
  for (let i = 1; i < holes.length; i++) {
    const dc = holes[i]!.c - holes[i - 1]!.c;
    const dr = holes[i]!.r - holes[i - 1]!.r;
    const g = gcd(Math.abs(dc), Math.abs(dr));
    if (g === 0) return null;
    const index = EIGHT_DIRS.findIndex((step) => step.c === dc / g && step.r === dr / g);
    if (index < 0) return null;
    if (i === 1) {
      dir = index;
      gap = g;
    } else if (index !== dir || g !== gap) {
      return null;
    }
  }
  const next = EIGHT_DIRS[(dir + 1) % EIGHT_DIRS.length]!;
  const pivot = holes[0]!;
  return holes.map((_, i) => ({
    c: pivot.c + next.c * gap * i,
    r: pivot.r + next.r * gap * i,
  }));
}

function rotateQuarter(holes: { c: number; r: number }[]) {
  const pivot = holes[0]!;
  return holes.map((hole) => ({
    c: pivot.c - (hole.r - pivot.r),
    r: pivot.r + (hole.c - pivot.c),
  }));
}

const PLANK_COLORS: ColorId[] = ["oak", "green", "honey", "cedar", "sage"];

export type EditSelection =
  | { kind: "plank"; id: number }
  | { kind: "plank-hole"; id: number; index: number }
  | { kind: "hole"; c: number; r: number };

function easeOutCubic(t: number) {
  const u = 1 - Math.min(1, Math.max(0, t));
  return 1 - u * u * u;
}

function extent(p: Plank) {
  const c = Math.cos(p.angle);
  const s = Math.sin(p.angle);
  return {
    x: Math.abs(c) * (p.length / 2) + Math.abs(s) * (p.thick / 2),
    y: Math.abs(s) * (p.length / 2) + Math.abs(c) * (p.thick / 2),
  };
}

export class World {
  level: LevelDef;
  cols: number;
  rows: number;
  cell = 64;
  originX = 0;
  originY = 0;
  boardX = 0;
  boardY = 0;
  boardW = 0;
  boardH = 0;
  cssW = 0;
  cssH = 0;
  screws = new Map<string, Screw>();
  planks: Plank[] = [];
  particles: Particle[] = [];
  drag: Drag | null = null;
  held: Screw | null = null;
  placing: PlaceAnim | null = null;
  tool: ToolMode = "none";
  timeLeft: number;
  timeLimit: number;
  paused = false;
  won = false;
  lost = false;
  justWon = false;
  justLost = false;
  trauma = 0;
  checkT = 0;
  tutorialStep: 0 | 1 | 2 | 3;
  reducedMotion = false;
  shakeOn = true;
  freezeClock = false;
  gravityOff = false;
  editing = false;
  testing = false;
  addArmed = false;
  drillArmed = false;
  selection: EditSelection | null = null;
  hitstop = 0;
  history: Snapshot[] = [];
  rewindHeld = false;
  private rewindLog: { t: number; state: RewindFrame }[] = [];
  hint = "";
  pulse = 0;
  private prevWin = false;
  private prevLose = false;
  private editDrag: {
    plank: Plank;
    pointerId: number;
    origin: { c: number; r: number }[];
    startX: number;
    startY: number;
    dc: number;
    dr: number;
  } | null = null;
  private editPress: { x: number; y: number; pointerId: number; plankId: number | null } | null = null;
  private testSnap: Snapshot | null = null;

  constructor(
    level: LevelDef,
    public levelNum: number,
    opts?: { reducedMotion?: boolean; shake?: boolean },
  ) {
    this.level = cloneLevel(level);
    this.cols = level.cols;
    this.rows = level.rows;
    this.timeLimit = level.time;
    this.timeLeft = level.time;
    this.tutorialStep = levelNum <= 2 ? 1 : 0;
    this.reducedMotion = !!opts?.reducedMotion;
    this.shakeOn = opts?.shake !== false;
    this.rebuild(360, 480);
  }

  rebuild(cssW: number, cssH: number) {
    const oldCell = this.cell;
    const oldOX = this.originX;
    const oldOY = this.originY;
    this.cssW = cssW;
    this.cssH = cssH;
    const pad = 18;
    this.boardX = pad;
    this.boardY = pad;
    this.boardW = cssW - pad * 2;
    this.boardH = cssH - pad * 2;
    const cell = Math.min(this.boardW / (this.cols + 0.35), this.boardH / (this.rows + 0.35));
    this.cell = cell;
    const gridW = cell * this.cols;
    const gridH = cell * this.rows;
    this.originX = this.boardX + (this.boardW - gridW) / 2;
    this.originY = this.boardY + (this.boardH - gridH) / 2;
    if (this.planks.length === 0) {
      this.initPieces();
      return;
    }
    this.relayoutScrews();
    const sx = oldCell > 0 ? this.cell / oldCell : 1;
    for (const p of this.planks) {
      if (p.removed) continue;
      this.refreshPlankMetrics(p);
      if (p.anchors.length >= 2 && p.fly === 0) {
        this.snapToAnchors(p);
      } else if (p.anchors.length === 1 && p.fly === 0 && this.drag?.kind !== "pivot") {
        this.attachToPivot(p);
      } else {
        p.x = this.originX + (p.x - oldOX) * sx;
        p.y = this.originY + (p.y - oldOY) * sx;
        p.vx *= sx;
        p.vy *= sx;
      }
    }
  }

  private refreshPlankMetrics(p: Plank) {
    const pts = p.holes.map((h) => {
      const w = this.holePos(h.c, h.r);
      return { c: h.c, r: h.r, x: w.x, y: w.y };
    });
    const hx = pts.reduce((s, q) => s + q.x, 0) / pts.length;
    const hy = pts.reduce((s, q) => s + q.y, 0) / pts.length;
    const a = Math.atan2(pts[pts.length - 1]!.y - pts[0]!.y, pts[pts.length - 1]!.x - pts[0]!.x);
    const dist = Math.hypot(pts[pts.length - 1]!.x - pts[0]!.x, pts[pts.length - 1]!.y - pts[0]!.y);
    p.thick = this.cell * 0.62;
    p.length = dist + p.thick;
    p.holes = pts.map((q) => {
      const dx = q.x - hx;
      const dy = q.y - hy;
      const ca = Math.cos(-a);
      const sa = Math.sin(-a);
      return { c: q.c, r: q.r, lx: dx * ca - dy * sa, ly: dx * sa + dy * ca };
    });
  }

  private snapPlankHome(p: Plank) {
    const pts = p.holes.map((h) => this.holePos(h.c, h.r));
    p.x = pts.reduce((s, q) => s + q.x, 0) / pts.length;
    p.y = pts.reduce((s, q) => s + q.y, 0) / pts.length;
    p.angle = Math.atan2(pts[pts.length - 1]!.y - pts[0]!.y, pts[pts.length - 1]!.x - pts[0]!.x);
  }

  holePos(c: number, r: number) {
    return {
      x: this.originX + (c + 0.5) * this.cell,
      y: this.originY + (r + 0.5) * this.cell,
    };
  }

  private initPieces() {
    this.rewindLog = [];
    this.rewindHeld = false;
    this.screws.clear();
    this.planks = [];
    const open = new Set((this.level.open ?? []).map(([c, r]) => `${c},${r}`));
    const occupied = new Set<string>();

    this.level.planks.forEach((def, i) => {
      const pts = def.holes.map(([c, r]) => {
        const p = this.holePos(c, r);
        return { c, r, x: p.x, y: p.y };
      });
      const x = pts.reduce((s, p) => s + p.x, 0) / pts.length;
      const y = pts.reduce((s, p) => s + p.y, 0) / pts.length;
      const a = Math.atan2(pts[pts.length - 1]!.y - pts[0]!.y, pts[pts.length - 1]!.x - pts[0]!.x);
      const dist = Math.hypot(pts[pts.length - 1]!.x - pts[0]!.x, pts[pts.length - 1]!.y - pts[0]!.y);
      const thick = this.cell * 0.62;
      const holes = pts.map((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        const ca = Math.cos(-a);
        const sa = Math.sin(-a);
        return { c: p.c, r: p.r, lx: dx * ca - dy * sa, ly: dx * sa + dy * ca };
      });
      const anchors: string[] = [];
      for (const h of def.holes) {
        const key = `${h[0]},${h[1]}`;
        occupied.add(key);
        if (!open.has(key)) anchors.push(key);
      }
      this.planks.push({
        id: i,
        color: def.color,
        z: def.z,
        holes,
        anchors,
        x,
        y,
        angle: a,
        length: dist + thick,
        thick,
        removed: false,
        fly: 0,
        flyVx: 0,
        flyVy: 0,
        wiggle: 0,
        seed: (i + 1) * 9973,
        vx: 0,
        vy: 0,
        av: 0,
      });
    });

    for (const key of occupied) {
      if (open.has(key)) continue;
      const [c, r] = key.split(",").map(Number) as [number, number];
      const p = this.holePos(c, r);
      this.screws.set(key, { c, r, key, x: p.x, y: p.y, alive: true, anim: 0, dying: false });
    }
  }

  private relayoutScrews() {
    for (const s of this.screws.values()) {
      const p = this.holePos(s.c, s.r);
      s.x = p.x;
      s.y = p.y;
    }
  }

  private snap(): Snapshot {
    return {
      screws: [...this.screws.values()]
        .filter((s) => s.alive && !s.dying)
        .map((s) => ({ key: s.key, c: s.c, r: s.r, alive: true })),
      planks: this.planks.map((p) => ({
        id: p.id,
        anchors: [...p.anchors],
        x: p.x,
        y: p.y,
        angle: p.angle,
        removed: p.removed,
      })),
    };
  }

  private applySnapshot(last: Snapshot) {
    this.held = null;
    this.placing = null;
    this.hint = "";
    this.screws.clear();
    for (const s of last.screws) {
      const p = this.holePos(s.c, s.r);
      this.screws.set(s.key, {
        key: s.key,
        c: s.c,
        r: s.r,
        x: p.x,
        y: p.y,
        alive: true,
        anim: 0,
        dying: false,
      });
    }
    for (const sp of last.planks) {
      const p = this.planks.find((x) => x.id === sp.id);
      if (!p) continue;
      p.anchors = [...sp.anchors];
      p.x = sp.x;
      p.y = sp.y;
      p.angle = sp.angle;
      p.removed = sp.removed;
      p.fly = 0;
      p.vx = 0;
      p.vy = 0;
      p.av = 0;
    }
    this.drag = null;
  }

  rewindSpan() {
    let total = 0;
    for (const frame of this.rewindLog) total += frame.t;
    return Math.min(15, total);
  }

  private captureRewind(): RewindFrame {
    return {
      timeLeft: this.timeLeft,
      won: this.won,
      lost: this.lost,
      held: this.held?.key ?? null,
      placing: this.placing
        ? {
            key: this.placing.s.key,
            fromX: this.placing.fromX,
            fromY: this.placing.fromY,
            toC: this.placing.toC,
            toR: this.placing.toR,
            t: this.placing.t,
          }
        : null,
      screws: [...this.screws.values()].map((screw) => ({
        key: screw.key,
        c: screw.c,
        r: screw.r,
        x: screw.x,
        y: screw.y,
        alive: screw.alive,
        anim: screw.anim,
        dying: screw.dying,
      })),
      planks: this.planks.map((plank) => ({
        id: plank.id,
        anchors: [...plank.anchors],
        x: plank.x,
        y: plank.y,
        angle: plank.angle,
        removed: plank.removed,
        fly: plank.fly,
        flyVx: plank.flyVx,
        flyVy: plank.flyVy,
        vx: plank.vx,
        vy: plank.vy,
        av: plank.av,
        wiggle: plank.wiggle,
      })),
    };
  }

  private applyRewind(state: RewindFrame) {
    this.screws.clear();
    for (const screw of state.screws) this.screws.set(screw.key, { ...screw });
    this.held = state.held ? (this.screws.get(state.held) ?? null) : null;
    if (state.placing) {
      const screw = this.screws.get(state.placing.key);
      this.placing = screw
        ? {
            s: screw,
            fromX: state.placing.fromX,
            fromY: state.placing.fromY,
            toC: state.placing.toC,
            toR: state.placing.toR,
            t: state.placing.t,
          }
        : null;
    } else {
      this.placing = null;
    }
    for (const saved of state.planks) {
      const plank = this.planks.find((item) => item.id === saved.id);
      if (!plank) continue;
      plank.anchors = [...saved.anchors];
      plank.x = saved.x;
      plank.y = saved.y;
      plank.angle = saved.angle;
      plank.removed = saved.removed;
      plank.fly = saved.fly;
      plank.flyVx = saved.flyVx;
      plank.flyVy = saved.flyVy;
      plank.vx = saved.vx;
      plank.vy = saved.vy;
      plank.av = saved.av;
      plank.wiggle = saved.wiggle;
    }
    this.drag = null;
    this.timeLeft = state.timeLeft;
    this.won = state.won;
    this.lost = state.lost;
    this.prevWin = state.won;
    this.prevLose = state.lost;
    if (!state.won) this.checkT = 0;
    this.history = [];
  }

  private recordRewind(dt: number) {
    if (dt <= 0) return;
    this.rewindLog.push({ t: dt, state: this.captureRewind() });
    let total = 0;
    for (const frame of this.rewindLog) total += frame.t;
    while (total > 15 && this.rewindLog.length > 1) {
      total -= this.rewindLog.shift()!.t;
    }
  }

  private scrubRewind(dt: number) {
    let left = dt;
    while (left > 0 && this.rewindLog.length > 1) {
      const last = this.rewindLog[this.rewindLog.length - 1]!;
      if (last.t > left) {
        last.t -= left;
        left = 0;
      } else {
        left -= last.t;
        this.rewindLog.pop();
      }
    }
    const frame = this.rewindLog[this.rewindLog.length - 1];
    if (frame) this.applyRewind(frame.state);
  }

  undo(): boolean {
    const last = this.history.pop();
    if (!last || this.won || this.lost) return false;
    this.applySnapshot(last);
    return true;
  }

  setPaused(v: boolean) {
    this.paused = v;
  }

  setTool(t: ToolMode) {
    this.tool = t;
    this.hint = t === "hammer" ? "hammer" : t === "mallet" ? "mallet" : "";
  }

  setEditing(on: boolean) {
    if (on === this.editing) return;
    if (!on && this.testing && this.testSnap) this.applySnapshot(this.testSnap);
    this.editing = on;
    this.testing = false;
    this.testSnap = null;
    this.addArmed = false;
    this.drillArmed = false;
    this.editDrag = null;
    this.editPress = null;
    this.drag = null;
    this.selection = null;
    if (on) {
      this.tool = "none";
      this.hint = "";
      if (this.held) this.cancelHeld();
      this.placing = null;
      this.gravityOff = true;
      this.won = false;
      this.lost = false;
      this.justWon = false;
      this.justLost = false;
      this.prevWin = false;
      this.prevLose = false;
      this.history = [];
      this.initPieces();
      return;
    }
    this.gravityOff = false;
  }

  setTesting(on: boolean) {
    if (!this.editing || on === this.testing) return;
    this.held = null;
    this.placing = null;
    this.drag = null;
    this.editDrag = null;
    this.editPress = null;
    this.addArmed = false;
    this.drillArmed = false;
    this.selection = null;
    this.tool = "none";
    this.hint = "";
    if (on) {
      this.won = false;
      this.lost = false;
      this.justWon = false;
      this.justLost = false;
      this.history = [];
      this.testSnap = this.snap();
      this.testing = true;
      return;
    }
    this.testing = false;
    if (this.testSnap) this.applySnapshot(this.testSnap);
    this.testSnap = null;
  }

  setGravityOff(on: boolean) {
    this.gravityOff = on;
    if (!on) return;
    for (const plank of this.planks) {
      plank.vx = 0;
      plank.vy = 0;
      plank.av = 0;
    }
  }

  resizeBoard(axis: "col" | "row", delta: 1 | -1): "ok" | "limit" | "fit" {
    const cols = this.cols + (axis === "col" ? delta : 0);
    const rows = this.rows + (axis === "row" ? delta : 0);
    if (cols < 2 || rows < 2 || cols > 8 || rows > 8) return "limit";
    const hangs = this.planks.some(
      (plank) => !plank.removed && plank.holes.some((hole) => hole.c >= cols || hole.r >= rows),
    );
    if (hangs) return "fit";
    this.cols = cols;
    this.rows = rows;
    this.level.cols = cols;
    this.level.rows = rows;
    if (this.level.blank) {
      const blank = this.level.blank.filter(([c, r]) => c < cols && r < rows);
      this.level.blank = blank.length ? blank : undefined;
    }
    if (this.level.open) {
      const open = this.level.open.filter(([c, r]) => c < cols && r < rows);
      this.level.open = open.length ? open : undefined;
    }
    const sel = this.selection;
    if (sel?.kind === "hole" && (sel.c >= cols || sel.r >= rows)) this.selection = null;
    this.rebuild(this.cssW || 360, this.cssH || 480);
    this.remember();
    return "ok";
  }

  rotateSelected(): "ok" | "none" | "blocked" {
    const plank = this.selectedPlank();
    if (!plank || plank.holes.length === 0) return "none";
    const rotated = rotateStraight(plank.holes) ?? rotateQuarter(plank.holes);
    const fitted = shiftOntoBoard(rotated, this.cols, this.rows);
    if (!fitted) return "blocked";
    this.applyHoles(plank, fitted);
    return "ok";
  }

  resizeSelected(grow: boolean): "ok" | "none" | "blocked" | "short" {
    const plank = this.selectedPlank();
    if (!plank || plank.holes.length === 0) return "none";
    const end = this.resizeEnd(plank);
    if (!grow) {
      if (plank.holes.length <= 1) return "short";
      const next = plank.holes.filter((_, index) => index !== end).map((hole) => ({ c: hole.c, r: hole.r }));
      this.applyHoles(plank, next);
      this.focusResizedEnd(plank, end === 0);
      return "ok";
    }
    const step = this.outwardStep(plank, end);
    if (!step) return "blocked";
    const origin = plank.holes[end]!;
    const cell = { c: origin.c + step.c, r: origin.r + step.r };
    const next = plank.holes.map((hole) => ({ c: hole.c, r: hole.r }));
    if (end === 0 && plank.holes.length > 1) next.unshift(cell);
    else next.push(cell);
    if (!holesFit(next, this.cols, this.rows)) return "blocked";
    this.applyHoles(plank, next);
    this.focusResizedEnd(plank, end === 0 && next.length > 2);
    return "ok";
  }

  private resizeEnd(plank: Plank) {
    const last = plank.holes.length - 1;
    const sel = this.selection;
    if (sel?.kind === "plank-hole" && sel.id === plank.id && sel.index === 0 && last > 0) return 0;
    return last;
  }

  private outwardStep(plank: Plank, end: number) {
    const holes = plank.holes;
    if (holes.length < 2) {
      const options = [
        { c: 1, r: 0 },
        { c: 0, r: 1 },
        { c: -1, r: 0 },
        { c: 0, r: -1 },
      ];
      const origin = holes[0]!;
      return (
        options.find((step) =>
          holesFit([{ c: origin.c + step.c, r: origin.r + step.r }], this.cols, this.rows),
        ) ?? null
      );
    }
    const from = end === 0 ? holes[1]! : holes[holes.length - 2]!;
    const to = holes[end]!;
    const dc = to.c - from.c;
    const dr = to.r - from.r;
    const g = gcd(Math.abs(dc), Math.abs(dr));
    if (g === 0) return null;
    return { c: dc / g, r: dr / g };
  }

  private focusResizedEnd(plank: Plank, atStart: boolean) {
    if (this.selection?.kind !== "plank-hole" || this.selection.id !== plank.id) return;
    const index = atStart ? 0 : plank.holes.length - 1;
    this.selection = { kind: "plank-hole", id: plank.id, index };
  }

  cycleColor(): boolean {
    const plank = this.selectedPlank();
    if (!plank) return false;
    const index = PLANK_COLORS.indexOf(plank.color);
    plank.color = PLANK_COLORS[(index + 1) % PLANK_COLORS.length]!;
    this.writeBack();
    this.remember();
    return true;
  }

  deleteSelected(): "ok" | "none" | "last" {
    const sel = this.selection;
    if (!sel) return "none";
    if (sel.kind === "plank") return this.deletePlank(sel.id);
    if (sel.kind === "plank-hole") return this.deletePlankHole(sel.id, sel.index);
    return this.deleteBoardHole(sel.c, sel.r);
  }

  private deletePlank(id: number): "ok" | "none" | "last" {
    const index = this.planks.findIndex((plank) => plank.id === id && !plank.removed);
    if (index < 0) return "none";
    if (this.planks.filter((plank) => !plank.removed).length <= 1) return "last";
    this.planks.splice(index, 1);
    this.selection = null;
    this.writeBack();
    this.resyncScrews();
    this.remember();
    return "ok";
  }

  private deletePlankHole(id: number, index: number): "ok" | "none" | "last" {
    const plank = this.planks.find((item) => item.id === id && !item.removed);
    if (!plank || index < 0 || index >= plank.holes.length) return "none";
    const next = plank.holes.filter((_, holeIndex) => holeIndex !== index);
    if (next.length === 0) return this.deletePlank(id);
    this.selection = null;
    this.applyHoles(plank, next);
    return "ok";
  }

  private deleteBoardHole(c: number, r: number): "ok" | "none" | "last" {
    if (!this.isBoardHole(c, r)) return "none";
    const key = `${c},${r}`;
    const emptied = this.planks.filter((plank) => !plank.removed && plank.holes.every((hole) => `${hole.c},${hole.r}` === key));
    const survivors = this.planks.filter((plank) => !plank.removed && !emptied.includes(plank));
    if (survivors.length === 0) return "last";
    for (const plank of this.planks) {
      if (plank.removed) continue;
      plank.holes = plank.holes.filter((hole) => hole.c !== c || hole.r !== r);
    }
    this.planks = this.planks.filter((plank) => plank.removed || plank.holes.length > 0);
    const blank = this.level.blank ? [...this.level.blank] : [];
    if (!blank.some((hole) => hole[0] === c && hole[1] === r)) blank.push([c, r]);
    this.level.blank = blank;
    this.selection = null;
    this.writeBack();
    this.resyncScrews();
    this.remember();
    return "ok";
  }

  private selectedPlank() {
    const sel = this.selection;
    if (!sel || sel.kind === "hole") return null;
    return this.planks.find((plank) => plank.id === sel.id && !plank.removed && plank.fly === 0) ?? null;
  }

  private cellAt(x: number, y: number) {
    let best: { c: number; r: number } | null = null;
    let bestD = this.cell * 0.48;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const pos = this.holePos(c, r);
        const dist = Math.hypot(pos.x - x, pos.y - y);
        if (dist < bestD) {
          best = { c, r };
          bestD = dist;
        }
      }
    }
    return best;
  }

  private addPlankAt(c: number, r: number) {
    const neighbors: [number, number][] = [
      [c + 1, r],
      [c, r + 1],
      [c - 1, r],
      [c, r - 1],
    ];
    const second = neighbors.find(([nc, nr]) => this.isBoardHole(nc, nr));
    const holes = second ? [{ c, r }, { c: second[0], r: second[1] }] : [{ c, r }];
    const id = this.planks.reduce((max, plank) => Math.max(max, plank.id), -1) + 1;
    const z = this.planks.reduce((max, plank) => Math.max(max, plank.z), 0) + 1;
    const color = PLANK_COLORS[this.planks.length % PLANK_COLORS.length]!;
    const plank: Plank = {
      id,
      color,
      z,
      holes: [],
      anchors: [],
      x: 0,
      y: 0,
      angle: 0,
      length: this.cell,
      thick: this.cell * 0.62,
      removed: false,
      fly: 0,
      flyVx: 0,
      flyVy: 0,
      wiggle: 0,
      seed: (id + 1) * 9973,
      vx: 0,
      vy: 0,
      av: 0,
    };
    this.planks.push(plank);
    this.selection = { kind: "plank", id };
    this.clearBlank(holes);
    this.applyHoles(plank, holes);
  }

  private applyHoles(plank: Plank, holes: { c: number; r: number }[]) {
    plank.holes = holes.map((hole) => ({ c: hole.c, r: hole.r, lx: 0, ly: 0 }));
    this.clearBlank(holes);
    this.writeBack();
    this.resyncScrews();
    this.remember();
  }

  private clearBlank(holes: { c: number; r: number }[]) {
    if (!this.level.blank?.length) return;
    const kill = new Set(holes.map((hole) => `${hole.c},${hole.r}`));
    const next = this.level.blank.filter(([c, r]) => !kill.has(`${c},${r}`));
    this.level.blank = next.length ? next : undefined;
  }

  private isBoardHole(c: number, r: number) {
    if (c < 0 || r < 0 || c >= this.cols || r >= this.rows) return false;
    return !(this.level.blank ?? []).some((hole) => hole[0] === c && hole[1] === r);
  }

  private sameSelection(a: EditSelection, b: EditSelection) {
    if (a.kind !== b.kind) return false;
    if (a.kind === "hole" && b.kind === "hole") return a.c === b.c && a.r === b.r;
    if (a.kind === "plank" && b.kind === "plank") return a.id === b.id;
    if (a.kind === "plank-hole" && b.kind === "plank-hole") return a.id === b.id && a.index === b.index;
    return false;
  }

  private editCandidates(x: number, y: number): EditSelection[] {
    const list: EditSelection[] = [];
    const planks = this.planks
      .filter((plank) => !plank.removed && plank.fly === 0)
      .sort((a, b) => b.z - a.z || b.id - a.id);
    const holeR = this.cell * 0.28;
    for (const plank of planks) {
      plank.holes.forEach((hole, index) => {
        const pos = this.worldHole(plank, hole);
        if (Math.hypot(pos.x - x, pos.y - y) <= holeR) {
          list.push({ kind: "plank-hole", id: plank.id, index });
        }
      });
    }
    for (const plank of planks) {
      if (this.plankContains(plank, x, y, 4)) list.push({ kind: "plank", id: plank.id });
    }
    const cell = this.cellAt(x, y);
    if (cell && this.isBoardHole(cell.c, cell.r)) list.push({ kind: "hole", c: cell.c, r: cell.r });
    return list;
  }

  private selectAt(x: number, y: number) {
    const options = this.editCandidates(x, y);
    if (options.length === 0) {
      this.selection = null;
      return;
    }
    const current = this.selection;
    const index = current ? options.findIndex((option) => this.sameSelection(option, current)) : -1;
    this.selection = options[(index + 1) % options.length] ?? null;
  }

  private writeBack() {
    this.level.planks = this.planks
      .filter((plank) => !plank.removed)
      .sort((a, b) => a.id - b.id)
      .map((plank) => ({
        color: plank.color,
        z: plank.z,
        holes: plank.holes.map((hole) => [hole.c, hole.r] as [number, number]),
      }));
  }

  private remember() {
    this.rememberLevel();
  }

  private rememberLevel() {
    rememberLevel(this.levelNum, this.level);
  }

  private resyncScrews() {
    const open = new Set((this.level.open ?? []).map(([c, r]) => `${c},${r}`));
    const occupied = new Set<string>();
    for (const plank of this.planks) {
      if (plank.removed) continue;
      for (const hole of plank.holes) occupied.add(`${hole.c},${hole.r}`);
    }
    for (const key of [...this.screws.keys()]) {
      if (!occupied.has(key) || open.has(key)) this.screws.delete(key);
    }
    for (const key of occupied) {
      if (open.has(key) || this.screws.has(key)) continue;
      const [c, r] = key.split(",").map(Number) as [number, number];
      const pos = this.holePos(c, r);
      this.screws.set(key, { c, r, key, x: pos.x, y: pos.y, alive: true, anim: 0, dying: false });
    }
    for (const plank of this.planks) {
      if (plank.removed) continue;
      const anchors: string[] = [];
      for (const hole of plank.holes) {
        const key = `${hole.c},${hole.r}`;
        if (this.screws.get(key)?.alive) anchors.push(key);
      }
      plank.anchors = anchors;
      plank.fly = 0;
      plank.vx = 0;
      plank.vy = 0;
      plank.av = 0;
      this.refreshPlankMetrics(plank);
      this.snapPlankHome(plank);
      if (plank.anchors.length >= 2) this.snapToAnchors(plank);
      else if (plank.anchors.length === 1) this.attachToPivot(plank);
    }
    if (this.level.open) {
      const still = this.level.open.filter(([c, r]) => occupied.has(`${c},${r}`));
      this.level.open = still.length ? still : undefined;
    }
  }

  private editPointerDown(x: number, y: number, pointerId: number) {
    if (this.addArmed) {
      const cell = this.cellAt(x, y);
      if (!cell || !this.isBoardHole(cell.c, cell.r)) return;
      this.addArmed = false;
      this.addPlankAt(cell.c, cell.r);
      return;
    }
    if (this.drillArmed) {
      const cell = this.cellAt(x, y);
      if (!cell) return;
      this.drillAt(cell.c, cell.r);
      return;
    }
    const plank = this.hitPlank(x, y, true);
    this.editDrag = null;
    this.editPress = { x, y, pointerId, plankId: plank?.id ?? null };
  }

  private drillAt(c: number, r: number) {
    const wasBlank = !this.isBoardHole(c, r);
    this.clearBlank([{ c, r }]);
    const pos = this.holePos(c, r);
    const plank = this.planks
      .filter((item) => !item.removed && item.fly === 0 && this.plankContains(item, pos.x, pos.y, 2))
      .sort((a, b) => b.z - a.z || b.id - a.id)[0];
    if (plank) {
      const existing = plank.holes.findIndex((hole) => hole.c === c && hole.r === r);
      if (existing >= 0) {
        this.selection = { kind: "plank-hole", id: plank.id, index: existing };
        if (wasBlank) this.resyncScrews();
        this.remember();
        return;
      }
      const next = this.withDrilledHole(plank, { c, r });
      if (next && holesFit(next, this.cols, this.rows)) {
        const index = next.findIndex((hole) => hole.c === c && hole.r === r);
        this.applyHoles(plank, next);
        this.selection = { kind: "plank-hole", id: plank.id, index: Math.max(0, index) };
        return;
      }
    }
    this.selection = { kind: "hole", c, r };
    if (wasBlank) this.resyncScrews();
    this.remember();
  }

  private withDrilledHole(plank: Plank, cell: { c: number; r: number }) {
    const holes = plank.holes.map((hole) => ({ c: hole.c, r: hole.r }));
    if (holes.length <= 1) return [...holes, cell];
    const a = holes[0]!;
    const b = holes[holes.length - 1]!;
    const abC = b.c - a.c;
    const abR = b.r - a.r;
    const len2 = abC * abC + abR * abR;
    if (len2 === 0) return [...holes, cell];
    const t = ((cell.c - a.c) * abC + (cell.r - a.r) * abR) / len2;
    const dist = Math.hypot(a.c + abC * t - cell.c, a.r + abR * t - cell.r);
    if (dist > 0.45) return null;
    let index = holes.length;
    for (let i = 0; i < holes.length; i++) {
      const hole = holes[i]!;
      const along = ((hole.c - a.c) * abC + (hole.r - a.r) * abR) / len2;
      if (t < along) {
        index = i;
        break;
      }
    }
    holes.splice(index, 0, cell);
    return holes;
  }

  private editPointerMove(x: number, y: number, pointerId: number) {
    const drag = this.editDrag;
    if (drag && drag.pointerId === pointerId) {
      const dc = Math.round((x - drag.startX) / this.cell);
      const dr = Math.round((y - drag.startY) / this.cell);
      if (dc === drag.dc && dr === drag.dr) return;
      const next = drag.origin.map((hole) => ({ c: hole.c + dc, r: hole.r + dr }));
      if (!holesFit(next, this.cols, this.rows)) return;
      drag.dc = dc;
      drag.dr = dr;
      this.applyHoles(drag.plank, next);
      return;
    }
    const press = this.editPress;
    if (!press || press.pointerId !== pointerId || press.plankId == null) return;
    if (Math.hypot(x - press.x, y - press.y) < Math.max(8, this.cell * 0.18)) return;
    const plank = this.planks.find((item) => item.id === press.plankId && !item.removed);
    if (!plank) return;
    this.editDrag = {
      plank,
      pointerId,
      origin: plank.holes.map((hole) => ({ c: hole.c, r: hole.r })),
      startX: press.x,
      startY: press.y,
      dc: 0,
      dr: 0,
    };
    this.editPress = null;
    this.editPointerMove(x, y, pointerId);
  }

  private editPointerUp(pointerId: number) {
    if (this.editDrag?.pointerId === pointerId) {
      this.editDrag = null;
      this.editPress = null;
      this.remember();
      return;
    }
    if (this.editPress?.pointerId !== pointerId) return;
    const press = this.editPress;
    this.editPress = null;
    this.selectAt(press.x, press.y);
  }

  holeKeys(): { c: number; r: number }[] {
    const blank = new Set((this.level.blank ?? []).map(([c, r]) => `${c},${r}`));
    const out: { c: number; r: number }[] = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (!blank.has(`${c},${r}`)) out.push({ c, r });
      }
    }
    return out;
  }

  private worldHole(plank: Plank, h: Plank["holes"][number]) {
    const ca = Math.cos(plank.angle);
    const sa = Math.sin(plank.angle);
    return { x: plank.x + h.lx * ca - h.ly * sa, y: plank.y + h.lx * sa + h.ly * ca };
  }

  plankContains(plank: Plank, x: number, y: number, inflate = 0) {
    const dx = x - plank.x;
    const dy = y - plank.y;
    const ca = Math.cos(-plank.angle);
    const sa = Math.sin(-plank.angle);
    const lx = dx * ca - dy * sa;
    const ly = dx * sa + dy * ca;
    const hw = plank.length / 2 + inflate;
    const hh = plank.thick / 2 + inflate;
    const r = hh;
    if (Math.abs(ly) > hh) return false;
    if (Math.abs(lx) <= hw - r) return true;
    const ex = Math.abs(lx) - (hw - r);
    return ex * ex + ly * ly <= (r + inflate) * (r + inflate);
  }

  private nearHole(plank: Plank, x: number, y: number) {
    const rad = this.cell * 0.26;
    for (const h of plank.holes) {
      const w = this.worldHole(plank, h);
      if (Math.hypot(w.x - x, w.y - y) < rad) return true;
    }
    return false;
  }

  private woodBlocksPoint(x: number, y: number) {
    let holeZ = -1;
    let woodZ = -1;
    for (const p of this.planks) {
      if (p.removed || p.fly > 0) continue;
      if (!this.plankContains(p, x, y, 1)) continue;
      if (this.nearHole(p, x, y)) holeZ = Math.max(holeZ, p.z);
      else woodZ = Math.max(woodZ, p.z);
    }
    return woodZ >= 0 && woodZ >= holeZ;
  }

  isCovered(screw: Screw): boolean {
    if (!screw.alive || screw.dying) return false;
    return this.woodBlocksPoint(screw.x, screw.y);
  }

  isHoleCovered(c: number, r: number): boolean {
    const pos = this.holePos(c, r);
    return this.woodBlocksPoint(pos.x, pos.y);
  }

  isDropTarget(c: number, r: number): boolean {
    if (!this.isBoardHole(c, r)) return false;
    const key = `${c},${r}`;
    if (this.held && this.held.key === key) return false;
    const occ = this.screws.get(key);
    if (occ && occ.alive && !occ.dying) return false;
    if (this.isHoleCovered(c, r)) return false;
    return true;
  }

  dropTargets(): { c: number; r: number; x: number; y: number }[] {
    const out: { c: number; r: number; x: number; y: number }[] = [];
    for (const h of this.holeKeys()) {
      if (!this.isDropTarget(h.c, h.r)) continue;
      const p = this.holePos(h.c, h.r);
      out.push({ c: h.c, r: h.r, x: p.x, y: p.y });
    }
    return out;
  }

  private emit(x: number, y: number, n: number, burst = false) {
    const kinds: Particle["kind"][] = ["star", "heart", "moon", "spark"];
    const colors = ["#F4E6C4", "#E8C35A", "#FFFFFF", "#C9A66B", "#7DA15C"];
    for (let i = 0; i < n; i++) {
      const a = burst ? (Math.PI * 2 * i) / n + Math.random() * 0.4 : Math.random() * Math.PI * 2;
      const sp = burst ? 80 + Math.random() * 140 : 40 + Math.random() * 90;
      this.particles.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - (burst ? 40 : 20),
        life: 0,
        max: burst ? 0.95 + Math.random() * 0.7 : 0.55 + Math.random() * 0.45,
        kind: kinds[i % kinds.length]!,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 8,
        size: 5 + Math.random() * 7,
        color: colors[i % colors.length]!,
      });
    }
    if (this.particles.length > 120) this.particles.splice(0, this.particles.length - 120);
  }

  private pickScrew(s: Screw, ignoreCover = false): boolean {
    if (!s.alive || s.dying || this.placing) return false;
    if (this.held === s) {
      this.cancelHeld();
      return false;
    }
    if (!ignoreCover && this.isCovered(s)) {
      this.trauma = Math.min(1, this.trauma + 0.18);
      return false;
    }
    if (this.held) this.cancelHeld();
    this.history.push(this.snap());
    if (this.history.length > 24) this.history.shift();
    this.held = s;
    s.anim = Math.max(s.anim, 0.001);
    this.hint = "place";
    sfxUnscrew();
    this.emit(s.x, s.y, 8);
    this.trauma = Math.min(1, this.trauma + 0.2);
    if (this.tutorialStep === 1) this.tutorialStep = 2;
    // 残りのネジがあればすぐぶら下がる。最後の1本は updateAnchors が元の穴に留め、置けてから落とす。
    this.syncAnchors();
    return true;
  }

  private cancelHeld() {
    if (!this.held || this.placing) return;
    const last = this.history.pop();
    if (last) {
      this.applySnapshot(last);
      return;
    }
    this.held.anim = 0;
    this.held = null;
    this.hint = "";
    this.syncAnchors();
  }

  private placeHeld(c: number, r: number): boolean {
    const s = this.held;
    if (!s || this.placing) return false;
    if (!this.isDropTarget(c, r)) {
      this.trauma = Math.min(1, this.trauma + 0.16);
      return false;
    }
    this.placing = { s, fromX: s.x, fromY: s.y, toC: c, toR: r, t: 0 };
    this.held = null;
    this.hint = "";
    sfxWood();
    return true;
  }

  private commitPlace(move: PlaceAnim) {
    const s = move.s;
    const dest = this.holePos(move.toC, move.toR);
    this.screws.delete(s.key);
    s.c = move.toC;
    s.r = move.toR;
    s.key = `${move.toC},${move.toR}`;
    s.x = dest.x;
    s.y = dest.y;
    s.anim = 0;
    s.dying = false;
    s.alive = true;
    this.screws.set(s.key, s);
    this.placing = null;
    this.hitstop = this.reducedMotion ? 0 : 0.05;
    this.emit(s.x, s.y, 10);
    this.syncAnchors();
    if (this.tutorialStep === 2) this.tutorialStep = 3;
  }

  private destroyScrew(s: Screw) {
    if (!s.alive || s.dying) return false;
    if (this.held === s) this.held = null;
    this.hint = "";
    this.history.push(this.snap());
    if (this.history.length > 24) this.history.shift();
    s.dying = true;
    s.anim = 0.001;
    sfxUnscrew();
    this.emit(s.x, s.y, 12);
    this.trauma = Math.min(1, this.trauma + 0.28);
    this.syncAnchors();
    return true;
  }

  private finishDestroy(s: Screw) {
    s.alive = false;
    s.anim = 0;
    s.dying = false;
    this.syncAnchors();
  }

  private liveScrews() {
    const out: Screw[] = [];
    for (const s of this.screws.values()) {
      if (!s.alive || s.dying) continue;
      // 盤に刺さっているネジだけ。持っている／飛んでいるネジを入れると板がついてくる。
      if (this.held === s) continue;
      if (this.placing?.s === s) continue;
      out.push(s);
    }
    return out;
  }

  private transitScrew(): Screw | null {
    return this.held ?? this.placing?.s ?? null;
  }

  private screwPlantedPos(s: Screw) {
    // 移動アニメの s.x は見た目だけ。留め具としては元の穴にいる。
    if (this.held === s || this.placing?.s === s) return this.holePos(s.c, s.r);
    return { x: s.x, y: s.y };
  }

  private closestHole(p: Plank, s: Screw, rad: number) {
    let best: Plank["holes"][number] | null = null;
    let bestD = rad;
    for (const h of p.holes) {
      const w = this.worldHole(p, h);
      const d = Math.hypot(w.x - s.x, w.y - s.y);
      if (d <= bestD) {
        best = h;
        bestD = d;
      }
    }
    return best;
  }

  private anchorHole(p: Plank, key: string) {
    const s = this.screws.get(key);
    if (s) {
      const h = this.closestHole(p, s, this.cell);
      if (h) return h;
    }
    return p.holes.find((hh) => `${hh.c},${hh.r}` === key) ?? p.holes[0]!;
  }

  private collectAnchors(p: Plank) {
    const out: string[] = [];
    const used = new Set<string>();
    const keepR = this.cell * 0.5;
    const catchR = this.cell * 0.32;
    for (const h of p.holes) {
      const w = this.worldHole(p, h);
      let best: Screw | null = null;
      let bestD = keepR;
      for (const s of this.liveScrews()) {
        if (used.has(s.key)) continue;
        const d = Math.hypot(w.x - s.x, w.y - s.y);
        if (d > keepR) continue;
        const already = p.anchors.includes(s.key);
        if (!already && d > catchR) continue;
        if (d < bestD) {
          best = s;
          bestD = d;
        }
      }
      if (best) {
        used.add(best.key);
        out.push(best.key);
      }
    }
    return out;
  }

  private syncAnchors() {
    for (const p of this.planks) {
      if (p.removed || p.fly > 0) continue;
      this.updateAnchors(p, true);
    }
  }

  private updateAnchors(p: Plank, allowRelease: boolean) {
    const was = p.anchors;
    const next = this.collectAnchors(p);
    const transit = this.transitScrew();
    if (next.length === 0 && transit && was.includes(transit.key)) {
      // 最後の1本は空き穴に置けて初めて外れる。持っているだけでは落とさないし、飛行にもついていかない。
      p.anchors = [transit.key];
      this.attachToPivot(p);
      p.vx = 0;
      p.vy = 0;
      p.av = 0;
      return;
    }
    if (was.length === next.length && was.every((k, i) => k === next[i])) return;
    if (was.length > 0 && next.length === 0) {
      if (!allowRelease) return;
      const h = this.anchorHole(p, was[0]!);
      const pivot = this.worldHole(p, h);
      p.anchors = next;
      this.releasePlank(p, pivot);
      return;
    }
    p.anchors = next;
    if (next.length === 1) this.attachToPivot(p);
    else if (next.length >= 2) this.snapToAnchors(p);
    if (next.length > was.length) {
      sfxWood();
      this.emit(p.x, p.y, 8);
      this.trauma = Math.min(1, this.trauma + 0.16);
      this.hitstop = this.reducedMotion ? this.hitstop : Math.max(this.hitstop, 0.04);
      p.vx = 0;
      p.vy = 0;
      if (next.length >= 2) p.av = 0;
    } else if (was.length >= 2 && next.length === 1) {
      p.wiggle = this.reducedMotion ? 0 : 0.28;
      if (!this.reducedMotion) p.av += (Math.random() - 0.45) * 1.6;
    }
  }

  private snapToAnchors(p: Plank) {
    if (p.anchors.length === 1) {
      this.attachToPivot(p);
      return;
    }
    if (p.anchors.length < 2) return;
    const s0 = this.screws.get(p.anchors[0]!);
    const s1 = this.screws.get(p.anchors[1]!);
    if (!s0 || !s1) return;
    const a0 = this.screwPlantedPos(s0);
    const a1 = this.screwPlantedPos(s1);
    const h0 = this.anchorHole(p, s0.key);
    const h1 = this.anchorHole(p, s1.key);
    p.angle = Math.atan2(a1.y - a0.y, a1.x - a0.x) - Math.atan2(h1.ly - h0.ly, h1.lx - h0.lx);
    const ca = Math.cos(p.angle);
    const sa = Math.sin(p.angle);
    p.x = a0.x - (h0.lx * ca - h0.ly * sa);
    p.y = a0.y - (h0.lx * sa + h0.ly * ca);
    p.vx = 0;
    p.vy = 0;
    p.av = 0;
  }

  private releasePlank(p: Plank, last?: { x: number; y: number }) {
    p.wiggle = this.reducedMotion ? 0 : 0.4;
    if (last) {
      const dx = p.x - last.x;
      const dy = p.y - last.y;
      p.vx += -p.av * dy;
      p.vy += p.av * dx;
    }
    if (!this.reducedMotion) {
      p.vy -= 90;
      p.vx += (Math.random() - 0.5) * 40;
      p.av += (Math.random() - 0.5) * 1.8;
    }
    sfxWood();
  }

  private attachToPivot(p: Plank) {
    const key = p.anchors[0];
    if (!key) return;
    const s = this.screws.get(key);
    if (!s || !s.alive) return;
    const pos = this.screwPlantedPos(s);
    const h = this.anchorHole(p, key);
    const ca = Math.cos(p.angle);
    const sa = Math.sin(p.angle);
    p.x = pos.x - (h.lx * ca - h.ly * sa);
    p.y = pos.y - (h.lx * sa + h.ly * ca);
  }

  private pivotLocked(p: Plank) {
    if (this.drag?.kind === "pivot" && this.drag.plank === p) return true;
    const t = this.transitScrew();
    // 最後の1本を持っている／飛ばしている間は、その板を元の穴に止める。
    return !!t && p.anchors.length === 1 && p.anchors[0] === t.key;
  }

  private plankHits(a: Plank, b: Plank) {
    const n = 8;
    const ca = Math.cos(a.angle);
    const sa = Math.sin(a.angle);
    const half = a.length * 0.5;
    const nx = -sa * (a.thick * 0.42);
    const ny = ca * (a.thick * 0.42);
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * 2 - 1;
      const x = a.x + ca * half * t;
      const y = a.y + sa * half * t;
      if (this.plankContains(b, x + nx, y + ny, -2)) return true;
      if (this.plankContains(b, x - nx, y - ny, -2)) return true;
    }
    return false;
  }

  private screwOnHoleOrbit(p: Plank, s: Screw) {
    if (p.anchors.length !== 1) return false;
    const pivot = this.screws.get(p.anchors[0]!);
    if (!pivot || pivot === s) return false;
    const ph = this.anchorHole(p, pivot.key);
    const pr = Math.hypot(s.x - pivot.x, s.y - pivot.y);
    for (const h of p.holes) {
      if (h === ph) continue;
      const orbit = Math.hypot(h.lx - ph.lx, h.ly - ph.ly);
      if (Math.abs(pr - orbit) < this.cell * 0.3) return true;
    }
    return false;
  }

  private plankHitsScrewBody(p: Plank, s: Screw) {
    if (!s.alive || s.dying) return false;
    if (p.anchors.includes(s.key)) return false;
    if (this.closestHole(p, s, this.cell * 0.4)) return false;
    if (this.screwOnHoleOrbit(p, s)) return false;
    return this.plankContains(p, s.x, s.y, this.cell * 0.2);
  }

  private blockPendulum(p: Plank, prevAngle: number, blocked: () => boolean) {
    if (!blocked()) return;
    const cur = p.angle;
    p.angle = prevAngle;
    this.attachToPivot(p);
    if (blocked()) {
      p.angle = cur;
      this.attachToPivot(p);
      return;
    }
    let lo = prevAngle;
    let hi = cur;
    for (let k = 0; k < 8; k++) {
      const mid = (lo + hi) / 2;
      p.angle = mid;
      this.attachToPivot(p);
      if (blocked()) hi = mid;
      else lo = mid;
    }
    p.angle = lo;
    this.attachToPivot(p);
    p.av *= -0.28;
    if (Math.abs(p.av) < 1.2) p.av = 0;
  }

  private resolvePendulum(p: Plank, prevAngle: number) {
    for (const o of this.planks) {
      if (o === p || o.removed || o.fly > 0 || o.anchors.length === 0) continue;
      this.blockPendulum(p, prevAngle, () => this.plankHits(p, o));
    }
    for (const s of this.liveScrews()) {
      this.blockPendulum(p, prevAngle, () => this.plankHitsScrewBody(p, s));
    }
  }

  private integratePendulum(p: Plank, dt: number) {
    if (this.pivotLocked(p)) {
      this.attachToPivot(p);
      return;
    }
    const key = p.anchors[0]!;
    const s = this.screws.get(key);
    if (!s || !s.alive) return;
    const h = this.anchorHole(p, key);

    if (this.reducedMotion) {
      const target = -Math.PI / 2 - Math.atan2(h.ly, h.lx);
      let d = target - p.angle;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      p.angle += d * Math.min(1, dt * 10);
      p.av = 0;
      this.attachToPivot(p);
      return;
    }

    const d2 = h.lx * h.lx + h.ly * h.ly;
    const I = Math.max((p.length * p.length) / 12 + d2, 280);
    const prevAngle = p.angle;
    const rx = p.x - s.x;
    const tau = rx * GRAVITY;
    p.av += (tau / I) * dt;
    p.av *= Math.pow(0.4, dt);
    if (p.av > 12) p.av = 12;
    if (p.av < -12) p.av = -12;
    if (Math.abs(p.av) < 0.4 && Math.abs(rx) < 3.2) p.av = 0;
    p.angle += p.av * dt;
    this.attachToPivot(p);
    this.resolvePendulum(p, prevAngle);
    this.updateAnchors(p, false);
  }

  private integrateFree(p: Plank, dt: number) {
    if (this.drag?.kind === "move" && this.drag.plank === p) return;
    p.vy += GRAVITY * dt;
    p.vy = Math.min(p.vy, MAX_FALL);
    const drag = Math.pow(0.42, dt);
    p.vx *= drag;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.angle += p.av * dt;
    p.av *= Math.pow(0.55, dt);
    if (p.av > 14) p.av = 14;
    if (p.av < -14) p.av = -14;
    this.updateAnchors(p, false);
    if (p.anchors.length > 0) return;
    this.separatePlankFromScrews(p);
  }

  private separatePlankFromScrews(p: Plank) {
    const rad = this.cell * 0.2;
    const r = p.thick / 2;
    const cap = Math.max(0, p.length / 2 - r);
    const ca = Math.cos(p.angle);
    const sa = Math.sin(p.angle);
    const ica = Math.cos(-p.angle);
    const isa = Math.sin(-p.angle);
    for (const s of this.liveScrews()) {
      if (this.closestHole(p, s, this.cell * 0.36)) continue;
      const dx = s.x - p.x;
      const dy = s.y - p.y;
      const lx = dx * ica - dy * isa;
      const ly = dx * isa + dy * ica;
      const seg = Math.max(-cap, Math.min(cap, lx));
      const vx = lx - seg;
      const vy = ly;
      const d = Math.hypot(vx, vy);
      const need = r + rad;
      if (d >= need) continue;
      let nx: number;
      let ny: number;
      if (d < 1e-4) {
        nx = 0;
        ny = -1;
      } else {
        nx = vx / d;
        ny = vy / d;
      }
      const pen = d < 1e-4 ? need : need - d;
      const wx = nx * ca - ny * sa;
      const wy = nx * sa + ny * ca;
      p.x -= wx * pen;
      p.y -= wy * pen;
      const vdot = p.vx * wx + p.vy * wy;
      if (vdot > 0) {
        p.vx -= vdot * wx;
        p.vy -= vdot * wy;
      }
      p.av *= 0.62;
    }
  }

  private maybeExit(p: Plank) {
    if (p.removed || p.fly > 0 || p.anchors.length !== 0) return;
    if (this.drag?.plank === p) return;
    const e = extent(p);
    if (p.y - e.y > this.cssH + 6 || p.x + e.x < -48 || p.x - e.x > this.cssW + 48 || p.y + e.y < -80) {
      this.exitPlank(p);
    }
  }

  private exitPlank(p: Plank) {
    if (p.removed || p.fly > 0) return;
    p.fly = 0.001;
    p.flyVx = p.vx;
    p.flyVy = Math.max(p.vy, 180);
    p.anchors = [];
    sfxWhoosh();
    this.emit(p.x, Math.min(p.y, this.cssH - 8), 16, true);
    this.trauma = Math.min(1, this.trauma + 0.22);
    if (this.tutorialStep === 2) this.tutorialStep = 0;
  }

  private stepPhysics(dt: number) {
    if (this.gravityOff) {
      for (const plank of this.planks) {
        plank.vx = 0;
        plank.vy = 0;
        plank.av = 0;
      }
      return;
    }
    const n = 4;
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      for (const p of this.planks) {
        if (p.removed || p.fly > 0) continue;
        if (p.anchors.length === 0) this.integrateFree(p, h);
        else if (p.anchors.length === 1) this.integratePendulum(p, h);
      }
      for (const p of this.planks) this.maybeExit(p);
    }
  }

  private removePlank(p: Plank, vx = 0, vy = 520) {
    if (p.removed || p.fly > 0) return;
    this.history.push(this.snap());
    if (this.history.length > 24) this.history.shift();
    p.fly = 0.001;
    p.flyVx = vx || (p.x < this.cssW / 2 ? -70 : 70);
    p.flyVy = vy;
    p.anchors = [];
    sfxWhoosh();
    sfxWood();
    this.emit(p.x, p.y, 22, true);
    this.trauma = Math.min(1, this.trauma + 0.4);
    if (this.tutorialStep === 2) this.tutorialStep = 0;
  }

  hammerScrew(s: Screw) {
    if (this.held) this.cancelHeld();
    return this.destroyScrew(s);
  }

  malletPlank(p: Plank) {
    this.removePlank(p, 0, 560);
    this.tool = "none";
    this.hint = "";
  }

  pointerDown(x: number, y: number, pointerId: number) {
    if (this.editing && !this.testing) {
      this.editPointerDown(x, y, pointerId);
      return;
    }
    if (this.paused || this.won || this.lost || this.placing) return;

    if (this.tool === "hammer") {
      const s = this.hitScrew(x, y, true);
      if (s) {
        this.hammerScrew(s);
        this.tool = "none";
        this.hint = "";
      }
      return;
    }
    if (this.tool === "mallet") {
      const p = this.hitPlank(x, y, true);
      if (p) this.malletPlank(p);
      return;
    }

    if (this.held) {
      const dest = this.hitEmptyHole(x, y);
      if (dest) {
        this.placeHeld(dest.c, dest.r);
        return;
      }
      const other = this.hitScrew(x, y, false);
      if (other && other !== this.held) {
        this.pickScrew(other, false);
        return;
      }
      if (other === this.held) {
        this.cancelHeld();
        return;
      }
      this.trauma = Math.min(1, this.trauma + 0.1);
      return;
    }

    const screw = this.hitScrew(x, y, false);
    if (screw) {
      this.pickScrew(screw, false);
      return;
    }

    const free = this.hitFreePlank(x, y);
    if (free) {
      const ca = Math.cos(-free.angle);
      const sa = Math.sin(-free.angle);
      const dx = x - free.x;
      const dy = y - free.y;
      this.drag = {
        kind: "move",
        plank: free,
        lx: dx * ca - dy * sa,
        ly: dx * sa + dy * ca,
        lastX: x,
        lastY: y,
        lastT: performance.now(),
        av: 0,
        vx: 0,
        vy: 0,
        pointerId,
      };
      free.vx = 0;
      free.vy = 0;
      return;
    }

    const pivot = this.hitPivotPlank(x, y);
    if (pivot) {
      const s = this.screws.get(pivot.anchors[0]!);
      if (!s || !s.alive) return;
      this.drag = {
        kind: "pivot",
        plank: pivot,
        pivotX: s.x,
        pivotY: s.y,
        grabAngle: Math.atan2(y - s.y, x - s.x),
        baseAngle: pivot.angle,
        pointerId,
        lastT: performance.now(),
        lastAngle: pivot.angle,
      };
      pivot.av = 0;
      if (this.tutorialStep === 3) this.tutorialStep = 0;
    }
  }

  pointerMove(x: number, y: number, pointerId: number) {
    if (this.editing && !this.testing) {
      this.editPointerMove(x, y, pointerId);
      return;
    }
    if (!this.drag || this.drag.pointerId !== pointerId) return;
    if (this.drag.kind === "move") {
      const p = this.drag.plank;
      const ca = Math.cos(p.angle);
      const sa = Math.sin(p.angle);
      const vx = x - this.drag.lastX;
      const vy = y - this.drag.lastY;
      const now = performance.now();
      const dtm = Math.max(8, now - this.drag.lastT) / 1000;
      const rx = this.drag.lx * ca - this.drag.ly * sa;
      const ry = this.drag.lx * sa + this.drag.ly * ca;
      this.drag.av += (rx * vy - ry * vx) * 0.0008;
      p.angle += this.drag.av;
      this.drag.av *= 0.86;
      p.x = x - (this.drag.lx * Math.cos(p.angle) - this.drag.ly * Math.sin(p.angle));
      p.y = y - (this.drag.lx * Math.sin(p.angle) + this.drag.ly * Math.cos(p.angle));
      this.drag.vx = vx / dtm;
      this.drag.vy = vy / dtm;
      this.drag.lastX = x;
      this.drag.lastY = y;
      this.drag.lastT = now;
      p.vx = this.drag.vx;
      p.vy = this.drag.vy;
      p.av = this.drag.av * 55;
    } else {
      const ang = Math.atan2(y - this.drag.pivotY, x - this.drag.pivotX);
      const p = this.drag.plank;
      const now = performance.now();
      const dtm = Math.max(8, now - this.drag.lastT) / 1000;
      p.angle = this.drag.baseAngle + (ang - this.drag.grabAngle);
      p.av = (p.angle - this.drag.lastAngle) / dtm;
      this.drag.lastAngle = p.angle;
      this.drag.lastT = now;
      const h = this.anchorHole(p, p.anchors[0]!);
      const ca = Math.cos(p.angle);
      const sa = Math.sin(p.angle);
      p.x = this.drag.pivotX - (h.lx * ca - h.ly * sa);
      p.y = this.drag.pivotY - (h.lx * sa + h.ly * ca);
    }
  }

  pointerUp(_x: number, _y: number, pointerId: number) {
    if (this.editing && !this.testing) {
      this.editPointerUp(pointerId);
      return;
    }
    if (!this.drag || this.drag.pointerId !== pointerId) return;
    if (this.drag.kind === "move") {
      const p = this.drag.plank;
      p.vx = this.drag.vx;
      p.vy = this.drag.vy;
      p.av = this.drag.av * 55;
      this.updateAnchors(p, false);
      const e = extent(p);
      if (p.anchors.length === 0 && (p.y - e.y > this.cssH + 6 || p.x + e.x < -48 || p.x - e.x > this.cssW + 48)) {
        this.exitPlank(p);
      }
    } else {
      const p = this.drag.plank;
      if (p.av > 12) p.av = 12;
      if (p.av < -12) p.av = -12;
    }
    this.drag = null;
  }

  pointerCancel(pointerId: number) {
    if (this.editDrag?.pointerId === pointerId) {
      const drag = this.editDrag;
      this.editDrag = null;
      this.editPress = null;
      this.applyHoles(drag.plank, drag.origin);
      return;
    }
    if (this.editPress?.pointerId === pointerId) this.editPress = null;
    if (this.drag?.pointerId === pointerId) this.drag = null;
  }

  private hitScrew(x: number, y: number, any: boolean): Screw | null {
    const rad = this.cell * 0.32;
    let best: Screw | null = null;
    let bestD = rad;
    for (const s of this.screws.values()) {
      if (!s.alive || s.dying) continue;
      if (!any && this.isCovered(s)) continue;
      const d = Math.hypot(s.x - x, s.y - y);
      if (d < bestD) {
        best = s;
        bestD = d;
      }
    }
    return best;
  }

  private hitEmptyHole(x: number, y: number): { c: number; r: number } | null {
    const rad = this.cell * 0.38;
    let best: { c: number; r: number } | null = null;
    let bestD = rad;
    for (const h of this.holeKeys()) {
      if (!this.isDropTarget(h.c, h.r)) continue;
      const p = this.holePos(h.c, h.r);
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < bestD) {
        best = h;
        bestD = d;
      }
    }
    return best;
  }

  private hitFreePlank(x: number, y: number): Plank | null {
    const list = this.planks
      .filter((p) => !p.removed && p.fly === 0 && p.anchors.length === 0)
      .sort((a, b) => b.z - a.z);
    for (const p of list) if (this.plankContains(p, x, y, 4)) return p;
    return null;
  }

  private hitPivotPlank(x: number, y: number): Plank | null {
    const t = this.transitScrew();
    const list = this.planks
      .filter((p) => {
        if (p.removed || p.fly > 0 || p.anchors.length !== 1) return false;
        // 最後の1本を持っている板は振れない。
        if (t && p.anchors[0] === t.key) return false;
        return true;
      })
      .sort((a, b) => b.z - a.z);
    for (const p of list) if (this.plankContains(p, x, y, 4)) return p;
    return null;
  }

  private hitPlank(x: number, y: number, any: boolean): Plank | null {
    const list = this.planks
      .filter((p) => !p.removed && p.fly === 0)
      .sort((a, b) => b.z - a.z);
    for (const p of list) {
      if (!any && p.anchors.length > 0 && this.drag) continue;
      if (this.plankContains(p, x, y, 4)) return p;
    }
    return null;
  }

  update(dt: number) {
    this.justWon = false;
    this.justLost = false;
    if (this.paused) return;
    if (this.rewindHeld) {
      this.scrubRewind(dt);
      return;
    }
    this.recordRewind(dt);

    this.pulse += dt;
    if (this.held && this.held.anim < 0.55) {
      this.held.anim += (0.55 - this.held.anim) * (1 - Math.exp(-16 * dt));
      if (this.held.anim > 0.549) this.held.anim = 0.55;
    }

    if (this.placing) {
      this.placing.t += dt / 0.28;
      const u = Math.min(1, this.placing.t);
      const e = easeOutCubic(u);
      const dest = this.holePos(this.placing.toC, this.placing.toR);
      const hop = Math.sin(u * Math.PI) * this.cell * 0.22;
      this.placing.s.x = this.placing.fromX + (dest.x - this.placing.fromX) * e;
      this.placing.s.y = this.placing.fromY + (dest.y - this.placing.fromY) * e - hop;
      this.placing.s.anim = 0.55 * (1 - e);
      if (u >= 1) this.commitPlace(this.placing);
    }

    for (const s of this.screws.values()) {
      if (s.dying) {
        s.anim += dt * 2.8;
        if (s.anim >= 1) this.finishDestroy(s);
      } else if (s !== this.held && this.placing?.s !== s && s.anim > 0 && s.anim < 0.9) {
        s.anim = Math.max(0, s.anim - dt * 6);
      }
    }

    if (this.hitstop > 0) {
      this.hitstop = Math.max(0, this.hitstop - dt);
      this.trauma = Math.max(0, this.trauma - dt * 2.2);
      for (const q of this.particles) {
        q.life += dt;
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.vy += 520 * dt;
        q.rot += q.vr * dt;
      }
      this.particles = this.particles.filter((q) => q.life < q.max);
      return;
    }

    if (!this.won && !this.lost && !this.freezeClock && !this.editing) {
      this.timeLeft = Math.max(0, this.timeLeft - dt);
      if (this.timeLeft <= 0) this.lost = true;
    }

    this.stepPhysics(dt);

    for (const p of this.planks) {
      if (p.wiggle > 0) p.wiggle = Math.max(0, p.wiggle - dt);
      if (p.fly > 0 && !this.gravityOff) {
        p.fly += dt;
        p.x += p.flyVx * dt;
        p.y += p.flyVy * dt;
        p.angle += dt * 2.2;
        p.flyVy += GRAVITY * dt;
        if (p.fly > 0.55) p.removed = true;
      }
    }

    for (const q of this.particles) {
      q.life += dt;
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      q.vy += 520 * dt;
      q.rot += q.vr * dt;
    }
    this.particles = this.particles.filter((q) => q.life < q.max);

    this.trauma = Math.max(0, this.trauma - dt * 2.2);
    if (this.won) this.checkT = Math.min(1, this.checkT + dt * 1.6);

    const remain = this.planks.filter((p) => !p.removed).length;
    if (!this.editing && remain === 0 && !this.won && !this.lost) {
      this.won = true;
      this.checkT = 0.01;
      this.emit(this.cssW / 2, this.cssH / 2, 40, true);
    }

    if (this.won && !this.prevWin) this.justWon = true;
    if (this.lost && !this.prevLose) this.justLost = true;
    this.prevWin = this.won;
    this.prevLose = this.lost;
  }

  stars(): number {
    const ratio = this.timeLeft / this.timeLimit;
    if (ratio > 0.5) return 3;
    if (ratio > 0.22) return 2;
    return 1;
  }

  forceWin() {
    for (const p of this.planks) p.removed = true;
    this.won = true;
    this.checkT = 1;
    this.justWon = true;
  }

  addTime(sec: number) {
    this.timeLeft = Math.max(0, this.timeLeft + sec);
    if (this.lost && this.timeLeft > 0 && !this.won) {
      this.lost = false;
      this.prevLose = false;
    }
  }

  shakeOffset() {
    if (this.reducedMotion || !this.shakeOn || this.trauma <= 0) return { x: 0, y: 0 };
    const s = this.trauma * this.trauma;
    return {
      x: (Math.random() * 2 - 1) * s * 10,
      y: (Math.random() * 2 - 1) * s * 10,
    };
  }

  palette(c: ColorId) {
    return COLOR_PALETTE[c];
  }
}

export type { Plank, Screw, Particle };
