import { useEffect } from "react";
import { useGameStore } from "@/game/store";
import { unlockAudio, setMusicEnabled, setSfxEnabled } from "@/game/audio";
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
  const hydrate = useGameStore((s) => s.hydrate);

  useEffect(() => {
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
    <div className="flex h-dvh min-h-[100dvh] w-full items-center justify-center bg-[#141820]">
      <div className="phone-shell">
        {screen === "home" && <HomeScreen />}
        {screen === "play" && <PlayScreen />}
        {screen === "shop" && <ShopScreen />}
        {screen === "closet" && <ClosetScreen />}
        {screen === "rank" && <RankScreen />}
        {screen === "levels" && <LevelSelect />}
        {settingsOpen && <SettingsModal />}
        {dailyOpen && <DailyModal />}
        <Toast />
      </div>
    </div>
  );
}
