import { create } from "zustand";
import {
  DEFAULT_SAVE,
  SAVE_VERSION,
  type BoardSkin,
  type Boosters,
  type Lang,
  type SaveState,
  type ScreenId,
  type ScrewSkin,
} from "./types";
import { LEVEL_COUNT } from "./levels";

const KEY = "nut-workshop-save-v1";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function freshSave(): SaveState {
  return {
    ...DEFAULT_SAVE,
    boosters: { ...DEFAULT_SAVE.boosters },
    stars: {},
    bestTime: {},
    ownedSkins: [...DEFAULT_SAVE.ownedSkins],
    dailyDate: today(),
  };
}

function loadSave(): SaveState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return freshSave();
    const parsed = JSON.parse(raw) as SaveState;
    const merged: SaveState = {
      ...DEFAULT_SAVE,
      ...parsed,
      boosters: { ...DEFAULT_SAVE.boosters, ...parsed.boosters },
      stars: parsed.stars ?? {},
      bestTime: parsed.bestTime ?? {},
      ownedSkins: parsed.ownedSkins ?? DEFAULT_SAVE.ownedSkins,
      version: SAVE_VERSION,
    };
    if (merged.dailyDate !== today()) {
      merged.dailyDate = today();
      merged.dailyDone = 0;
      merged.dailyClaimed = false;
    }
    return merged;
  } catch {
    return freshSave();
  }
}

function persist(s: SaveState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* private mode */
  }
}

type GameStore = SaveState & {
  screen: ScreenId;
  playingLevel: number;
  toast: string | null;
  settingsOpen: boolean;
  dailyOpen: boolean;
  hydrate: () => void;
  setScreen: (s: ScreenId) => void;
  playLevel: (n: number) => void;
  completeLevel: (level: number, stars: number, timeLeft: number, timeLimit: number) => void;
  spendBooster: (k: keyof Boosters) => boolean;
  addBooster: (k: keyof Boosters, n: number) => void;
  buy: (cost: number, apply: () => void) => boolean;
  setLang: (l: Lang) => void;
  toggle: (k: "sfx" | "music" | "shake") => void;
  equipBoard: (s: BoardSkin) => void;
  equipScrew: (s: ScrewSkin) => void;
  ownSkin: (id: string, cost: number) => boolean;
  claimDaily: () => void;
  reset: () => void;
  setToast: (msg: string | null) => void;
  setSettingsOpen: (v: boolean) => void;
  setDailyOpen: (v: boolean) => void;
};

export const useGameStore = create<GameStore>((set, get) => {
  const init = freshSave();

  const write = (patch: Partial<SaveState>) => {
    set(patch as Partial<GameStore>);
    const s = get();
    persist({
      version: SAVE_VERSION,
      maxUnlocked: s.maxUnlocked,
      coins: s.coins,
      nuts: s.nuts,
      boosters: s.boosters,
      stars: s.stars,
      bestTime: s.bestTime,
      lang: s.lang,
      sfx: s.sfx,
      music: s.music,
      shake: s.shake,
      boardSkin: s.boardSkin,
      screwSkin: s.screwSkin,
      ownedSkins: s.ownedSkins,
      dailyDate: s.dailyDate,
      dailyDone: s.dailyDone,
      dailyClaimed: s.dailyClaimed,
      wins: s.wins,
    });
  };

  return {
    ...init,
    screen: "home",
    playingLevel: 1,
    toast: null,
    settingsOpen: false,
    dailyOpen: false,
    hydrate: () => {
      if (typeof window === "undefined") return;
      const loaded = loadSave();
      set({
        ...loaded,
        playingLevel: Math.min(loaded.maxUnlocked, LEVEL_COUNT),
      });
    },
    setScreen: (screen) => set({ screen }),
    playLevel: (n) => set({ playingLevel: n, screen: "play" }),
    completeLevel: (level, stars, timeLeft, timeLimit) => {
      const s = get();
      const key = String(level);
      const prev = s.stars[key] ?? 0;
      const used = Math.max(0, timeLimit - timeLeft);
      const prevTime = s.bestTime[key];
      const nextUnlocked = Math.max(s.maxUnlocked, Math.min(LEVEL_COUNT, level + 1));
      const coinGain = 12 + stars * 8 + Math.floor(timeLeft / 8);
      const dailyDone =
        s.dailyDate === today() ? Math.min(2, s.dailyDone + 1) : 1;
      write({
        maxUnlocked: nextUnlocked,
        coins: s.coins + coinGain,
        stars: { ...s.stars, [key]: Math.max(prev, stars) },
        bestTime: {
          ...s.bestTime,
          [key]: prevTime == null ? used : Math.min(prevTime, used),
        },
        dailyDate: today(),
        dailyDone,
        wins: s.wins + 1,
      });
    },
    spendBooster: (k) => {
      const n = get().boosters[k];
      if (n <= 0) return false;
      write({ boosters: { ...get().boosters, [k]: n - 1 } });
      return true;
    },
    addBooster: (k, n) => {
      write({ boosters: { ...get().boosters, [k]: get().boosters[k] + n } });
    },
    buy: (cost, apply) => {
      if (get().coins < cost) return false;
      apply();
      write({ coins: get().coins - cost });
      return true;
    },
    setLang: (lang) => write({ lang }),
    toggle: (k) => write({ [k]: !get()[k] }),
    equipBoard: (boardSkin) => write({ boardSkin }),
    equipScrew: (screwSkin) => write({ screwSkin }),
    ownSkin: (id, cost) => {
      const s = get();
      if (s.ownedSkins.includes(id)) return true;
      if (s.coins < cost) return false;
      write({ coins: s.coins - cost, ownedSkins: [...s.ownedSkins, id] });
      return true;
    },
    claimDaily: () => {
      const s = get();
      if (s.dailyClaimed || s.dailyDone < 2) return;
      write({ dailyClaimed: true, coins: s.coins + 60, nuts: s.nuts + 2 });
    },
    reset: () => {
      const fresh = freshSave();
      persist(fresh);
      set({
        ...fresh,
        screen: "home",
        playingLevel: 1,
        toast: null,
        settingsOpen: false,
        dailyOpen: false,
      });
    },
    setToast: (toast) => set({ toast }),
    setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
    setDailyOpen: (dailyOpen) => set({ dailyOpen }),
  };
});
