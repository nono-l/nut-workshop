import { Settings, Store, Home, Shirt, Trophy, Gift, Star } from "lucide-react";
import { useGameStore } from "@/game/store";
import { LEVEL_COUNT } from "@/game/levels";
import { t } from "@/game/i18n";
import { WoodButton, HudChip, CoinIcon, NutIcon } from "./WoodUI";
import { unlockAudio, sfxUi } from "@/game/audio";

function Mascot() {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden>
      <rect x="10" y="14" width="44" height="40" rx="10" fill="#C9A66B" stroke="#6A4A24" strokeWidth="3" />
      <rect x="18" y="8" width="28" height="12" rx="4" fill="#B88948" stroke="#6A4A24" strokeWidth="2" />
      <circle cx="24" cy="32" r="4" fill="#3A2A1C" />
      <circle cx="40" cy="32" r="4" fill="#3A2A1C" />
      <path d="M26 42c3 4 9 4 12 0" fill="none" stroke="#3A2A1C" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function HomeScreen() {
  const lang = useGameStore((s) => s.lang);
  const coins = useGameStore((s) => s.coins);
  const nuts = useGameStore((s) => s.nuts);
  const maxUnlocked = useGameStore((s) => s.maxUnlocked);
  const dailyDone = useGameStore((s) => s.dailyDone);
  const dailyClaimed = useGameStore((s) => s.dailyClaimed);
  const stars = useGameStore((s) => s.stars);
  const playLevel = useGameStore((s) => s.playLevel);
  const setScreen = useGameStore((s) => s.setScreen);
  const setSettingsOpen = useGameStore((s) => s.setSettingsOpen);
  const setDailyOpen = useGameStore((s) => s.setDailyOpen);
  const next = Math.min(maxUnlocked, LEVEL_COUNT);
  const done = Object.keys(stars).length;

  return (
    <div className="workshop-bg flex h-full flex-col text-[var(--color-cream)]">
      <header className="flex items-center justify-between px-3 pt-[max(12px,env(safe-area-inset-top))] pb-2">
        <div className="flex items-center gap-2">
          <div className="grid size-11 place-items-center rounded-2xl bg-[rgba(201,166,107,0.25)]">
            <Mascot />
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <HudChip>
            <NutIcon /> {nuts}
          </HudChip>
          <HudChip>
            <CoinIcon /> {coins}
          </HudChip>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-2xl bg-[rgba(244,230,196,0.14)]"
          onClick={() => {
            sfxUi();
            setSettingsOpen(true);
          }}
          aria-label={t(lang, "settings")}
        >
          <Settings className="size-6" />
        </button>
      </header>

      <button
        type="button"
        onClick={() => setDailyOpen(true)}
        className="mx-4 mb-2 flex items-center gap-2 rounded-full bg-[rgba(244,230,196,0.12)] px-3 py-2"
      >
        <Gift className="size-4 text-[var(--color-coin)]" />
        <span className="text-xs font-bold tracking-wide">{t(lang, "daily")}</span>
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[rgba(0,0,0,0.28)]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#7DA15C,#E8C35A,#C47A5A)]"
            style={{ width: `${(dailyDone / 2) * 100}%` }}
          />
        </div>
        <span className="text-xs font-extrabold">{dailyDone}/2</span>
      </button>

      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => {
            sfxUi();
            setScreen("rank");
          }}
          className="absolute top-2 right-4 grid size-14 place-items-center rounded-full bg-[rgba(244,230,196,0.12)]"
          aria-label={t(lang, "rank")}
        >
          <Trophy className="size-6 text-[var(--color-coin)]" />
        </button>

        <div className="flex flex-col items-center">
          <button type="button" onClick={() => setScreen("levels")} className="relative" aria-label={t(lang, "levels")}>
            <div className="crate mx-auto">
              <div className="crate-face">
                <span className="text-5xl leading-none font-extrabold text-[var(--color-ink)]">{next}</span>
                <span className="mt-1 text-sm font-extrabold tracking-wide text-[var(--color-walnut)]">
                  {t(lang, "level")}
                </span>
              </div>
            </div>
          </button>
          <div className="platform -mt-2" />
          <div className="mt-3 flex items-center gap-1 text-sm font-bold text-[var(--color-cream-dark)]">
            <Star className="size-4 fill-[var(--color-coin)] text-[var(--color-coin)]" />
            {done}/{LEVEL_COUNT}
          </div>
        </div>
      </div>

      <div className="px-8 pb-3">
        <WoodButton
          variant="cream"
          className="w-full py-4 text-2xl tracking-wide"
          onClick={() => {
            unlockAudio();
            sfxUi();
            playLevel(next);
          }}
        >
          {maxUnlocked > LEVEL_COUNT ? t(lang, "finished") : t(lang, "play")}
        </WoodButton>
      </div>

      <nav className="mt-1 grid grid-cols-3 gap-1 border-t border-[rgba(244,230,196,0.12)] bg-[rgba(20,24,32,0.45)] px-2 pt-2 pb-[max(10px,env(safe-area-inset-bottom))]">
        <NavBtn icon={<Store className="size-6" />} label={t(lang, "shop")} onClick={() => setScreen("shop")} />
        <NavBtn icon={<Home className="size-6" />} label={t(lang, "home")} active />
        <NavBtn icon={<Shirt className="size-6" />} label={t(lang, "closet")} onClick={() => setScreen("closet")} />
      </nav>
      {dailyClaimed ? null : null}
    </div>
  );
}

function NavBtn({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button type="button" className="nav-tab py-1" data-active={active ? "true" : "false"} onClick={onClick}>
      <span className="grid size-11 place-items-center rounded-2xl bg-[rgba(244,230,196,0.08)]">{icon}</span>
      {label}
    </button>
  );
}
