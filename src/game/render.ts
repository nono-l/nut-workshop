import type { BoardSkin, ScrewSkin } from "./types";
import type { Screw, World } from "./world";


const BOARD: Record<BoardSkin, { base: string; dark: string; light: string }> = {
  oak: { base: "#CDB27A", dark: "#A07C42", light: "#E8D19A" },
  walnut: { base: "#6B4A32", dark: "#3E2A1C", light: "#8A6248" },
  birch: { base: "#E6D7B8", dark: "#C4B08A", light: "#F4EADA" },
};

const SCREW: Record<ScrewSkin, { a: string; b: string; slot: string }> = {
  steel: { a: "#EEF0F3", b: "#8A9098", slot: "#4A5058" },
  brass: { a: "#F3E0A8", b: "#B07A28", slot: "#6A4A12" },
  obsidian: { a: "#6A7080", b: "#1C1E24", slot: "#0A0C10" },
};

function grain(ctx: CanvasRenderingContext2D, seed: number, w: number, h: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.18;
  ctx.lineWidth = 1;
  for (let i = 0; i < 9; i++) {
    const y = -h / 2 + (h * (i + 0.5)) / 9;
    ctx.beginPath();
    ctx.moveTo(-w / 2, y);
    for (let x = -w / 2; x <= w / 2; x += 6) {
      const n = Math.sin((x + seed * 13) * 0.05 + i) * 2.2 + Math.sin((x + seed) * 0.02) * 1.4;
      ctx.lineTo(x, y + n);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  kind: "star" | "heart" | "moon" | "spark",
  s: number,
) {
  ctx.beginPath();
  if (kind === "star") {
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
      const a2 = a + Math.PI / 5;
      ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
      ctx.lineTo(Math.cos(a2) * s * 0.42, Math.sin(a2) * s * 0.42);
    }
    ctx.closePath();
  } else if (kind === "heart") {
    ctx.moveTo(0, s * 0.35);
    ctx.bezierCurveTo(-s, -s * 0.25, -s * 0.45, -s, 0, -s * 0.35);
    ctx.bezierCurveTo(s * 0.45, -s, s, -s * 0.25, 0, s * 0.35);
  } else if (kind === "moon") {
    ctx.arc(0, 0, s, Math.PI * 0.25, Math.PI * 1.6);
    ctx.quadraticCurveTo(s * 0.1, 0, Math.cos(Math.PI * 0.25) * s, Math.sin(Math.PI * 0.25) * s);
  } else {
    ctx.arc(0, 0, s * 0.35, 0, Math.PI * 2);
  }
  ctx.fill();
}

export function drawWorld(
  ctx: CanvasRenderingContext2D,
  world: World,
  skins: { board: BoardSkin; screw: ScrewSkin },
) {
  const { cssW, cssH } = world;
  ctx.clearRect(0, 0, cssW, cssH);

  const shake = world.shakeOffset();
  ctx.save();
  ctx.translate(shake.x, shake.y);

  drawBoard(ctx, world, skins.board);
  drawHoles(ctx, world);

  const planks = [...world.planks]
    .filter((p) => !p.removed)
    .sort((a, b) => a.z - b.z || a.id - b.id);
  for (const p of planks) drawPlank(ctx, world, p);

  if (world.held) drawDropTargets(ctx, world);

  for (const s of world.screws.values()) {
    if (s.alive) drawScrew(ctx, world, s, skins.screw);
  }

  for (const q of world.particles) {
    const a = 1 - q.life / q.max;
    ctx.save();
    ctx.translate(q.x, q.y);
    ctx.rotate(q.rot);
    ctx.globalAlpha = a;
    ctx.fillStyle = q.color;
    drawShape(ctx, q.kind, q.size);
    ctx.restore();
  }

  if (world.won && world.checkT > 0) {
    const t = world.checkT;
    ctx.save();
    ctx.translate(cssW / 2, cssH / 2);
    ctx.scale(0.7 + 0.3 * Math.min(1, t * 1.4), 0.7 + 0.3 * Math.min(1, t * 1.4));
    ctx.strokeStyle = "#5AA24A";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = Math.min(1, t * 1.4);
    ctx.beginPath();
    ctx.moveTo(-28, 4);
    ctx.lineTo(-8, 26);
    ctx.lineTo(34, -24);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

function drawBoard(ctx: CanvasRenderingContext2D, world: World, skin: BoardSkin) {
  const pal = BOARD[skin];
  const { boardX, boardY, boardW, boardH } = world;
  ctx.save();
  roundRect(ctx, boardX, boardY, boardW, boardH, 22);
  const g = ctx.createLinearGradient(boardX, boardY, boardX, boardY + boardH);
  g.addColorStop(0, pal.light);
  g.addColorStop(0.5, pal.base);
  g.addColorStop(1, pal.dark);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.translate(boardX + boardW / 2, boardY + boardH / 2);
  grain(ctx, 11, boardW, boardH, pal.dark);
  ctx.restore();
  ctx.strokeStyle = "rgba(80,50,20,0.28)";
  ctx.lineWidth = 3;
  roundRect(ctx, boardX + 1.5, boardY + 1.5, boardW - 3, boardH - 3, 20);
  ctx.stroke();
  ctx.restore();
}

function drawHoles(ctx: CanvasRenderingContext2D, world: World) {
  const r = world.cell * 0.2;
  for (const h of world.holeKeys()) {
    const p = world.holePos(h.c, h.r);
    ctx.beginPath();
    ctx.arc(p.x, p.y + 1.2, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(70,50,30,0.22)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#6A5438";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 0.72, 0, Math.PI * 2);
    ctx.fillStyle = "#A89068";
    ctx.fill();
  }
}

function drawDropTargets(ctx: CanvasRenderingContext2D, world: World) {
  const pulse = 0.55 + 0.45 * Math.sin(world.pulse * 6);
  const r = world.cell * 0.22;
  for (const h of world.dropTargets()) {
    ctx.beginPath();
    ctx.arc(h.x, h.y, r + 3, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(244, 230, 196, ${0.35 + 0.45 * pulse})`;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(h.x, h.y, r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232, 195, 90, ${0.18 + 0.22 * pulse})`;
    ctx.fill();
  }
}

function drawPlank(ctx: CanvasRenderingContext2D, world: World, p: World["planks"][number]) {
  const pal = world.palette(p.color);
  const lift = p.anchors.length === 0 && p.fly === 0 ? 3 : 0;
  const wig = p.wiggle > 0 ? Math.sin(p.wiggle * 18) * 0.045 : 0;
  const alpha = p.fly > 0 ? Math.max(0, 1 - p.fly / 0.7) : 1;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(p.x, p.y - lift);
  ctx.rotate(p.angle + wig);

  ctx.fillStyle = "rgba(40,25,10,0.28)";
  roundRect(ctx, -p.length / 2 + 2, -p.thick / 2 + 4, p.length, p.thick, p.thick / 2);
  ctx.fill();

  roundRect(ctx, -p.length / 2, -p.thick / 2, p.length, p.thick, p.thick / 2);
  const g = ctx.createLinearGradient(0, -p.thick / 2, 0, p.thick / 2);
  g.addColorStop(0, pal.light);
  g.addColorStop(0.45, pal.base);
  g.addColorStop(1, pal.dark);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.save();
  ctx.clip();
  grain(ctx, p.seed, p.length, p.thick, pal.grain);
  ctx.restore();
  ctx.strokeStyle = pal.dark;
  ctx.lineWidth = 1.6;
  roundRect(ctx, -p.length / 2 + 0.8, -p.thick / 2 + 0.8, p.length - 1.6, p.thick - 1.6, p.thick / 2 - 0.4);
  ctx.stroke();

  const holeR = world.cell * 0.2;
  for (const h of p.holes) {
    ctx.beginPath();
    ctx.arc(h.lx, h.ly, holeR, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(60,40,20,0.55)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(h.lx, h.ly, holeR * 0.78, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200,180,140,0.35)";
    ctx.fill();
  }

  if (p.anchors.length === 0 && p.fly === 0) {
    ctx.strokeStyle = "rgba(255,255,240,0.35)";
    ctx.lineWidth = 2;
    roundRect(ctx, -p.length / 2 - 2, -p.thick / 2 - 2, p.length + 4, p.thick + 4, p.thick / 2 + 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawScrew(
  ctx: CanvasRenderingContext2D,
  world: World,
  s: Screw,
  skin: ScrewSkin,
) {
  const covered = world.isCovered(s) && world.held !== s;
  const held = world.held === s;
  const t = s.dying ? s.anim : held ? s.anim : s.anim;
  const pal = SCREW[skin];
  const r = world.cell * 0.2;
  ctx.save();
  ctx.translate(s.x, s.y - t * 22);
  ctx.rotate(held ? world.pulse * 5 + t * Math.PI : t * Math.PI * 3.2);
  const sc = 1 + t * 0.28;
  ctx.scale(sc, sc);
  ctx.globalAlpha = covered ? 0.38 : s.dying ? 1 - t : 1;

  if (held) {
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.55, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(232, 195, 90, 0.7)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.ellipse(1.5, 3.5, r * 1.05, r * 0.45, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(40,30,15,0.28)";
  ctx.fill();

  const g = ctx.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r);
  g.addColorStop(0, pal.a);
  g.addColorStop(1, pal.b);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = "rgba(40,40,50,0.35)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.strokeStyle = pal.slot;
  ctx.lineWidth = Math.max(2.2, r * 0.22);
  ctx.lineCap = "round";
  const k = r * 0.42;
  ctx.beginPath();
  ctx.moveTo(-k, -k);
  ctx.lineTo(k, k);
  ctx.moveTo(k, -k);
  ctx.lineTo(-k, k);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(-r * 0.28, -r * 0.3, r * 0.16, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fill();

  ctx.restore();
}
