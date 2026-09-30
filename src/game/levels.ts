import { parse } from "smol-toml";
import type { ColorId, LevelDef, PlankDef } from "./types";

const COLORS = new Set<string>(["oak", "green", "honey", "cedar", "sage"]);

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}

function asInt(file: string, label: string, value: unknown): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    fail(file, `${label} は整数にしてください`);
  }
  return value;
}

function asHole(file: string, label: string, value: unknown): [number, number] {
  if (!Array.isArray(value) || value.length !== 2) {
    fail(file, `${label} は [列, 行] にしてください`);
  }
  return [asInt(file, `${label} の列`, value[0]), asInt(file, `${label} の行`, value[1])];
}

function parseStage(file: string, raw: string): { id: number; level: LevelDef } {
  let doc: Record<string, unknown>;
  try {
    doc = parse(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    fail(file, message);
  }

  const id = asInt(file, "id", doc.id);
  const cols = asInt(file, "cols", doc.cols);
  const rows = asInt(file, "rows", doc.rows);
  const time = asInt(file, "time", doc.time);
  if (id < 1) fail(file, "id は 1 以上にしてください");
  if (cols < 1 || rows < 1) fail(file, "cols / rows は 1 以上にしてください");
  if (time < 1) fail(file, "time は 1 以上にしてください");
  if (!Array.isArray(doc.planks) || doc.planks.length === 0) {
    fail(file, "planks がありません");
  }

  const planks: PlankDef[] = doc.planks.map((plank, i) => {
    if (plank === null || typeof plank !== "object" || Array.isArray(plank)) {
      fail(file, `planks[${i}] が表ではありません`);
    }
    const row = plank as Record<string, unknown>;
    if (typeof row.color !== "string" || !COLORS.has(row.color)) {
      fail(file, `planks[${i}].color が不正です`);
    }
    const z = asInt(file, `planks[${i}].z`, row.z);
    if (!Array.isArray(row.holes) || row.holes.length === 0) {
      fail(file, `planks[${i}].holes がありません`);
    }
    const holes = row.holes.map((hole, h) => {
      const point = asHole(file, `planks[${i}].holes[${h}]`, hole);
      if (point[0] < 0 || point[0] >= cols || point[1] < 0 || point[1] >= rows) {
        fail(file, `planks[${i}].holes[${h}] が盤の外です (${point[0]}, ${point[1]})`);
      }
      return point;
    });
    return { color: row.color as ColorId, holes, z };
  });

  const known = new Set(planks.flatMap((plank) => plank.holes.map((hole) => `${hole[0]},${hole[1]}`)));
  let open: [number, number][] | undefined;
  if (doc.open != null) {
    if (!Array.isArray(doc.open)) fail(file, "open は配列にしてください");
    open = doc.open.map((hole, i) => {
      const point = asHole(file, `open[${i}]`, hole);
      if (!known.has(`${point[0]},${point[1]}`)) {
        fail(file, `open[${i}] はどれかの板の穴にしてください`);
      }
      return point;
    });
  }

  let blank: [number, number][] | undefined;
  if (doc.blank != null) {
    if (!Array.isArray(doc.blank)) fail(file, "blank は配列にしてください");
    const seen = new Set<string>();
    blank = [];
    for (let i = 0; i < doc.blank.length; i++) {
      const point = asHole(file, `blank[${i}]`, doc.blank[i]);
      if (point[0] < 0 || point[0] >= cols || point[1] < 0 || point[1] >= rows) {
        fail(file, `blank[${i}] が盤の外です`);
      }
      const key = `${point[0]},${point[1]}`;
      if (known.has(key) || seen.has(key)) continue;
      seen.add(key);
      blank.push(point);
    }
    if (blank.length === 0) blank = undefined;
  }

  const title = typeof doc.title === "string" && doc.title.trim() ? doc.title : undefined;
  const level: LevelDef = { cols, rows, time, planks };
  if (title) level.title = title;
  if (open) level.open = open;
  if (blank) level.blank = blank;
  return { id, level };
}

/** Parse a pasted stage. `id` is optional and is not used to pick the file. */
export function levelFromToml(raw: string): LevelDef {
  const text = raw.trim();
  if (!text) throw new Error("TOMLが空です");
  const withId = /(^|\n)\s*id\s*=/.test(text) ? text : `id = 1\n${text}`;
  try {
    return parseStage("paste", withId).level;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(message.replace(/^paste:\s*/, ""));
  }
}

const files = import.meta.glob("/stages/*.toml", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const loaded = Object.entries(files)
  .map(([path, raw]) => parseStage(path.split("/").pop() ?? path, raw))
  .sort((a, b) => a.id - b.id);

if (loaded.length === 0) {
  throw new Error("stages/*.toml が見つかりません");
}

for (let i = 0; i < loaded.length; i++) {
  if (loaded[i]!.id !== i + 1) {
    throw new Error(`stages の id は 1 から連番にしてください（${loaded.map((stage) => stage.id).join(", ")}）`);
  }
}

/** Stage order is the `id` in each `stages/NN.toml`, not the filename. */
export const LEVELS: LevelDef[] = loaded.map((stage) => stage.level);
export let LEVEL_COUNT = LEVELS.length;

const sessionEdits = new Map<number, LevelDef>();

/** Blank stage used by the debug “add stage” action. */
export function addStage(): number {
  const id = LEVEL_COUNT + 1;
  const level: LevelDef = {
    cols: 4,
    rows: 4,
    time: 90,
    title: "新しいステージ",
    planks: [{ color: "oak", z: 1, holes: [[1, 1], [2, 1]] }],
  };
  LEVELS.push(level);
  LEVEL_COUNT = LEVELS.length;
  rememberLevel(id, level);
  return id;
}

export function cloneLevel(level: LevelDef): LevelDef {
  const copy: LevelDef = {
    cols: level.cols,
    rows: level.rows,
    time: level.time,
    planks: level.planks.map((plank) => ({
      color: plank.color,
      z: plank.z,
      holes: plank.holes.map((hole) => [hole[0], hole[1]] as [number, number]),
    })),
  };
  if (level.title) copy.title = level.title;
  if (level.open?.length) {
    copy.open = level.open.map((hole) => [hole[0], hole[1]] as [number, number]);
  }
  if (level.blank?.length) {
    copy.blank = level.blank.map((hole) => [hole[0], hole[1]] as [number, number]);
  }
  return copy;
}

/** Authored stage, or the in-session edit if the level editor changed it. */
export function levelFor(levelNum: number): LevelDef {
  return sessionEdits.get(levelNum) ?? LEVELS[Math.max(0, Math.min(LEVEL_COUNT, levelNum) - 1)] ?? LEVELS[0]!;
}

export function rememberLevel(levelNum: number, level: LevelDef) {
  sessionEdits.set(levelNum, cloneLevel(level));
}

export function stageToToml(id: number, level: LevelDef): string {
  const lines = [
    `# ステージ ${String(id).padStart(2, "0")}${level.title ? ` — ${level.title}` : ""}`,
    "# holes は [列, 行]。z が大きいほど手前。",
    "# color は oak / green / honey / cedar / sage。",
    "# open は最初からネジがない穴（省略可）。",
    "# blank は穴のないマス（省略可）。",
    `id = ${id}`,
  ];
  if (level.title) lines.push(`title = "${level.title.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
  lines.push(`cols = ${level.cols}`, `rows = ${level.rows}`, `time = ${level.time}`, "");
  for (const plank of level.planks) {
    const holes = plank.holes.map(([c, r]) => `[${c}, ${r}]`).join(", ");
    lines.push("[[planks]]", `color = "${plank.color}"`, `z = ${plank.z}`, `holes = [${holes}]`, "");
  }
  if (level.open?.length) {
    const holes = level.open.map(([c, r]) => `[${c}, ${r}]`).join(", ");
    lines.push(`open = [${holes}]`, "");
  }
  if (level.blank?.length) {
    const holes = level.blank.map(([c, r]) => `[${c}, ${r}]`).join(", ");
    lines.push(`blank = [${holes}]`, "");
  }
  return `${lines.join("\n")}\n`;
}
