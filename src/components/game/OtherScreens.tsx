import { ArrowLeft, Star, Lock, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useGameStore } from "@/game/store";
import { LEVEL_COUNT } from "@/game/levels";
import { t } from "@/game/i18n";
import { WoodButton, HudChip, CoinIcon, NutIcon, ModalShell } from "./WoodUI";
import { sfxUi } from "@/game/audio";
import type { BoardSkin, ScrewSkin } from "@/game/types";

function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  const coins = useGameStore((s) => s.coins);
  return (
    <header className="flex items-center justify-between px-3 pt-[max(12px,env(safe-area-inset-top))] pb-2">
      <button
        type="button"
        onClick={onBack}
        className="hud-chip grid size-11 place-items-center rounded-2xl"
        aria-label="back"
      >
        <ArrowLeft className="size-5" />
      </button>
      <h1 className="text-lg font-extrabold text-[var(--color-cream)]">{title}</h1>
      <HudChip>
        <CoinIcon /> {coins}
      </HudChip>
    </header>
  );
}

export function ShopScreen() {
  const lang = useGameStore((s) => s.lang);
  const setScreen = useGameStore((s) => s.setScreen);
  const addBooster = useGameStore((s) => s.addBooster);
  const buy = useGameStore((s) => s.buy);
  const setToast = useGameStore((s) => s.setToast);
  const items = [
    { key: "undo" as const, n: 3, cost: 40, label: t(lang, "shopUndo") },
    { key: "hammer" as const, n: 1, cost: 55, label: t(lang, "shopHammer") },
    { key: "mallet" as const, n: 1, cost: 80, label: t(lang, "shopMallet") },
  ];
  return (
    <div className="workshop-bg screen-in flex h-full flex-col">
      <TopBar title={t(lang, "shop")} onBack={() => setScreen("home")} />
      <div className="stagger-in flex flex-col gap-3 px-4 py-3">
        {items.map((it) => (
          <div key={it.key} className="panel-wood flex items-center justify-between rounded-[22px] px-4 py-3 text-[var(--color-ink)]">
            <div>
              <div className="font-extrabold">{it.label}</div>
              <div className="mt-1 flex items-center gap-1 text-sm font-bold">
                <CoinIcon size={14} /> {it.cost}
              </div>
            </div>
            <WoodButton
              className="px-4 py-2 text-base"
              onClick={() => {
                sfxUi();
                const ok = buy(it.cost, () => addBooster(it.key, it.n));
                setToast(ok ? t(lang, "buyOk") : t(lang, "notEnough"));
              }}
            >
              {t(lang, "buy")}
            </WoodButton>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClosetScreen() {
  const lang = useGameStore((s) => s.lang);
  const setScreen = useGameStore((s) => s.setScreen);
  const owned = useGameStore((s) => s.ownedSkins);
  const boardSkin = useGameStore((s) => s.boardSkin);
  const screwSkin = useGameStore((s) => s.screwSkin);
  const ownSkin = useGameStore((s) => s.ownSkin);
  const equipBoard = useGameStore((s) => s.equipBoard);
  const equipScrew = useGameStore((s) => s.equipScrew);
  const setToast = useGameStore((s) => s.setToast);

  const boards: { id: BoardSkin; cost: number; label: string }[] = [
    { id: "oak", cost: 0, label: t(lang, "boardOak") },
    { id: "walnut", cost: 120, label: t(lang, "boardWalnut") },
    { id: "birch", cost: 120, label: t(lang, "boardBirch") },
  ];
  const screws: { id: ScrewSkin; cost: number; label: string }[] = [
    { id: "steel", cost: 0, label: t(lang, "screwSteel") },
    { id: "brass", cost: 90, label: t(lang, "screwBrass") },
    { id: "obsidian", cost: 90, label: t(lang, "screwObsidian") },
  ];

  const act = (id: string, cost: number, equip: () => void) => {
    sfxUi();
    if (owned.includes(id)) {
      equip();
      return;
    }
    const ok = ownSkin(id, cost);
    if (ok) equip();
    else setToast(t(lang, "notEnough"));
  };

  return (
    <div className="workshop-bg screen-in flex h-full flex-col">
      <TopBar title={t(lang, "closet")} onBack={() => setScreen("home")} />
      <div className="px-4 py-3">
        <h2 className="mb-2 font-extrabold text-[var(--color-cream)]">{t(lang, "boards")}</h2>
        <div className="grid grid-cols-3 gap-2">
          {boards.map((b) => (
            <SkinCard
              key={b.id}
              title={b.label}
              owned={owned.includes(b.id)}
              equipped={boardSkin === b.id}
              cost={b.cost}
              swatch={b.id === "oak" ? "#C9A66B" : b.id === "walnut" ? "#6B4A32" : "#E6D7B8"}
              onClick={() => act(b.id, b.cost, () => equipBoard(b.id))}
              lang={lang}
            />
          ))}
        </div>
        <h2 className="mt-5 mb-2 font-extrabold text-[var(--color-cream)]">{t(lang, "screws")}</h2>
        <div className="grid grid-cols-3 gap-2">
          {screws.map((b) => (
            <SkinCard
              key={b.id}
              title={b.label}
              owned={owned.includes(b.id)}
              equipped={screwSkin === b.id}
              cost={b.cost}
              swatch={b.id === "steel" ? "#C5C8CE" : b.id === "brass" ? "#E0B25A" : "#2A2E36"}
              onClick={() => act(b.id, b.cost, () => equipScrew(b.id))}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkinCard({
  title,
  owned,
  equipped,
  cost,
  swatch,
  onClick,
  lang,
}: {
  title: string;
  owned: boolean;
  equipped: boolean;
  cost: number;
  swatch: string;
  onClick: () => void;
  lang: "ja" | "en";
}) {
  return (
    <button type="button" onClick={onClick} className="panel-wood flex flex-col items-center gap-2 rounded-[18px] p-3 text-[var(--color-ink)] transition-transform duration-150 ease-out active:scale-[0.96]">
      <span className="block h-10 w-full rounded-xl border border-[#8a6434]" style={{ background: swatch }} />
      <span className="text-xs font-extrabold">{title}</span>
      <span className="text-[11px] font-bold">
        {equipped ? t(lang, "equipped") : owned ? t(lang, "equip") : `${cost}`}
      </span>
    </button>
  );
}

export function RankScreen() {
  const lang = useGameStore((s) => s.lang);
  const setScreen = useGameStore((s) => s.setScreen);
  const playLevel = useGameStore((s) => s.playLevel);
  const maxUnlocked = useGameStore((s) => s.maxUnlocked);
  const bestTime = useGameStore((s) => s.bestTime);
  const stars = useGameStore((s) => s.stars);
  const rows = Object.keys(bestTime)
    .map((k) => ({
      level: Number(k),
      time: bestTime[k]!,
      stars: stars[k] ?? 0,
    }))
    .sort((a, b) => a.time - b.time)
    .slice(0, 12);

  return (
    <div className="workshop-bg screen-in flex h-full flex-col">
      <TopBar title={t(lang, "rankingTitle")} onBack={() => setScreen("home")} />
      <div className="flex-1 overflow-auto px-4 py-2">
        {rows.length === 0 ? (
          <div className="empty-state text-[var(--color-cream)]">
            <TrophyMark />
            <p className="text-lg font-extrabold">{t(lang, "emptyRank")}</p>
            <p className="text-sm font-bold text-[var(--color-cream-dark)]">{t(lang, "emptyRankHint")}</p>
            <WoodButton
              className="mt-2"
              onClick={() => {
                sfxUi();
                playLevel(Math.min(maxUnlocked, LEVEL_COUNT));
              }}
            >
              {t(lang, "play")}
            </WoodButton>
          </div>
        ) : (
          <ol className="flex flex-col gap-2">
            {rows.map((r, i) => (
              <li key={r.level} className="panel-wood flex items-center justify-between rounded-[18px] px-4 py-2.5 text-[var(--color-ink)]">
                <span className="w-8 font-extrabold">{i + 1}</span>
                <span className="flex-1 font-bold">
                  {t(lang, "level")} {r.level}
                </span>
                <span className="mr-2 inline-flex text-[var(--color-oak-dark)]">
                  {Array.from({ length: 3 }, (_, si) => (
                    <Star
                      key={si}
                      className="size-3.5"
                      fill={si < r.stars ? "#E8C35A" : "transparent"}
                      color={si < r.stars ? "#E8C35A" : "rgba(90,70,40,0.35)"}
                    />
                  ))}
                </span>
                <span className="font-extrabold tabular-nums">{fmt(r.time)}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function fmt(sec: number) {
  const s = Math.floor(sec);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function LevelSelect() {
  const lang = useGameStore((s) => s.lang);
  const setScreen = useGameStore((s) => s.setScreen);
  const maxUnlocked = useGameStore((s) => s.maxUnlocked);
  const stars = useGameStore((s) => s.stars);
  const debug = useGameStore((s) => s.debug);
  const playLevel = useGameStore((s) => s.playLevel);

  return (
    <div className="workshop-bg screen-in flex h-full flex-col">
      <TopBar title={t(lang, "levels")} onBack={() => setScreen("home")} />
      <div className="stagger-in grid grid-cols-4 gap-2 overflow-auto px-4 py-3 pb-8">
        {Array.from({ length: LEVEL_COUNT }, (_, i) => {
          const n = i + 1;
          const locked = !debug && n > maxUnlocked;
          const st = stars[String(n)] ?? 0;
          return (
            <button
              key={n}
              type="button"
              disabled={locked}
              onClick={() => {
                sfxUi();
                playLevel(n);
              }}
              className="panel-wood flex aspect-square flex-col items-center justify-center rounded-[16px] text-[var(--color-ink)] disabled:opacity-50"
            >
              {locked ? <Lock className="size-5" /> : <span className="text-lg font-extrabold">{n}</span>}
              {!locked && (
                <span className="mt-0.5 inline-flex">
                  {Array.from({ length: 3 }, (_, si) => (
                    <Star
                      key={si}
                      className="size-2.5"
                      fill={si < st ? "#E8C35A" : "transparent"}
                      color={si < st ? "#E8C35A" : "rgba(90,70,40,0.4)"}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DailyModal() {
  const lang = useGameStore((s) => s.lang);
  const dailyDone = useGameStore((s) => s.dailyDone);
  const dailyClaimed = useGameStore((s) => s.dailyClaimed);
  const claimDaily = useGameStore((s) => s.claimDaily);
  const setDailyOpen = useGameStore((s) => s.setDailyOpen);

  return (
    <ModalShell title={t(lang, "daily")} onClose={() => setDailyOpen(false)}>
      <p className="mb-3 text-center text-sm font-bold">{t(lang, "dailyDesc")}</p>
      <div className="mb-4 h-3 overflow-hidden rounded-full bg-[rgba(90,50,20,0.15)]">
        <div className="bar-fill h-full bg-[var(--color-sage)]" style={{ width: `${(dailyDone / 2) * 100}%` }} />
      </div>
      <div className="mb-4 flex items-center justify-center gap-3 font-extrabold">
        <span className="inline-flex items-center gap-1">
          <CoinIcon /> 60
        </span>
        <span className="inline-flex items-center gap-1">
          <NutIcon /> 2
        </span>
      </div>
      <WoodButton
        className="w-full"
        disabled={dailyClaimed || dailyDone < 2}
        onClick={() => {
          claimDaily();
          sfxUi();
        }}
      >
        {dailyClaimed ? (
          <span className="inline-flex items-center gap-1">
            <Check className="size-5" /> {t(lang, "claimed")}
          </span>
        ) : (
          t(lang, "claim")
        )}
      </WoodButton>
    </ModalShell>
  );
}

export function Toast() {
  const toast = useGameStore((s) => s.toast);
  const toastAt = useGameStore((s) => s.toastAt);
  const setToast = useGameStore((s) => s.setToast);
  const [shown, setShown] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!toast) {
      setShown(null);
      setLeaving(false);
      return;
    }
    setShown(toast);
    setLeaving(false);
    const hide = window.setTimeout(() => setLeaving(true), 2000);
    const gone = window.setTimeout(() => {
      setToast(null);
      setShown(null);
      setLeaving(false);
    }, 2180);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(gone);
    };
  }, [toast, toastAt, setToast]);

  if (!shown) return null;
  return (
    <button
      type="button"
      onClick={() => {
        setToast(null);
        setShown(null);
      }}
      className={`absolute bottom-24 left-1/2 z-50 rounded-full bg-[#3a2a1c] px-4 py-2 text-sm font-bold text-[var(--color-cream)] shadow-lg ${leaving ? "toast-out" : "toast-in"}`}
    >
      {shown}
    </button>
  );
}

function TrophyMark() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" aria-hidden>
      <rect x="20" y="8" width="24" height="28" rx="6" fill="#E8C35A" stroke="#B07A20" strokeWidth="3" />
      <path d="M20 14h-8c0 10 6 16 14 16" fill="none" stroke="#C9A66B" strokeWidth="3" />
      <path d="M44 14h8c0 10-6 16-14 16" fill="none" stroke="#C9A66B" strokeWidth="3" />
      <rect x="26" y="36" width="12" height="8" fill="#C9A66B" stroke="#8E6B38" strokeWidth="2" />
      <rect x="18" y="46" width="28" height="8" rx="3" fill="#C9A66B" stroke="#8E6B38" strokeWidth="2" />
    </svg>
  );
}

