import { useEffect, useRef, useState } from "react";
import { Hammer, Pause, RotateCcw, Undo2, Home, Star } from "lucide-react";
import { LEVELS, LEVEL_COUNT } from "@/game/levels";
import { World, type ToolMode } from "@/game/world";
import { drawWorld } from "@/game/render";
import { useGameStore } from "@/game/store";
import { t } from "@/game/i18n";
import { unlockAudio, sfxWin, sfxLose, sfxTap, setMusicEnabled, setSfxEnabled } from "@/game/audio";
import { WoodButton, HudChip, ModalShell, CoinIcon } from "./WoodUI";

export function PlayScreen() {
  const playingLevel = useGameStore((s) => s.playingLevel);
  const lang = useGameStore((s) => s.lang);
  const boosters = useGameStore((s) => s.boosters);
  const boardSkin = useGameStore((s) => s.boardSkin);
  const screwSkin = useGameStore((s) => s.screwSkin);
  const sfx = useGameStore((s) => s.sfx);
  const music = useGameStore((s) => s.music);
  const shake = useGameStore((s) => s.shake);
  const spendBooster = useGameStore((s) => s.spendBooster);
  const completeLevel = useGameStore((s) => s.completeLevel);
  const playLevel = useGameStore((s) => s.playLevel);
  const setScreen = useGameStore((s) => s.setScreen);

  const levelDef = LEVELS[Math.max(0, Math.min(LEVEL_COUNT, playingLevel) - 1)] ?? LEVELS[0]!;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);
  const [runId, setRunId] = useState(0);
  const [hud, setHud] = useState({ time: levelDef.time, paused: false, won: false, lost: false, tool: "none" as ToolMode, tutorial: 0 as number, hint: "" });
  const [result, setResult] = useState<{ stars: number; coins: number } | null>(null);

  useEffect(() => {
    setSfxEnabled(sfx);
    setMusicEnabled(music);
  }, [sfx, music]);

  useEffect(() => {
    unlockAudio();
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const world = new World(levelDef, playingLevel, { reducedMotion: reduced, shake });
    worldRef.current = world;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(2.5, window.devicePixelRatio || 1);
      const w = Math.max(200, Math.floor(rect.width));
      const h = Math.max(240, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      world.rebuild(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        world.update(dt);
        drawWorld(ctx, world, { board: boardSkin, screw: screwSkin });
      }
      acc += dt;
      if (acc > 0.15) {
        acc = 0;
        setHud({
          time: Math.ceil(world.timeLeft),
          paused: world.paused,
          won: world.won,
          lost: world.lost,
          tool: world.tool,
          tutorial: world.tutorialStep,
          hint: world.hint,
        });
      }
      if (world.justWon) {
        sfxWin();
        const stars = world.stars();
        completeLevel(playingLevel, stars, world.timeLeft, world.timeLimit);
        const coins = 12 + stars * 8 + Math.floor(world.timeLeft / 8);
        setResult({ stars, coins });
      }
      if (world.justLost) sfxLose();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const down = (e: PointerEvent) => {
      e.preventDefault();
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* synthetic events */
      }
      const p = toLocal(e);
      world.pointerDown(p.x, p.y, e.pointerId);
    };
    const move = (e: PointerEvent) => {
      const p = toLocal(e);
      world.pointerMove(p.x, p.y, e.pointerId);
    };
    const up = (e: PointerEvent) => {
      const p = toLocal(e);
      world.pointerUp(p.x, p.y, e.pointerId);
    };
    const cancel = (e: PointerEvent) => world.pointerCancel(e.pointerId);

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", cancel);

    const qa = {
      win: () => world.forceWin(),
      level: playingLevel,
      goto: (n: number) => playLevel(n),
      cover: (c: number, r: number) => world.isHoleCovered(c, r),
      timeLeft: () => world.timeLeft,
      held: () => (world.held ? world.held.key : null),
      tap: (x: number, y: number) => {
        world.pointerDown(x, y, 99);
        world.pointerUp(x, y, 99);
      },
      screws: () =>
        [...world.screws.values()]
          .filter((s) => s.alive)
          .map((s) => ({ x: s.x, y: s.y, key: s.key, covered: world.isCovered(s) })),
      drops: () => world.dropTargets().map((h) => ({ c: h.c, r: h.r, x: h.x, y: h.y })),
      planks: () =>
        world.planks
          .filter((p) => !p.removed)
          .map((p) => ({
            id: p.id,
            x: p.x,
            y: p.y,
            vx: p.vx,
            vy: p.vy,
            angle: p.angle,
            av: p.av,
            anchors: p.anchors.length,
            keys: p.anchors,
            free: p.anchors.length === 0,
            fly: p.fly,
            removed: p.removed,
          })),
    };
    (window as unknown as { __nutQA: typeof qa }).__nutQA = qa;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", cancel);
    };
  }, [playingLevel, runId, levelDef, boardSkin, screwSkin, shake, completeLevel]);

  const mm = String(Math.floor(hud.time / 60)).padStart(2, "0");
  const ss = String(hud.time % 60).padStart(2, "0");

  const useTool = (k: "undo" | "hammer" | "mallet") => {
    const w = worldRef.current;
    if (!w || w.won || w.lost) return;
    if (k === "undo") {
      if (!spendBooster("undo")) return;
      sfxTap();
      w.undo();
      return;
    }
    if (!spendBooster(k)) return;
    sfxTap();
    w.setTool(k);
    setHud((h) => ({ ...h, tool: k, hint: k }));
  };

  const retry = () => {
    setResult(null);
    setRunId((n) => n + 1);
  };

  const tutorialText =
    hud.tutorial === 1 ? t(lang, "tutorial1") : hud.tutorial === 2 ? t(lang, "tutorial2") : hud.tutorial === 3 ? t(lang, "tutorial3") : "";

  return (
    <div className="flex h-full flex-col bg-[#5a4632]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(90deg, #4a3828 0 18px, #5c4632 18px 36px, #3e2e22 36px 38px)",
        }}
      />
      <header className="relative z-10 flex items-center justify-between px-3 pt-[max(10px,env(safe-area-inset-top))] pb-1">
        <button
          type="button"
          className="hud-chip grid size-11 place-items-center rounded-2xl"
          onClick={() => worldRef.current?.setPaused(true)}
          aria-label={t(lang, "pause")}
        >
          <Pause className="size-5" />
        </button>
        <div className="flex flex-col items-center">
          <div className="hud-chip rounded-2xl px-4 py-1 text-base">
            {t(lang, "level")} {playingLevel}
          </div>
          <div className="mt-1 rounded-full bg-[#3a2a1c] px-3 py-0.5 text-sm font-extrabold text-[#f4e6c4] tabular-nums">
            {mm}:{ss}
          </div>
        </div>
        <HudChip className="min-w-11 justify-center">
          <Undo2 className="size-4" /> {boosters.undo}
        </HudChip>
      </header>

      <div ref={wrapRef} className="relative z-10 mx-3 min-h-0 flex-1">
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none"
          style={{ touchAction: "none" }}
        />
        {tutorialText && !hud.paused && !hud.won && !hud.lost && (
          <div className="pointer-events-none absolute top-3 right-3 left-3 text-center">
            <span className="inline-block rounded-full bg-[rgba(30,24,16,0.72)] px-3 py-1.5 text-sm font-bold text-[var(--color-cream)]">
              {tutorialText}
            </span>
          </div>
        )}
        {hud.tool !== "none" && (
          <div className="pointer-events-none absolute bottom-3 left-0 w-full text-center">
            <span className="inline-block rounded-full bg-[rgba(30,24,16,0.72)] px-3 py-1.5 text-sm font-bold text-[var(--color-cream)]">
              {hud.tool === "hammer" ? t(lang, "hammerHint") : t(lang, "malletHint")}
            </span>
          </div>
        )}
        {hud.hint === "place" && hud.tool === "none" && (
          <div className="pointer-events-none absolute bottom-3 left-0 w-full text-center">
            <span className="inline-block rounded-full bg-[rgba(30,24,16,0.72)] px-3 py-1.5 text-sm font-bold text-[var(--color-cream)]">
              {t(lang, "placeHint")}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-center gap-5 px-4 pt-2 pb-[max(12px,env(safe-area-inset-bottom))]">
        <BoosterBtn
          icon={<Hammer className="size-7" />}
          count={boosters.hammer}
          active={hud.tool === "hammer"}
          onClick={() => useTool("hammer")}
          label={t(lang, "hammer")}
        />
        <BoosterBtn
          icon={<Undo2 className="size-7" />}
          count={boosters.undo}
          onClick={() => useTool("undo")}
          label={t(lang, "undo")}
        />
        <BoosterBtn
          icon={<RotateCcw className="size-7" />}
          count={boosters.mallet}
          active={hud.tool === "mallet"}
          onClick={() => useTool("mallet")}
          label={t(lang, "mallet")}
        />
      </div>

      {hud.paused && !hud.won && !hud.lost && (
        <ModalShell title={t(lang, "pause")} onClose={() => worldRef.current?.setPaused(false)}>
          <div className="flex flex-col gap-2">
            <WoodButton onClick={() => worldRef.current?.setPaused(false)}>{t(lang, "resume")}</WoodButton>
            <WoodButton variant="wood" onClick={retry}>
              {t(lang, "retry")}
            </WoodButton>
            <WoodButton variant="wood" onClick={() => setScreen("home")}>
              <span className="inline-flex items-center gap-2">
                <Home className="size-5" /> {t(lang, "toHome")}
              </span>
            </WoodButton>
          </div>
        </ModalShell>
      )}

      {hud.lost && !result && (
        <ModalShell title={t(lang, "fail")}>
          <p className="mb-4 text-center text-sm font-bold">{t(lang, "failHint")}</p>
          <div className="flex flex-col gap-2">
            <WoodButton onClick={retry}>{t(lang, "retry")}</WoodButton>
            <WoodButton variant="wood" onClick={() => setScreen("home")}>
              {t(lang, "toHome")}
            </WoodButton>
          </div>
        </ModalShell>
      )}

      {result && (
        <ModalShell title={t(lang, "clear")}>
          <div className="mb-3 flex justify-center gap-1">
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                className="star-pop size-9"
                style={{ animationDelay: `${i * 80}ms` }}
                fill={i <= result.stars ? "#E8C35A" : "transparent"}
                color={i <= result.stars ? "#E8C35A" : "rgba(90,70,40,0.35)"}
              />
            ))}
          </div>
          <div className="mb-4 flex items-center justify-center gap-1 font-extrabold">
            <CoinIcon size={20} /> +{result.coins}
          </div>
          <div className="flex flex-col gap-2">
            {playingLevel < LEVEL_COUNT && (
              <WoodButton
                onClick={() => {
                  setResult(null);
                  playLevel(playingLevel + 1);
                }}
              >
                {t(lang, "next")}
              </WoodButton>
            )}
            <WoodButton variant="wood" onClick={retry}>
              {t(lang, "retry")}
            </WoodButton>
            <WoodButton variant="wood" onClick={() => setScreen("home")}>
              {t(lang, "toHome")}
            </WoodButton>
          </div>
        </ModalShell>
      )}
    </div>
  );
}

function BoosterBtn({
  icon,
  count,
  onClick,
  active,
  label,
}: {
  icon: React.ReactNode;
  count: number;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`relative grid size-[68px] place-items-center rounded-[18px] border-[3px] border-[#8a6434] bg-[linear-gradient(#f3e4bf,#d7b87e)] text-[var(--color-ink)] shadow-[0_4px_0_#6a4a24] ${active ? "ring-2 ring-[#5c3a28]" : ""}`}
    >
      {icon}
      <span className="absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-[#6b8f4e] text-xs font-extrabold text-white">
        {count}
      </span>
    </button>
  );
}
