import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Hammer, Pause, RotateCcw, Undo2, Home, Star, Settings } from "lucide-react";
import { LEVEL_COUNT, LEVELS, addStage, cloneLevel, levelFor, levelFromToml, rememberLevel, stageToToml } from "@/game/levels";
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
  const debug = useGameStore((s) => s.debug);
  const spendBooster = useGameStore((s) => s.spendBooster);
  const addBooster = useGameStore((s) => s.addBooster);
  const completeLevel = useGameStore((s) => s.completeLevel);
  const playLevel = useGameStore((s) => s.playLevel);
  const setScreen = useGameStore((s) => s.setScreen);
  const setSettingsOpen = useGameStore((s) => s.setSettingsOpen);
  const setToast = useGameStore((s) => s.setToast);

  const levelDef = levelFor(playingLevel);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);
  const [runId, setRunId] = useState(0);
  const [hud, setHud] = useState({
    time: levelDef.time,
    paused: false,
    won: false,
    lost: false,
    tool: "none" as ToolMode,
    tutorial: 0 as number,
    hint: "",
    editing: false,
    testing: false,
    gravityOff: false,
    addArmed: false,
    drillArmed: false,
    cols: levelDef.cols,
    rows: levelDef.rows,
    selected: false,
  });
  const [result, setResult] = useState<{ stars: number; coins: number } | null>(null);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [pasteError, setPasteError] = useState("");
  const resultRef = useRef(result);
  resultRef.current = result;
  const [boardReady, setBoardReady] = useState(false);
  const debugRef = useRef(debug);
  const editOnLoad = useRef(false);
  debugRef.current = debug;

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
    const stage = levelFor(playingLevel);
    const world = new World(stage, playingLevel, { reducedMotion: reduced, shake });
    worldRef.current = world;
    const openEdit = editOnLoad.current && debugRef.current;
    if (openEdit) {
      editOnLoad.current = false;
      world.setEditing(true);
    }
    setBoardReady(false);
    setHud({
      time: stage.time,
      paused: false,
      won: false,
      lost: false,
      tool: "none",
      tutorial: world.tutorialStep,
      hint: "",
      editing: openEdit,
      testing: false,
      gravityOff: openEdit,
      addArmed: false,
      drillArmed: false,
      cols: stage.cols,
      rows: stage.rows,
      selected: false,
    });

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
    setBoardReady(true);
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let fpsAcc = 0;
    let frames = 0;
    let fps = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const ctx = canvas.getContext("2d");
      if (!debugRef.current) {
        world.freezeClock = false;
        if (world.editing) world.setEditing(false);
      }
      if (ctx) {
        world.update(dt);
        frames += 1;
        fpsAcc += dt;
        if (fpsAcc >= 0.4) {
          fps = frames / fpsAcc;
          frames = 0;
          fpsAcc = 0;
        }
        drawWorld(
          ctx,
          world,
          { board: boardSkin, screw: screwSkin },
          debugRef.current ? { fps } : null,
        );
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
          editing: world.editing,
          testing: world.testing,
          gravityOff: world.gravityOff,
          addArmed: world.addArmed,
          drillArmed: world.drillArmed,
          cols: world.cols,
          rows: world.rows,
          selected: world.selection?.kind === "plank" || world.selection?.kind === "plank-hole",
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
      if (world.rewindHeld && resultRef.current && !world.won) setResult(null);
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
  }, [playingLevel, runId, boardSkin, screwSkin, shake, completeLevel]);

  const mm = String(Math.floor(hud.time / 60)).padStart(2, "0");
  const ss = String(hud.time % 60).padStart(2, "0");

  const useTool = (k: "undo" | "hammer" | "mallet") => {
    const w = worldRef.current;
    if (!w || w.won || w.lost || w.editing) return;
    if (k === "undo") {
      if (!spendBooster("undo")) {
        setToast(t(lang, "noBoost"));
        return;
      }
      sfxTap();
      w.undo();
      return;
    }
    if (!spendBooster(k)) {
      setToast(t(lang, "noBoost"));
      return;
    }
    sfxTap();
    w.setTool(k);
    setHud((h) => ({ ...h, tool: k, hint: k }));
  };

  const syncEditor = () => {
    const w = worldRef.current;
    if (!w) return;
    setHud((h) => ({
      ...h,
      editing: w.editing,
      testing: w.testing,
      gravityOff: w.gravityOff,
      addArmed: w.addArmed,
      drillArmed: w.drillArmed,
      cols: w.cols,
      rows: w.rows,
      selected: w.selection?.kind === "plank" || w.selection?.kind === "plank-hole",
    }));
  };

  const saveEdit = async () => {
    const w = worldRef.current;
    if (!w) return;
    const toml = stageToToml(playingLevel, w.level);
    let saved = false;
    try {
      const res = await fetch("/__stage", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: playingLevel, toml }),
      });
      saved = res.ok;
    } catch {
      saved = false;
    }
    try {
      await navigator.clipboard.writeText(toml);
    } catch {
      /* clipboard can be blocked; the file save still counts */
    }
    setToast(saved ? t(lang, "editSaved") : t(lang, "editCopied"));
  };

  const createStage = () => {
    const id = addStage();
    const toml = stageToToml(id, levelFor(id));
    editOnLoad.current = true;
    void fetch("/__stage", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, toml }),
    }).catch(() => undefined);
    void navigator.clipboard.writeText(toml).catch(() => undefined);
    setToast(`${t(lang, "stageAdded")} ${id}`);
    playLevel(id);
  };

  const openPaste = async () => {
    let clip = "";
    try {
      clip = await navigator.clipboard.readText();
    } catch {
      clip = "";
    }
    const looksLikeStage = clip.includes("[[planks]]") || clip.includes("\ncols ") || clip.startsWith("cols ");
    setPasteText(looksLikeStage ? clip : "");
    setPasteError("");
    setPasteOpen(true);
  };

  const overwriteFromToml = async () => {
    let level;
    try {
      level = levelFromToml(pasteText);
    } catch (err) {
      setPasteError(err instanceof Error ? err.message : t(lang, "editPasteBad"));
      return;
    }
    rememberLevel(playingLevel, level);
    if (playingLevel >= 1 && playingLevel <= LEVELS.length) LEVELS[playingLevel - 1] = cloneLevel(level);
    const toml = stageToToml(playingLevel, level);
    editOnLoad.current = true;
    setPasteOpen(false);
    setRunId((n) => n + 1);
    let saved = false;
    try {
      const res = await fetch("/__stage", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: playingLevel, toml }),
      });
      saved = res.ok;
    } catch {
      saved = false;
    }
    setToast(saved ? t(lang, "editPasted") : t(lang, "editCopied"));
  };

  const retry = () => {
    setResult(null);
    setRunId((n) => n + 1);
  };

  const tutorialText =
    hud.tutorial === 1 ? t(lang, "tutorial1") : hud.tutorial === 2 ? t(lang, "tutorial2") : hud.tutorial === 3 ? t(lang, "tutorial3") : "";

  return (
    <div className="relative flex h-full flex-col bg-[#5a4632]">
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
          <div className={`mt-1 rounded-full bg-[#3a2a1c] px-3 py-0.5 text-sm font-extrabold tabular-nums ${hud.time <= 10 && !hud.won && !hud.lost ? "timer-warn" : "text-[#f4e6c4]"}`}>
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
        {!boardReady && <div className="board-skeleton" aria-hidden />}
        {tutorialText && !hud.paused && !hud.won && !hud.lost && (
          <div className="pointer-events-none absolute top-3 right-3 left-3 text-center">
            <span className="hint-in inline-block rounded-full bg-[rgba(30,24,16,0.72)] px-3 py-1.5 text-sm font-bold text-[var(--color-cream)]">
              {tutorialText}
            </span>
          </div>
        )}
        {hud.tool !== "none" && (
          <div className="pointer-events-none absolute bottom-3 left-0 w-full text-center">
            <span className="hint-in inline-block rounded-full bg-[rgba(30,24,16,0.72)] px-3 py-1.5 text-sm font-bold text-[var(--color-cream)]">
              {hud.tool === "hammer" ? t(lang, "hammerHint") : t(lang, "malletHint")}
            </span>
          </div>
        )}
        {hud.hint === "place" && hud.tool === "none" && (
          <div className="pointer-events-none absolute bottom-3 left-0 w-full text-center">
            <span className="hint-in inline-block rounded-full bg-[rgba(30,24,16,0.72)] px-3 py-1.5 text-sm font-bold text-[var(--color-cream)]">
              {t(lang, "placeHint")}
            </span>
          </div>
        )}
        {debug && !hud.editing && (
          <div className="absolute right-1 bottom-1 left-1 z-20 flex flex-wrap justify-center gap-1">
            <DebugChip
              label={t(lang, "debugWin")}
              onClick={() => worldRef.current?.forceWin()}
            />
            <DebugChip
              label={t(lang, "debugPrev")}
              onClick={() => playLevel(Math.max(1, playingLevel - 1))}
            />
            <DebugChip
              label={t(lang, "debugNext")}
              onClick={() => playLevel(Math.min(LEVEL_COUNT, playingLevel + 1))}
            />
            <DebugChip label={t(lang, "debugAdd")} onClick={createStage} />
            <DebugChip
              label={t(lang, "debugTime")}
              onClick={() => {
                worldRef.current?.addTime(30);
                setHud((h) => ({ ...h, time: Math.ceil(worldRef.current?.timeLeft ?? h.time) }));
              }}
            />
            <DebugChip
              label={t(lang, "debugFreeze")}
              active={worldRef.current?.freezeClock}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                w.freezeClock = !w.freezeClock;
                setHud((h) => ({ ...h }));
              }}
            />
            <DebugChip
              label={t(lang, "debugRewind")}
              active={worldRef.current?.rewindHeld}
              onPointerDown={(event) => {
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                const w = worldRef.current;
                if (w) w.rewindHeld = true;
                setHud((h) => ({ ...h }));
              }}
              onPointerUp={(event) => {
                const w = worldRef.current;
                if (w) w.rewindHeld = false;
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
                setHud((h) => ({ ...h }));
              }}
              onPointerCancel={() => {
                const w = worldRef.current;
                if (w) w.rewindHeld = false;
                setHud((h) => ({ ...h }));
              }}
            />
            <DebugChip
              label={t(lang, "debugBoost")}
              onClick={() => {
                addBooster("undo", 5);
                addBooster("hammer", 5);
                addBooster("mallet", 5);
              }}
            />
            <DebugChip
              label={t(lang, "debugEdit")}
              active={hud.editing}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                w.setEditing(!w.editing);
                syncEditor();
              }}
            />
          </div>
        )}
      </div>

      {debug && hud.editing && (
        <div className="relative z-20 px-2 pt-1 pb-[max(8px,env(safe-area-inset-bottom))]">
          <p className="mb-1 text-center text-[11px] leading-none font-bold text-[#f4e6c4]">
            <span className="mr-2 tabular-nums">
              {hud.cols}×{hud.rows}
            </span>
            {hud.testing
              ? t(lang, "editHintPlay")
              : hud.addArmed
                ? t(lang, "editHintAdd")
                : hud.drillArmed
                  ? t(lang, "editHintDrill")
                  : t(lang, "editHint")}
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            <DebugChip
              label={hud.testing ? t(lang, "editStop") : t(lang, "editPlay")}
              active={hud.testing}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                w.setTesting(!w.testing);
                syncEditor();
              }}
            />
            {!hud.testing && (
              <DebugChip
                label={t(lang, "debugEdit")}
                active
                onClick={() => {
                  const w = worldRef.current;
                  if (!w) return;
                  w.setEditing(false);
                  syncEditor();
                }}
              />
            )}
            {!hud.testing && <DebugChip label={t(lang, "debugAdd")} onClick={createStage} />}
            <DebugChip
              label={hud.gravityOff ? t(lang, "editGravityOff") : t(lang, "editGravityOn")}
              active={hud.gravityOff}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                w.setGravityOff(!w.gravityOff);
                syncEditor();
              }}
            />
            {!hud.testing && (
              <>
            <DebugChip
              label={t(lang, "editAdd")}
              active={hud.addArmed}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                w.addArmed = !w.addArmed;
                if (w.addArmed) w.drillArmed = false;
                syncEditor();
              }}
            />
            <DebugChip
              label={t(lang, "editDrill")}
              active={hud.drillArmed}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                w.drillArmed = !w.drillArmed;
                if (w.drillArmed) w.addArmed = false;
                syncEditor();
              }}
            />
            <DebugChip
              label={t(lang, "editColGrow")}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                const result = w.resizeBoard("col", 1);
                if (result === "limit") setToast(t(lang, "editBoardLimit"));
                syncEditor();
              }}
            />
            <DebugChip
              label={t(lang, "editColShrink")}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                const result = w.resizeBoard("col", -1);
                if (result === "limit") setToast(t(lang, "editBoardLimit"));
                if (result === "fit") setToast(t(lang, "editBoardFit"));
                syncEditor();
              }}
            />
            <DebugChip
              label={t(lang, "editRowGrow")}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                const result = w.resizeBoard("row", 1);
                if (result === "limit") setToast(t(lang, "editBoardLimit"));
                syncEditor();
              }}
            />
            <DebugChip
              label={t(lang, "editRowShrink")}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                const result = w.resizeBoard("row", -1);
                if (result === "limit") setToast(t(lang, "editBoardLimit"));
                if (result === "fit") setToast(t(lang, "editBoardFit"));
                syncEditor();
              }}
            />
            <DebugChip
              label={t(lang, "editRotate")}
              active={hud.selected}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                const result = w.rotateSelected();
                if (result === "none") setToast(t(lang, "editNeedPick"));
                if (result === "blocked") setToast(t(lang, "editBlocked"));
                syncEditor();
              }}
            />
            <DebugChip
              label={t(lang, "editGrow")}
              active={hud.selected}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                const result = w.resizeSelected(true);
                if (result === "none") setToast(t(lang, "editNeedPick"));
                if (result === "blocked") setToast(t(lang, "editBlocked"));
                syncEditor();
              }}
            />
            <DebugChip
              label={t(lang, "editShrink")}
              active={hud.selected}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                const result = w.resizeSelected(false);
                if (result === "none") setToast(t(lang, "editNeedPick"));
                if (result === "blocked") setToast(t(lang, "editBlocked"));
                if (result === "short") setToast(t(lang, "editShort"));
                syncEditor();
              }}
            />
            <DebugChip
              label={t(lang, "editColor")}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                if (!w.cycleColor()) setToast(t(lang, "editNeedPick"));
              }}
            />
            <DebugChip
              label={t(lang, "editDelete")}
              onClick={() => {
                const w = worldRef.current;
                if (!w) return;
                const result = w.deleteSelected();
                if (result === "none") setToast(t(lang, "editNeedPick"));
                if (result === "last") setToast(t(lang, "editLast"));
                syncEditor();
              }}
            />
            <DebugChip label={t(lang, "editSave")} onClick={() => void saveEdit()} />
            <DebugChip label={t(lang, "editPaste")} onClick={() => void openPaste()} />
              </>
            )}
          </div>
        </div>
      )}

      {!hud.editing && (
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
      )}

      {pasteOpen && (
        <ModalShell title={t(lang, "editPasteTitle")} onClose={() => setPasteOpen(false)}>
          <textarea
            value={pasteText}
            onChange={(e) => {
              setPasteText(e.target.value);
              setPasteError("");
            }}
            spellCheck={false}
            className="h-40 w-full resize-none rounded-2xl bg-[rgba(90,50,20,0.08)] p-3 font-mono text-xs leading-relaxed"
            placeholder={"cols = 4\nrows = 4\n\n[[planks]]\ncolor = \"oak\"\nz = 1\nholes = [[1, 1], [2, 1]]"}
          />
          {pasteError && <p className="mt-2 text-center text-xs font-bold text-[#8a3d2f]">{pasteError}</p>}
          <div className="mt-3">
            <WoodButton onClick={() => void overwriteFromToml()}>{t(lang, "editPasteApply")}</WoodButton>
          </div>
        </ModalShell>
      )}

      {hud.paused && !hud.won && !hud.lost && (
        <ModalShell title={t(lang, "pause")} onClose={() => worldRef.current?.setPaused(false)}>
          <div className="flex flex-col gap-2">
            <WoodButton onClick={() => worldRef.current?.setPaused(false)}>{t(lang, "resume")}</WoodButton>
            <WoodButton variant="wood" onClick={retry}>
              {t(lang, "retry")}
            </WoodButton>
            <WoodButton variant="wood" onClick={() => setSettingsOpen(true)}>
              <span className="inline-flex items-center gap-2">
                <Settings className="size-5" /> {t(lang, "settings")}
              </span>
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
  const empty = count <= 0;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-disabled={empty}
      className={`relative grid size-[68px] place-items-center rounded-[18px] border-[3px] border-[#8a6434] bg-[linear-gradient(#f3e4bf,#d7b87e)] text-[var(--color-ink)] shadow-[0_4px_0_#6a4a24] transition-transform duration-150 ease-out active:scale-[0.96] ${active ? "ring-2 ring-[#5c3a28]" : ""} ${empty ? "opacity-45" : ""}`}
    >
      {icon}
      <span className="absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-[#6b8f4e] text-xs font-extrabold text-white">
        {count}
      </span>
    </button>
  );
}

function DebugChip({
  label,
  onClick,
  active,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
  onPointerDown?: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerUp?: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerCancel?: (event: ReactPointerEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onContextMenu={(event) => event.preventDefault()}
      className={`hud-chip min-h-9 touch-none rounded-xl px-2.5 py-1 text-xs font-extrabold ${active ? "ring-2 ring-[var(--color-coin)]" : ""}`}
    >
      {label}
    </button>
  );
}
