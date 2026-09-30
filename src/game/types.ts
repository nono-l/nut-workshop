export type ColorId = "oak" | "green" | "honey" | "cedar" | "sage";

export type Hole = { c: number; r: number };

export type PlankDef = {
  color: ColorId;
  holes: [number, number][];
  z: number;
};

export type LevelDef = {
  cols: number;
  rows: number;
  time: number;
  planks: PlankDef[];
  /** plank holes that start without a screw */
  open?: [number, number][];
  /** grid cells that are not holes */
  blank?: [number, number][];
  title?: string;
};

export type ScreenId = "home" | "play" | "shop" | "closet" | "rank" | "levels";

export type Lang = "ja" | "en";

export type BoardSkin = "oak" | "walnut" | "birch";
export type ScrewSkin = "steel" | "brass" | "obsidian";

export type Boosters = {
  undo: number;
  hammer: number;
  mallet: number;
};

export type SaveState = {
  version: number;
  maxUnlocked: number;
  coins: number;
  nuts: number;
  boosters: Boosters;
  stars: Record<string, number>;
  bestTime: Record<string, number>;
  lang: Lang;
  sfx: boolean;
  music: boolean;
  shake: boolean;
  debug: boolean;
  boardSkin: BoardSkin;
  screwSkin: ScrewSkin;
  ownedSkins: string[];
  dailyDate: string;
  dailyDone: number;
  dailyClaimed: boolean;
  wins: number;
};

export const SAVE_VERSION = 1;

export const DEFAULT_SAVE: SaveState = {
  version: SAVE_VERSION,
  maxUnlocked: 1,
  coins: 80,
  nuts: 2,
  boosters: { undo: 3, hammer: 1, mallet: 1 },
  stars: {},
  bestTime: {},
  lang: "ja",
  sfx: true,
  music: true,
  shake: true,
  debug: false,
  boardSkin: "oak",
  screwSkin: "steel",
  ownedSkins: ["oak", "steel"],
  dailyDate: "",
  dailyDone: 0,
  dailyClaimed: false,
  wins: 0,
};

export const COLOR_PALETTE: Record<
  ColorId,
  { base: string; dark: string; light: string; grain: string }
> = {
  oak: { base: "#C9A66B", dark: "#8E6B38", light: "#E8D09A", grain: "#B08A4A" },
  green: { base: "#7DA15C", dark: "#4F7038", light: "#B5D08A", grain: "#658A45" },
  honey: { base: "#E0B25A", dark: "#B07A28", light: "#F3D48A", grain: "#C9943A" },
  cedar: { base: "#C47A5A", dark: "#8A4A32", light: "#E2A888", grain: "#A86242" },
  sage: { base: "#6F9A86", dark: "#3F6A58", light: "#A8C8B6", grain: "#54806C" },
};
