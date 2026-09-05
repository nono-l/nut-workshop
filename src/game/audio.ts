let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfxBus: GainNode | null = null;
let musicBus: GainNode | null = null;
let unlocked = false;
let musicTimer: number | null = null;
let musicOn = true;
let sfxOn = true;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C({ latencyHint: "interactive" });
    master = ctx.createGain();
    sfxBus = ctx.createGain();
    musicBus = ctx.createGain();
    sfxBus.gain.value = 0.7;
    musicBus.gain.value = 0.18;
    sfxBus.connect(master);
    musicBus.connect(master);
    master.connect(ctx.destination);
  }
  return ctx;
}

export function unlockAudio() {
  const c = ac();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  unlocked = true;
  if (musicOn) startMusic();
}

export function setSfxEnabled(v: boolean) {
  sfxOn = v;
  if (sfxBus) sfxBus.gain.setTargetAtTime(v ? 0.7 : 0, ac()?.currentTime ?? 0, 0.03);
}

export function setMusicEnabled(v: boolean) {
  musicOn = v;
  if (!v) stopMusic();
  else if (unlocked) startMusic();
}

function beep(
  freq: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  at = 0,
  slide?: number,
) {
  if (!sfxOn || !unlocked) return;
  const c = ac();
  if (!c || !sfxBus) return;
  const t0 = c.currentTime + at;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slide), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(sfxBus);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function noise(dur: number, gain: number, at = 0) {
  if (!sfxOn || !unlocked) return;
  const c = ac();
  if (!c || !sfxBus) return;
  const n = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
  const d = n.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = c.createBufferSource();
  src.buffer = n;
  const g = c.createGain();
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 1800;
  g.gain.value = gain;
  src.connect(f);
  f.connect(g);
  g.connect(sfxBus);
  src.start(c.currentTime + at);
}

export function sfxUnscrew() {
  const p = 0.92 + Math.random() * 0.16;
  beep(180 * p, 0.08, "square", 0.09);
  beep(420 * p, 0.14, "triangle", 0.07, 0.02, 220);
  noise(0.08, 0.08);
}

export function sfxWood() {
  noise(0.12, 0.12);
  beep(140 + Math.random() * 30, 0.1, "sine", 0.06, 0, 80);
}

export function sfxTap() {
  beep(620, 0.05, "sine", 0.05);
}

export function sfxWin() {
  beep(523, 0.16, "triangle", 0.09);
  beep(659, 0.16, "triangle", 0.09, 0.1);
  beep(784, 0.22, "triangle", 0.1, 0.2);
  beep(1046, 0.35, "sine", 0.08, 0.32);
}

export function sfxLose() {
  beep(320, 0.2, "sine", 0.08, 0, 180);
  beep(180, 0.35, "triangle", 0.07, 0.12, 90);
}

export function sfxWhoosh() {
  noise(0.18, 0.1);
  beep(380, 0.18, "sine", 0.04, 0, 120);
}

export function sfxUi() {
  beep(880, 0.04, "sine", 0.04);
}

function startMusic() {
  stopMusic();
  if (!musicOn || !unlocked) return;
  const c = ac();
  if (!c || !musicBus) return;

  const notes = [196, 247, 294, 330, 392, 330, 294, 247];
  let i = 0;
  const tick = () => {
    if (!musicOn || !ctx || !musicBus) return;
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = notes[i % notes.length]!;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.045, t0 + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.7);
    osc.connect(g);
    g.connect(musicBus);
    osc.start(t0);
    osc.stop(t0 + 0.75);
    i++;
    musicTimer = window.setTimeout(tick, 820);
  };
  tick();
}

function stopMusic() {
  if (musicTimer != null) {
    clearTimeout(musicTimer);
    musicTimer = null;
  }
}

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (ctx?.state === "running") void ctx.suspend();
    } else if (unlocked) {
      void ctx?.resume();
    }
  });
}
