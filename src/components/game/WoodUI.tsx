import type { ReactNode } from "react";
import { Pause, RotateCcw, Hammer, Undo2, X, Volume2, VolumeX, Languages, Bug } from "lucide-react";
import { t, type I18nKey } from "@/game/i18n";
import { useGameStore } from "@/game/store";

export function WoodButton({
  children,
  onClick,
  variant = "cream",
  className = "",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "cream" | "wood" | "sage";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`wood-btn wood-btn-${variant} rounded-[18px] px-5 py-3 text-lg ${className}`}
    >
      {children}
    </button>
  );
}

export function HudChip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`hud-chip inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-extrabold ${className}`}>
      {children}
    </div>
  );
}

export function CoinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#E8C35A" stroke="#B07A20" strokeWidth="2" />
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="#F8E7A0" strokeWidth="1.4" />
    </svg>
  );
}

export function NutIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#C9A66B" stroke="#6A4A24" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="#8E6B38" />
    </svg>
  );
}

export function ScrewIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#D8DCE2" stroke="#6A7078" strokeWidth="1.6" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="#4A5058" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function ModalShell({
  children,
  onClose,
  title,
}: {
  children: ReactNode;
  onClose?: () => void;
  title?: string;
}) {
  const lang = useGameStore((s) => s.lang);
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[rgba(16,18,26,0.55)] px-5">
      <div className="panel-wood modal-in relative w-full max-w-[340px] rounded-[28px] p-5 text-[var(--color-ink)]">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-[rgba(90,50,20,0.12)] transition-transform duration-150 ease-out active:scale-[0.96]"
            aria-label={t(lang, "close")}
          >
            <X className="size-5" />
          </button>
        )}
        {title && <h2 className="mb-3 text-center text-xl font-extrabold">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export function SettingsModal() {
  const lang = useGameStore((s) => s.lang);
  const sfx = useGameStore((s) => s.sfx);
  const music = useGameStore((s) => s.music);
  const shake = useGameStore((s) => s.shake);
  const debug = useGameStore((s) => s.debug);
  const toggle = useGameStore((s) => s.toggle);
  const setLang = useGameStore((s) => s.setLang);
  const reset = useGameStore((s) => s.reset);
  const setSettingsOpen = useGameStore((s) => s.setSettingsOpen);
  const tt = (k: I18nKey) => t(lang, k);

  return (
    <ModalShell title={tt("settings")} onClose={() => setSettingsOpen(false)}>
      <div className="flex flex-col gap-2">
        <Row label={tt("sfx")} onClick={() => toggle("sfx")}>
          {sfx ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
          <span>{sfx ? tt("on") : tt("off")}</span>
        </Row>
        <Row label={tt("music")} onClick={() => toggle("music")}>
          {music ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
          <span>{music ? tt("on") : tt("off")}</span>
        </Row>
        <Row label={tt("shake")} onClick={() => toggle("shake")}>
          <span>{shake ? tt("on") : tt("off")}</span>
        </Row>
        <Row label={tt("debug")} onClick={() => toggle("debug")}>
          <Bug className="size-5" />
          <span>{debug ? tt("on") : tt("off")}</span>
        </Row>
        <Row label={tt("lang")} onClick={() => setLang(lang === "ja" ? "en" : "ja")}>
          <Languages className="size-5" />
          <span>{lang === "ja" ? "日本語" : "English"}</span>
        </Row>
        <button
          type="button"
          className="mt-2 rounded-2xl bg-[rgba(90,40,30,0.12)] px-3 py-2 text-sm font-bold"
          onClick={() => {
            if (confirm(tt("resetConfirm"))) reset();
          }}
        >
          {tt("reset")}
        </button>
      </div>
    </ModalShell>
  );
}

function Row({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl bg-[rgba(255,255,240,0.28)] px-3 py-2.5 font-bold"
    >
      <span>{label}</span>
      <span className="inline-flex items-center gap-1">{children}</span>
    </button>
  );
}

export { Pause, RotateCcw, Hammer, Undo2 };
