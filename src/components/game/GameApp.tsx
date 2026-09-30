import { useEffect, useLayoutEffect } from "react";
import { useGameStore } from "@/game/store";
import { unlockAudio, setMusicEnabled, setSfxEnabled } from "@/game/audio";
import { t } from "@/game/i18n";
import { HomeScreen } from "./HomeScreen";
import { PlayScreen } from "./PlayScreen";
import { ShopScreen, ClosetScreen, RankScreen, LevelSelect, DailyModal, Toast } from "./OtherScreens";
import { SettingsModal } from "./WoodUI";

export function GameApp() {
  const screen = useGameStore((s) => s.screen);
  const settingsOpen = useGameStore((s) => s.settingsOpen);
  const dailyOpen = useGameStore((s) => s.dailyOpen);
  const sfx = useGameStore((s) => s.sfx);
  const music = useGameStore((s) => s.music);
  const lang = useGameStore((s) => s.lang);
  const ready = useGameStore((s) => s.ready);
  const hydrate = useGameStore((s) => s.hydrate);

  useLayoutEffect(() => {
    hydrate();
    (window as unknown as { __nutStore: typeof useGameStore }).__nutStore = useGameStore;
  }, [hydrate]);

  useEffect(() => {
    document.documentElement.lang = lang === "ja" ? "ja" : "en";
  }, [lang]);

  useEffect(() => {
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  useEffect(() => {
    setSfxEnabled(sfx);
    setMusicEnabled(music);
  }, [sfx, music]);

  return (
    <div className="flex h-dvh min-h-[100dvh] w-full items-center justify-center bg-[var(--color-warehouse-deep)]">
      <div className="phone-shell">
        {!ready ? (
          <BootScreen />
        ) : (
          <>
            {screen === "home" && <HomeScreen />}
            {screen === "play" && <PlayScreen />}
            {screen === "shop" && <ShopScreen />}
            {screen === "closet" && <ClosetScreen />}
            {screen === "rank" && <RankScreen />}
            {screen === "levels" && <LevelSelect />}
            {settingsOpen && <SettingsModal />}
            {dailyOpen && <DailyModal />}
            <Toast />
          </>
        )}
      </div>
    </div>
  );
}

function BootScreen() {
  const lang = useGameStore((s) => s.lang);
  return (
    <div
      className="workshop-bg flex h-full flex-col items-center justify-center gap-5 text-[var(--color-cream)]"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="crate">
        <div className="crate-face">
          <span className="text-lg font-extrabold text-[var(--color-ink)]">{t(lang, "title")}</span>
        </div>
      </div>
      <p className="boot-pulse text-sm font-bold text-[var(--color-cream-dark)]">{t(lang, "loading")}</p>
    </div>
  );
}