import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Gift, a as Trophy, c as Star, d as RotateCcw, f as Pause, g as Hammer, h as House, i as Undo2, l as Shirt, m as Languages, n as VolumeX, p as Lock, r as Volume2, s as Store, t as X, u as Settings, v as Check, y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C41L5gEE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_SAVE = {
	version: 1,
	maxUnlocked: 1,
	coins: 80,
	nuts: 2,
	boosters: {
		undo: 3,
		hammer: 1,
		mallet: 1
	},
	stars: {},
	bestTime: {},
	lang: "ja",
	sfx: true,
	music: true,
	shake: true,
	boardSkin: "oak",
	screwSkin: "steel",
	ownedSkins: ["oak", "steel"],
	dailyDate: "",
	dailyDone: 0,
	dailyClaimed: false,
	wins: 0
};
var COLOR_PALETTE = {
	oak: {
		base: "#C9A66B",
		dark: "#8E6B38",
		light: "#E8D09A",
		grain: "#B08A4A"
	},
	green: {
		base: "#7DA15C",
		dark: "#4F7038",
		light: "#B5D08A",
		grain: "#658A45"
	},
	honey: {
		base: "#E0B25A",
		dark: "#B07A28",
		light: "#F3D48A",
		grain: "#C9943A"
	},
	cedar: {
		base: "#C47A5A",
		dark: "#8A4A32",
		light: "#E2A888",
		grain: "#A86242"
	},
	sage: {
		base: "#6F9A86",
		dark: "#3F6A58",
		light: "#A8C8B6",
		grain: "#54806C"
	}
};
function p(color, holes, z) {
	return {
		color,
		holes,
		z
	};
}
function L(cols, rows, time, planks, open) {
	return {
		cols,
		rows,
		time,
		planks,
		open
	};
}
var LEVELS = [
	L(4, 4, 90, [p("oak", [[1, 1], [2, 1]], 1)]),
	L(4, 4, 90, [p("oak", [[1, 1], [2, 1]], 1), p("green", [[1, 2], [2, 2]], 1)]),
	L(4, 4, 80, [p("oak", [
		[0, 2],
		[1, 2],
		[2, 2]
	], 1), p("green", [
		[1, 1],
		[1, 2],
		[1, 3]
	], 2)]),
	L(4, 5, 80, [
		p("oak", [
			[0, 1],
			[1, 1],
			[2, 1]
		], 1),
		p("green", [
			[1, 2],
			[2, 2],
			[3, 2]
		], 1),
		p("honey", [[0, 3], [1, 3]], 1)
	]),
	L(4, 5, 75, [p("green", [
		[2, 1],
		[2, 2],
		[2, 3]
	], 1), p("oak", [[0, 1], [3, 1]], 2)]),
	L(4, 5, 75, [
		p("green", [
			[0, 1],
			[0, 2],
			[0, 3]
		], 1),
		p("honey", [
			[1, 3],
			[2, 3],
			[3, 3]
		], 1),
		p("oak", [
			[0, 2],
			[1, 2],
			[2, 2]
		], 2)
	]),
	L(4, 5, 75, [
		p("sage", [
			[1, 1],
			[1, 2],
			[1, 3]
		], 1),
		p("cedar", [
			[2, 1],
			[2, 2],
			[2, 3]
		], 1),
		p("oak", [[0, 1], [3, 1]], 2),
		p("green", [[0, 3], [3, 3]], 2)
	]),
	L(4, 5, 70, [
		p("oak", [
			[0, 3],
			[1, 2],
			[2, 1]
		], 2),
		p("green", [
			[0, 1],
			[0, 2],
			[0, 3]
		], 1),
		p("honey", [[2, 1], [3, 1]], 1)
	]),
	L(5, 5, 70, [
		p("oak", [
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1]
		], 2),
		p("green", [
			[0, 1],
			[0, 2],
			[0, 3]
		], 1),
		p("sage", [
			[3, 1],
			[3, 2],
			[3, 3]
		], 1),
		p("honey", [
			[0, 3],
			[1, 3],
			[2, 3],
			[3, 3]
		], 2)
	]),
	L(5, 5, 70, [
		p("cedar", [[2, 2]], 1),
		p("green", [
			[1, 2],
			[2, 2],
			[3, 2]
		], 2),
		p("oak", [
			[2, 1],
			[2, 2],
			[2, 3]
		], 3),
		p("honey", [[1, 1], [3, 1]], 2),
		p("sage", [[1, 3], [3, 3]], 2)
	]),
	L(5, 6, 65, [
		p("oak", [
			[0, 1],
			[1, 1],
			[2, 1]
		], 2),
		p("green", [
			[2, 1],
			[3, 1],
			[4, 1]
		], 1),
		p("honey", [
			[0, 3],
			[1, 3],
			[2, 3]
		], 1),
		p("sage", [
			[2, 3],
			[3, 3],
			[4, 3]
		], 2),
		p("cedar", [
			[2, 1],
			[2, 2],
			[2, 3],
			[2, 4]
		], 3)
	]),
	L(4, 5, 65, [
		p("green", [[0, 2], [0, 3]], 1),
		p("green", [[3, 1], [3, 2]], 1),
		p("oak", [[1, 3], [2, 3]], 2),
		p("oak", [[2, 1], [3, 1]], 2),
		p("honey", [
			[0, 3],
			[1, 2],
			[2, 1],
			[3, 0]
		], 3)
	]),
	L(5, 5, 60, [
		p("oak", [
			[0, 1],
			[1, 1],
			[2, 1]
		], 1),
		p("oak", [
			[2, 3],
			[3, 3],
			[4, 3]
		], 1),
		p("green", [
			[1, 0],
			[1, 1],
			[1, 2]
		], 2),
		p("green", [
			[3, 2],
			[3, 3],
			[3, 4]
		], 2),
		p("honey", [[0, 3], [1, 3]], 3),
		p("sage", [[3, 1], [4, 1]], 3)
	]),
	L(5, 6, 60, [
		p("green", [
			[1, 1],
			[1, 2],
			[1, 3],
			[1, 4]
		], 1),
		p("sage", [
			[3, 1],
			[3, 2],
			[3, 3],
			[3, 4]
		], 1),
		p("oak", [[0, 2], [4, 2]], 3),
		p("honey", [[0, 4], [4, 4]], 2),
		p("cedar", [[0, 1], [0, 2]], 2)
	]),
	L(5, 5, 60, [
		p("oak", [
			[0, 2],
			[1, 2],
			[2, 2],
			[3, 2],
			[4, 2]
		], 1),
		p("green", [
			[2, 0],
			[2, 1],
			[2, 2],
			[2, 3],
			[2, 4]
		], 2),
		p("honey", [
			[0, 0],
			[1, 1],
			[2, 2]
		], 3),
		p("cedar", [
			[4, 0],
			[3, 1],
			[2, 2]
		], 3)
	]),
	L(5, 6, 55, [
		p("sage", [
			[0, 2],
			[0, 3],
			[0, 4]
		], 1),
		p("green", [
			[4, 2],
			[4, 3],
			[4, 4]
		], 1),
		p("honey", [
			[1, 4],
			[2, 4],
			[3, 4]
		], 2),
		p("cedar", [
			[1, 1],
			[2, 1],
			[3, 1]
		], 2),
		p("oak", [
			[1, 2],
			[2, 2],
			[3, 2]
		], 3),
		p("oak", [
			[1, 3],
			[2, 3],
			[3, 3]
		], 3),
		p("green", [
			[2, 1],
			[2, 2],
			[2, 3],
			[2, 4]
		], 4)
	]),
	L(5, 6, 55, [
		p("oak", [
			[0, 4],
			[1, 3],
			[2, 2],
			[3, 1]
		], 3),
		p("green", [
			[1, 1],
			[1, 2],
			[1, 3],
			[1, 4]
		], 1),
		p("sage", [
			[3, 1],
			[3, 2],
			[3, 3],
			[3, 4]
		], 1),
		p("honey", [
			[0, 1],
			[1, 1],
			[2, 1]
		], 2),
		p("cedar", [
			[2, 4],
			[3, 4],
			[4, 4]
		], 2)
	]),
	L(5, 6, 55, [
		p("oak", [[0, 1], [1, 1]], 2),
		p("oak", [[3, 1], [4, 1]], 2),
		p("green", [[0, 3], [1, 3]], 2),
		p("green", [[3, 3], [4, 3]], 2),
		p("honey", [
			[2, 0],
			[2, 1],
			[2, 2]
		], 3),
		p("cedar", [
			[2, 3],
			[2, 4],
			[2, 5]
		], 3),
		p("sage", [
			[0, 2],
			[1, 2],
			[2, 2],
			[3, 2],
			[4, 2]
		], 1)
	]),
	L(5, 6, 50, [
		p("oak", [
			[0, 1],
			[1, 1],
			[2, 1],
			[3, 1],
			[4, 1]
		], 2),
		p("oak", [
			[0, 4],
			[1, 4],
			[2, 4],
			[3, 4],
			[4, 4]
		], 2),
		p("green", [
			[0, 1],
			[0, 2],
			[0, 3],
			[0, 4]
		], 1),
		p("green", [
			[4, 1],
			[4, 2],
			[4, 3],
			[4, 4]
		], 1),
		p("honey", [
			[1, 2],
			[2, 2],
			[3, 2]
		], 3),
		p("cedar", [
			[1, 3],
			[2, 3],
			[3, 3]
		], 3),
		p("sage", [[2, 2], [2, 3]], 4)
	]),
	L(5, 6, 50, [
		p("green", [
			[0, 2],
			[0, 3],
			[0, 4]
		], 1),
		p("green", [
			[4, 1],
			[4, 2],
			[4, 3]
		], 1),
		p("oak", [
			[1, 4],
			[2, 4],
			[3, 4]
		], 2),
		p("oak", [
			[1, 1],
			[2, 1],
			[3, 1]
		], 2),
		p("honey", [
			[0, 4],
			[1, 3],
			[2, 2],
			[3, 1]
		], 4),
		p("cedar", [[4, 0], [3, 1]], 3),
		p("sage", [[0, 1], [1, 1]], 3),
		p("oak", [
			[2, 2],
			[2, 3],
			[2, 4]
		], 3)
	])
];
var LEVEL_COUNT = LEVELS.length;
var KEY = "nut-workshop-save-v1";
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function freshSave() {
	return {
		...DEFAULT_SAVE,
		boosters: { ...DEFAULT_SAVE.boosters },
		stars: {},
		bestTime: {},
		ownedSkins: [...DEFAULT_SAVE.ownedSkins],
		dailyDate: today()
	};
}
function loadSave() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return freshSave();
		const parsed = JSON.parse(raw);
		const merged = {
			...DEFAULT_SAVE,
			...parsed,
			boosters: {
				...DEFAULT_SAVE.boosters,
				...parsed.boosters
			},
			stars: parsed.stars ?? {},
			bestTime: parsed.bestTime ?? {},
			ownedSkins: parsed.ownedSkins ?? DEFAULT_SAVE.ownedSkins,
			version: 1
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
function persist(s) {
	try {
		localStorage.setItem(KEY, JSON.stringify(s));
	} catch {}
}
var useGameStore = create((set, get) => {
	const init = freshSave();
	const write = (patch) => {
		set(patch);
		const s = get();
		persist({
			version: 1,
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
			wins: s.wins
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
				playingLevel: Math.min(loaded.maxUnlocked, LEVEL_COUNT)
			});
		},
		setScreen: (screen) => set({ screen }),
		playLevel: (n) => set({
			playingLevel: n,
			screen: "play"
		}),
		completeLevel: (level, stars, timeLeft, timeLimit) => {
			const s = get();
			const key = String(level);
			const prev = s.stars[key] ?? 0;
			const used = Math.max(0, timeLimit - timeLeft);
			const prevTime = s.bestTime[key];
			const nextUnlocked = Math.max(s.maxUnlocked, Math.min(LEVEL_COUNT, level + 1));
			const coinGain = 12 + stars * 8 + Math.floor(timeLeft / 8);
			const dailyDone = s.dailyDate === today() ? Math.min(2, s.dailyDone + 1) : 1;
			write({
				maxUnlocked: nextUnlocked,
				coins: s.coins + coinGain,
				stars: {
					...s.stars,
					[key]: Math.max(prev, stars)
				},
				bestTime: {
					...s.bestTime,
					[key]: prevTime == null ? used : Math.min(prevTime, used)
				},
				dailyDate: today(),
				dailyDone,
				wins: s.wins + 1
			});
		},
		spendBooster: (k) => {
			const n = get().boosters[k];
			if (n <= 0) return false;
			write({ boosters: {
				...get().boosters,
				[k]: n - 1
			} });
			return true;
		},
		addBooster: (k, n) => {
			write({ boosters: {
				...get().boosters,
				[k]: get().boosters[k] + n
			} });
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
			write({
				coins: s.coins - cost,
				ownedSkins: [...s.ownedSkins, id]
			});
			return true;
		},
		claimDaily: () => {
			const s = get();
			if (s.dailyClaimed || s.dailyDone < 2) return;
			write({
				dailyClaimed: true,
				coins: s.coins + 60,
				nuts: s.nuts + 2
			});
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
				dailyOpen: false
			});
		},
		setToast: (toast) => set({ toast }),
		setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
		setDailyOpen: (dailyOpen) => set({ dailyOpen })
	};
});
var ctx = null;
var master = null;
var sfxBus = null;
var musicBus = null;
var unlocked = false;
var musicTimer = null;
var musicOn = true;
var sfxOn = true;
function ac() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const C = window.AudioContext || window.webkitAudioContext;
		if (!C) return null;
		ctx = new C({ latencyHint: "interactive" });
		master = ctx.createGain();
		sfxBus = ctx.createGain();
		musicBus = ctx.createGain();
		sfxBus.gain.value = .7;
		musicBus.gain.value = .18;
		sfxBus.connect(master);
		musicBus.connect(master);
		master.connect(ctx.destination);
	}
	return ctx;
}
function unlockAudio() {
	const c = ac();
	if (!c) return;
	if (c.state === "suspended") c.resume();
	unlocked = true;
	if (musicOn) startMusic();
}
function setSfxEnabled(v) {
	sfxOn = v;
	if (sfxBus) sfxBus.gain.setTargetAtTime(v ? .7 : 0, ac()?.currentTime ?? 0, .03);
}
function setMusicEnabled(v) {
	musicOn = v;
	if (!v) stopMusic();
	else if (unlocked) startMusic();
}
function beep(freq, dur, type, gain, at = 0, slide) {
	if (!sfxOn || !unlocked) return;
	const c = ac();
	if (!c || !sfxBus) return;
	const t0 = c.currentTime + at;
	const osc = c.createOscillator();
	const g = c.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, t0);
	if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slide), t0 + dur);
	g.gain.setValueAtTime(1e-4, t0);
	g.gain.exponentialRampToValueAtTime(gain, t0 + .012);
	g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
	osc.connect(g);
	g.connect(sfxBus);
	osc.start(t0);
	osc.stop(t0 + dur + .02);
}
function noise(dur, gain, at = 0) {
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
function sfxUnscrew() {
	const p = .92 + Math.random() * .16;
	beep(180 * p, .08, "square", .09);
	beep(420 * p, .14, "triangle", .07, .02, 220);
	noise(.08, .08);
}
function sfxWood() {
	noise(.12, .12);
	beep(140 + Math.random() * 30, .1, "sine", .06, 0, 80);
}
function sfxTap() {
	beep(620, .05, "sine", .05);
}
function sfxWin() {
	beep(523, .16, "triangle", .09);
	beep(659, .16, "triangle", .09, .1);
	beep(784, .22, "triangle", .1, .2);
	beep(1046, .35, "sine", .08, .32);
}
function sfxLose() {
	beep(320, .2, "sine", .08, 0, 180);
	beep(180, .35, "triangle", .07, .12, 90);
}
function sfxWhoosh() {
	noise(.18, .1);
	beep(380, .18, "sine", .04, 0, 120);
}
function sfxUi() {
	beep(880, .04, "sine", .04);
}
function startMusic() {
	stopMusic();
	if (!musicOn || !unlocked) return;
	if (!ac() || !musicBus) return;
	const notes = [
		196,
		247,
		294,
		330,
		392,
		330,
		294,
		247
	];
	let i = 0;
	const tick = () => {
		if (!musicOn || !ctx || !musicBus) return;
		const t0 = ctx.currentTime;
		const osc = ctx.createOscillator();
		const g = ctx.createGain();
		osc.type = "sine";
		osc.frequency.value = notes[i % notes.length];
		g.gain.setValueAtTime(1e-4, t0);
		g.gain.exponentialRampToValueAtTime(.045, t0 + .04);
		g.gain.exponentialRampToValueAtTime(1e-4, t0 + .7);
		osc.connect(g);
		g.connect(musicBus);
		osc.start(t0);
		osc.stop(t0 + .75);
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
if (typeof window !== "undefined") document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		if (ctx?.state === "running") ctx.suspend();
	} else if (unlocked) ctx?.resume();
});
var dict = {
	ja: {
		title: "ナット工房",
		subtitle: "Nut Workshop",
		play: "遊ぶ",
		home: "ホーム",
		shop: "ショップ",
		closet: "きせかえ",
		rank: "ランキング",
		levels: "レベル選択",
		settings: "設定",
		pause: "一時停止",
		resume: "再開する",
		retry: "やり直す",
		toHome: "ホームへ",
		next: "次のレベル",
		clear: "クリア！",
		fail: "時間切れ",
		failHint: "もう一度チャレンジしよう",
		coins: "コイン",
		nuts: "ナット",
		undo: "もどす",
		hammer: "ネジ外し",
		mallet: "板はずし",
		sfx: "効果音",
		music: "音楽",
		shake: "画面の揺れ",
		lang: "言語",
		reset: "データ初期化",
		resetConfirm: "進行状況を消しますか？",
		cancel: "キャンセル",
		buy: "購入",
		owned: "所持中",
		equip: "使う",
		equipped: "使用中",
		notEnough: "コインが足りません",
		daily: "にじいろ宝箱",
		dailyDesc: "今日レベルを2つクリア",
		claim: "受け取る",
		claimed: "受け取り済み",
		rankingTitle: "ベストタイム",
		noTimes: "まだ記録がありません",
		locked: "ロック中",
		tutorial1: "ネジをタップして持ち上げよう",
		tutorial2: "空いている穴をタップして置こう",
		tutorial3: "ネジが1本だけだと、それを支点にぶら下がります",
		hammerHint: "消したいネジをタップ（空き穴なしで外せる）",
		malletHint: "はずしたい板をタップ",
		placeHint: "空いている穴に置く",
		boardOak: "オーク",
		boardWalnut: "ウォールナット",
		boardBirch: "バーチ",
		screwSteel: "スチール",
		screwBrass: "ブラス",
		screwObsidian: "オブシディアン",
		shopUndo: "Undo ×3",
		shopHammer: "ハンマー ×1",
		shopMallet: "木槌 ×1",
		reward: "報酬",
		stars: "スター",
		level: "レベル",
		finished: "コンプリート",
		boards: "ボード",
		screws: "ネジ",
		on: "オン",
		off: "オフ"
	},
	en: {
		title: "Nut Workshop",
		subtitle: "ナット工房",
		play: "Play",
		home: "Home",
		shop: "Shop",
		closet: "Closet",
		rank: "Ranking",
		levels: "Levels",
		settings: "Settings",
		pause: "Paused",
		resume: "Resume",
		retry: "Retry",
		toHome: "Home",
		next: "Next Level",
		clear: "Cleared!",
		fail: "Time's up",
		failHint: "Give it another try",
		coins: "Coins",
		nuts: "Nuts",
		undo: "Undo",
		hammer: "Unscrew",
		mallet: "Remove plank",
		sfx: "Sound FX",
		music: "Music",
		shake: "Screen shake",
		lang: "Language",
		reset: "Reset progress",
		resetConfirm: "Erase all progress?",
		cancel: "Cancel",
		buy: "Buy",
		owned: "Owned",
		equip: "Equip",
		equipped: "Equipped",
		notEnough: "Not enough coins",
		daily: "Rainbow Treasure",
		dailyDesc: "Clear 2 levels today",
		claim: "Claim",
		claimed: "Claimed",
		rankingTitle: "Best times",
		noTimes: "No records yet",
		locked: "Locked",
		tutorial1: "Tap a screw to pick it up",
		tutorial2: "Tap an empty hole to place it",
		tutorial3: "With one screw left, the plank swings from it",
		hammerHint: "Tap a screw to destroy it",
		malletHint: "Tap a plank to remove it",
		placeHint: "Place it in an empty hole",
		boardOak: "Oak",
		boardWalnut: "Walnut",
		boardBirch: "Birch",
		screwSteel: "Steel",
		screwBrass: "Brass",
		screwObsidian: "Obsidian",
		shopUndo: "Undo ×3",
		shopHammer: "Hammer ×1",
		shopMallet: "Mallet ×1",
		reward: "Reward",
		stars: "Stars",
		level: "Level",
		finished: "All clear",
		boards: "Boards",
		screws: "Screws",
		on: "On",
		off: "Off"
	}
};
function t(lang, key) {
	return dict[lang][key];
}
function WoodButton({ children, onClick, variant = "cream", className = "", disabled, type = "button" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		disabled,
		onClick,
		className: `wood-btn wood-btn-${variant} rounded-[18px] px-5 py-3 text-lg ${className}`,
		children
	});
}
function HudChip({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `hud-chip inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-extrabold ${className}`,
		children
	});
}
function CoinIcon({ size = 16 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "10",
			fill: "#E8C35A",
			stroke: "#B07A20",
			strokeWidth: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "6.5",
			fill: "none",
			stroke: "#F8E7A0",
			strokeWidth: "1.4"
		})]
	});
}
function NutIcon({ size = 16 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "9",
			fill: "#C9A66B",
			stroke: "#6A4A24",
			strokeWidth: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "4",
			fill: "#8E6B38"
		})]
	});
}
function ModalShell({ children, onClose, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-40 flex items-center justify-center bg-[rgba(16,18,26,0.55)] px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel-wood modal-in relative w-full max-w-[340px] rounded-[28px] p-5 text-[var(--color-ink)]",
			children: [
				onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-[rgba(90,50,20,0.12)]",
					"aria-label": "close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				}),
				title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-center text-xl font-extrabold",
					children: title
				}),
				children
			]
		})
	});
}
function SettingsModal() {
	const lang = useGameStore((s) => s.lang);
	const sfx = useGameStore((s) => s.sfx);
	const music = useGameStore((s) => s.music);
	const shake = useGameStore((s) => s.shake);
	const toggle = useGameStore((s) => s.toggle);
	const setLang = useGameStore((s) => s.setLang);
	const reset = useGameStore((s) => s.reset);
	const setSettingsOpen = useGameStore((s) => s.setSettingsOpen);
	const tt = (k) => t(lang, k);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		title: tt("settings"),
		onClose: () => setSettingsOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					label: tt("sfx"),
					onClick: () => toggle("sfx"),
					children: [sfx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sfx ? tt("on") : tt("off") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					label: tt("music"),
					onClick: () => toggle("music"),
					children: [music ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: music ? tt("on") : tt("off") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: tt("shake"),
					onClick: () => toggle("shake"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shake ? tt("on") : tt("off") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					label: tt("lang"),
					onClick: () => setLang(lang === "ja" ? "en" : "ja"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang === "ja" ? "日本語" : "English" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-2 rounded-2xl bg-[rgba(90,40,30,0.12)] px-3 py-2 text-sm font-bold",
					onClick: () => {
						if (confirm(tt("resetConfirm"))) reset();
					},
					children: tt("reset")
				})
			]
		})
	});
}
function Row({ label, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-center justify-between rounded-2xl bg-[rgba(255,255,240,0.28)] px-3 py-2.5 font-bold",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex items-center gap-1",
			children
		})]
	});
}
function Mascot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "40",
		height: "40",
		viewBox: "0 0 64 64",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "10",
				y: "14",
				width: "44",
				height: "40",
				rx: "10",
				fill: "#C9A66B",
				stroke: "#6A4A24",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "18",
				y: "8",
				width: "28",
				height: "12",
				rx: "4",
				fill: "#B88948",
				stroke: "#6A4A24",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "32",
				r: "4",
				fill: "#3A2A1C"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "32",
				r: "4",
				fill: "#3A2A1C"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M26 42c3 4 9 4 12 0",
				fill: "none",
				stroke: "#3A2A1C",
				strokeWidth: "2.4",
				strokeLinecap: "round"
			})
		]
	});
}
function HomeScreen() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "workshop-bg flex h-full flex-col text-[var(--color-cream)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-3 pt-[max(12px,env(safe-area-inset-top))] pb-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-11 place-items-center rounded-2xl bg-[rgba(201,166,107,0.25)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mascot, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HudChip, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NutIcon, {}),
							" ",
							nuts
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HudChip, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {}),
							" ",
							coins
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-2xl bg-[rgba(244,230,196,0.14)]",
						onClick: () => {
							sfxUi();
							setSettingsOpen(true);
						},
						"aria-label": t(lang, "settings"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-6" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setDailyOpen(true),
				className: "mx-4 mb-2 flex items-center gap-2 rounded-full bg-[rgba(244,230,196,0.12)] px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-4 text-[var(--color-coin)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold tracking-wide",
						children: t(lang, "daily")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-2 flex-1 overflow-hidden rounded-full bg-[rgba(0,0,0,0.28)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-[linear-gradient(90deg,#7DA15C,#E8C35A,#C47A5A)]",
							style: { width: `${dailyDone / 2 * 100}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-extrabold",
						children: [dailyDone, "/2"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-0 flex-1 flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						sfxUi();
						setScreen("rank");
					},
					className: "absolute top-2 right-4 grid size-14 place-items-center rounded-full bg-[rgba(244,230,196,0.12)]",
					"aria-label": t(lang, "rank"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-6 text-[var(--color-coin)]" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setScreen("levels"),
							className: "relative",
							"aria-label": t(lang, "levels"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "crate mx-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "crate-face",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-5xl leading-none font-extrabold text-[var(--color-ink)]",
										children: next
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 text-sm font-extrabold tracking-wide text-[var(--color-walnut)]",
										children: t(lang, "level")
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "platform -mt-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-1 text-sm font-bold text-[var(--color-cream-dark)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-[var(--color-coin)] text-[var(--color-coin)]" }),
								done,
								"/",
								LEVEL_COUNT
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-8 pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
					variant: "cream",
					className: "w-full py-4 text-2xl tracking-wide",
					onClick: () => {
						unlockAudio();
						sfxUi();
						playLevel(next);
					},
					children: maxUnlocked > LEVEL_COUNT ? t(lang, "finished") : t(lang, "play")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-1 grid grid-cols-3 gap-1 border-t border-[rgba(244,230,196,0.12)] bg-[rgba(20,24,32,0.45)] px-2 pt-2 pb-[max(10px,env(safe-area-inset-bottom))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-6" }),
						label: t(lang, "shop"),
						onClick: () => setScreen("shop")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-6" }),
						label: t(lang, "home"),
						active: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, { className: "size-6" }),
						label: t(lang, "closet"),
						onClick: () => setScreen("closet")
					})
				]
			}),
			dailyClaimed ? null : null
		]
	});
}
function NavBtn({ icon, label, onClick, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "nav-tab py-1",
		"data-active": active ? "true" : "false",
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-11 place-items-center rounded-2xl bg-[rgba(244,230,196,0.08)]",
			children: icon
		}), label]
	});
}
var GRAVITY = 1280;
var MAX_FALL = 1100;
function extent(p) {
	const c = Math.cos(p.angle);
	const s = Math.sin(p.angle);
	return {
		x: Math.abs(c) * (p.length / 2) + Math.abs(s) * (p.thick / 2),
		y: Math.abs(s) * (p.length / 2) + Math.abs(c) * (p.thick / 2)
	};
}
var World = class {
	level;
	levelNum;
	cols;
	rows;
	cell = 64;
	originX = 0;
	originY = 0;
	boardX = 0;
	boardY = 0;
	boardW = 0;
	boardH = 0;
	cssW = 0;
	cssH = 0;
	screws = /* @__PURE__ */ new Map();
	planks = [];
	particles = [];
	drag = null;
	held = null;
	placing = null;
	tool = "none";
	timeLeft;
	timeLimit;
	paused = false;
	won = false;
	lost = false;
	justWon = false;
	justLost = false;
	trauma = 0;
	checkT = 0;
	tutorialStep;
	reducedMotion = false;
	shakeOn = true;
	history = [];
	hint = "";
	pulse = 0;
	prevWin = false;
	prevLose = false;
	constructor(level, levelNum, opts) {
		this.level = level;
		this.levelNum = levelNum;
		this.cols = level.cols;
		this.rows = level.rows;
		this.timeLimit = level.time;
		this.timeLeft = level.time;
		this.tutorialStep = levelNum <= 2 ? 1 : 0;
		this.reducedMotion = !!opts?.reducedMotion;
		this.shakeOn = opts?.shake !== false;
		this.rebuild(360, 480);
	}
	rebuild(cssW, cssH) {
		const oldCell = this.cell;
		const oldOX = this.originX;
		const oldOY = this.originY;
		this.cssW = cssW;
		this.cssH = cssH;
		const pad = 18;
		this.boardX = pad;
		this.boardY = pad;
		this.boardW = cssW - 36;
		this.boardH = cssH - 36;
		const cell = Math.min(this.boardW / (this.cols + .35), this.boardH / (this.rows + .35));
		this.cell = cell;
		const gridW = cell * this.cols;
		const gridH = cell * this.rows;
		this.originX = this.boardX + (this.boardW - gridW) / 2;
		this.originY = this.boardY + (this.boardH - gridH) / 2;
		if (this.planks.length === 0) {
			this.initPieces();
			return;
		}
		this.relayoutScrews();
		const sx = oldCell > 0 ? this.cell / oldCell : 1;
		for (const p of this.planks) {
			if (p.removed) continue;
			this.refreshPlankMetrics(p);
			if (p.anchors.length >= 2 && p.fly === 0) this.snapToAnchors(p);
			else if (p.anchors.length === 1 && p.fly === 0 && this.drag?.kind !== "pivot") this.attachToPivot(p);
			else {
				p.x = this.originX + (p.x - oldOX) * sx;
				p.y = this.originY + (p.y - oldOY) * sx;
				p.vx *= sx;
				p.vy *= sx;
			}
		}
	}
	refreshPlankMetrics(p) {
		const pts = p.holes.map((h) => {
			const w = this.holePos(h.c, h.r);
			return {
				c: h.c,
				r: h.r,
				x: w.x,
				y: w.y
			};
		});
		const hx = pts.reduce((s, q) => s + q.x, 0) / pts.length;
		const hy = pts.reduce((s, q) => s + q.y, 0) / pts.length;
		const a = Math.atan2(pts[pts.length - 1].y - pts[0].y, pts[pts.length - 1].x - pts[0].x);
		const dist = Math.hypot(pts[pts.length - 1].x - pts[0].x, pts[pts.length - 1].y - pts[0].y);
		p.thick = this.cell * .62;
		p.length = dist + p.thick;
		p.holes = pts.map((q) => {
			const dx = q.x - hx;
			const dy = q.y - hy;
			const ca = Math.cos(-a);
			const sa = Math.sin(-a);
			return {
				c: q.c,
				r: q.r,
				lx: dx * ca - dy * sa,
				ly: dx * sa + dy * ca
			};
		});
	}
	snapPlankHome(p) {
		const pts = p.holes.map((h) => this.holePos(h.c, h.r));
		p.x = pts.reduce((s, q) => s + q.x, 0) / pts.length;
		p.y = pts.reduce((s, q) => s + q.y, 0) / pts.length;
		p.angle = Math.atan2(pts[pts.length - 1].y - pts[0].y, pts[pts.length - 1].x - pts[0].x);
	}
	holePos(c, r) {
		return {
			x: this.originX + (c + .5) * this.cell,
			y: this.originY + (r + .5) * this.cell
		};
	}
	initPieces() {
		this.screws.clear();
		this.planks = [];
		const open = new Set((this.level.open ?? []).map(([c, r]) => `${c},${r}`));
		const occupied = /* @__PURE__ */ new Set();
		this.level.planks.forEach((def, i) => {
			const pts = def.holes.map(([c, r]) => {
				const p = this.holePos(c, r);
				return {
					c,
					r,
					x: p.x,
					y: p.y
				};
			});
			const x = pts.reduce((s, p) => s + p.x, 0) / pts.length;
			const y = pts.reduce((s, p) => s + p.y, 0) / pts.length;
			const a = Math.atan2(pts[pts.length - 1].y - pts[0].y, pts[pts.length - 1].x - pts[0].x);
			const dist = Math.hypot(pts[pts.length - 1].x - pts[0].x, pts[pts.length - 1].y - pts[0].y);
			const thick = this.cell * .62;
			const holes = pts.map((p) => {
				const dx = p.x - x;
				const dy = p.y - y;
				const ca = Math.cos(-a);
				const sa = Math.sin(-a);
				return {
					c: p.c,
					r: p.r,
					lx: dx * ca - dy * sa,
					ly: dx * sa + dy * ca
				};
			});
			const anchors = [];
			for (const h of def.holes) {
				const key = `${h[0]},${h[1]}`;
				occupied.add(key);
				if (!open.has(key)) anchors.push(key);
			}
			this.planks.push({
				id: i,
				color: def.color,
				z: def.z,
				holes,
				anchors,
				x,
				y,
				angle: a,
				length: dist + thick,
				thick,
				removed: false,
				fly: 0,
				flyVx: 0,
				flyVy: 0,
				wiggle: 0,
				seed: (i + 1) * 9973,
				vx: 0,
				vy: 0,
				av: 0
			});
		});
		for (const key of occupied) {
			if (open.has(key)) continue;
			const [c, r] = key.split(",").map(Number);
			const p = this.holePos(c, r);
			this.screws.set(key, {
				c,
				r,
				key,
				x: p.x,
				y: p.y,
				alive: true,
				anim: 0,
				dying: false
			});
		}
	}
	relayoutScrews() {
		for (const s of this.screws.values()) {
			const p = this.holePos(s.c, s.r);
			s.x = p.x;
			s.y = p.y;
		}
	}
	snap() {
		return {
			screws: [...this.screws.values()].filter((s) => s.alive && !s.dying).map((s) => ({
				key: s.key,
				c: s.c,
				r: s.r,
				alive: true
			})),
			planks: this.planks.map((p) => ({
				id: p.id,
				anchors: [...p.anchors],
				x: p.x,
				y: p.y,
				angle: p.angle,
				removed: p.removed
			}))
		};
	}
	undo() {
		const last = this.history.pop();
		if (!last || this.won || this.lost) return false;
		this.held = null;
		this.placing = null;
		this.hint = "";
		this.screws.clear();
		for (const s of last.screws) {
			const p = this.holePos(s.c, s.r);
			this.screws.set(s.key, {
				key: s.key,
				c: s.c,
				r: s.r,
				x: p.x,
				y: p.y,
				alive: true,
				anim: 0,
				dying: false
			});
		}
		for (const sp of last.planks) {
			const p = this.planks.find((x) => x.id === sp.id);
			if (!p) continue;
			p.anchors = [...sp.anchors];
			p.x = sp.x;
			p.y = sp.y;
			p.angle = sp.angle;
			p.removed = sp.removed;
			p.fly = 0;
			p.vx = 0;
			p.vy = 0;
			p.av = 0;
		}
		this.drag = null;
		return true;
	}
	setPaused(v) {
		this.paused = v;
	}
	setTool(t) {
		this.tool = t;
		this.hint = t === "hammer" ? "hammer" : t === "mallet" ? "mallet" : "";
	}
	holeKeys() {
		const out = [];
		for (let r = 0; r < this.rows; r++) for (let c = 0; c < this.cols; c++) out.push({
			c,
			r
		});
		return out;
	}
	worldHole(plank, h) {
		const ca = Math.cos(plank.angle);
		const sa = Math.sin(plank.angle);
		return {
			x: plank.x + h.lx * ca - h.ly * sa,
			y: plank.y + h.lx * sa + h.ly * ca
		};
	}
	plankContains(plank, x, y, inflate = 0) {
		const dx = x - plank.x;
		const dy = y - plank.y;
		const ca = Math.cos(-plank.angle);
		const sa = Math.sin(-plank.angle);
		const lx = dx * ca - dy * sa;
		const ly = dx * sa + dy * ca;
		const hw = plank.length / 2 + inflate;
		const hh = plank.thick / 2 + inflate;
		const r = hh;
		if (Math.abs(ly) > hh) return false;
		if (Math.abs(lx) <= hw - r) return true;
		const ex = Math.abs(lx) - (hw - r);
		return ex * ex + ly * ly <= (r + inflate) * (r + inflate);
	}
	nearHole(plank, x, y) {
		const rad = this.cell * .26;
		for (const h of plank.holes) {
			const w = this.worldHole(plank, h);
			if (Math.hypot(w.x - x, w.y - y) < rad) return true;
		}
		return false;
	}
	woodBlocksPoint(x, y) {
		let holeZ = -1;
		let woodZ = -1;
		for (const p of this.planks) {
			if (p.removed || p.fly > 0) continue;
			if (!this.plankContains(p, x, y, 1)) continue;
			if (this.nearHole(p, x, y)) holeZ = Math.max(holeZ, p.z);
			else woodZ = Math.max(woodZ, p.z);
		}
		return woodZ >= 0 && woodZ >= holeZ;
	}
	isCovered(screw) {
		if (!screw.alive || screw.dying) return false;
		return this.woodBlocksPoint(screw.x, screw.y);
	}
	isHoleCovered(c, r) {
		const pos = this.holePos(c, r);
		return this.woodBlocksPoint(pos.x, pos.y);
	}
	isDropTarget(c, r) {
		if (c < 0 || r < 0 || c >= this.cols || r >= this.rows) return false;
		const key = `${c},${r}`;
		if (this.held && this.held.key === key) return false;
		const occ = this.screws.get(key);
		if (occ && occ.alive && !occ.dying) return false;
		if (this.isHoleCovered(c, r)) return false;
		return true;
	}
	dropTargets() {
		const out = [];
		for (const h of this.holeKeys()) {
			if (!this.isDropTarget(h.c, h.r)) continue;
			const p = this.holePos(h.c, h.r);
			out.push({
				c: h.c,
				r: h.r,
				x: p.x,
				y: p.y
			});
		}
		return out;
	}
	emit(x, y, n, burst = false) {
		const kinds = [
			"star",
			"heart",
			"moon",
			"spark"
		];
		const colors = [
			"#F4E6C4",
			"#E8C35A",
			"#FFFFFF",
			"#C9A66B",
			"#7DA15C"
		];
		for (let i = 0; i < n; i++) {
			const a = burst ? Math.PI * 2 * i / n + Math.random() * .4 : Math.random() * Math.PI * 2;
			const sp = burst ? 80 + Math.random() * 140 : 40 + Math.random() * 90;
			this.particles.push({
				x,
				y,
				vx: Math.cos(a) * sp,
				vy: Math.sin(a) * sp - (burst ? 40 : 20),
				life: 0,
				max: .55 + Math.random() * .45,
				kind: kinds[i % kinds.length],
				rot: Math.random() * Math.PI,
				vr: (Math.random() - .5) * 8,
				size: 5 + Math.random() * 7,
				color: colors[i % colors.length]
			});
		}
		if (this.particles.length > 120) this.particles.splice(0, this.particles.length - 120);
	}
	pickScrew(s, ignoreCover = false) {
		if (!s.alive || s.dying || this.placing) return false;
		if (this.held === s) {
			this.cancelHeld();
			return false;
		}
		if (!ignoreCover && this.isCovered(s)) {
			this.trauma = Math.min(1, this.trauma + .18);
			return false;
		}
		if (this.held) this.cancelHeld();
		this.history.push(this.snap());
		if (this.history.length > 24) this.history.shift();
		this.held = s;
		s.anim = Math.max(s.anim, .001);
		this.hint = "place";
		sfxUnscrew();
		this.emit(s.x, s.y, 8);
		this.trauma = Math.min(1, this.trauma + .2);
		if (this.tutorialStep === 1) this.tutorialStep = 2;
		return true;
	}
	cancelHeld() {
		if (!this.held || this.placing) return;
		this.held.anim = 0;
		this.held = null;
		this.hint = "";
		this.history.pop();
	}
	placeHeld(c, r) {
		const s = this.held;
		if (!s || this.placing) return false;
		if (!this.isDropTarget(c, r)) {
			this.trauma = Math.min(1, this.trauma + .16);
			return false;
		}
		this.placing = {
			s,
			fromX: s.x,
			fromY: s.y,
			toC: c,
			toR: r,
			t: 0
		};
		this.held = null;
		this.hint = "";
		sfxWood();
		return true;
	}
	commitPlace(move) {
		const s = move.s;
		const dest = this.holePos(move.toC, move.toR);
		this.screws.delete(s.key);
		s.c = move.toC;
		s.r = move.toR;
		s.key = `${move.toC},${move.toR}`;
		s.x = dest.x;
		s.y = dest.y;
		s.anim = 0;
		s.dying = false;
		s.alive = true;
		this.screws.set(s.key, s);
		this.placing = null;
		this.emit(s.x, s.y, 10);
		this.syncAnchors();
		if (this.tutorialStep === 2) this.tutorialStep = 3;
	}
	destroyScrew(s) {
		if (!s.alive || s.dying) return false;
		if (this.held === s) this.held = null;
		this.hint = "";
		this.history.push(this.snap());
		if (this.history.length > 24) this.history.shift();
		s.dying = true;
		s.anim = .001;
		sfxUnscrew();
		this.emit(s.x, s.y, 12);
		this.trauma = Math.min(1, this.trauma + .28);
		this.syncAnchors();
		return true;
	}
	finishDestroy(s) {
		s.alive = false;
		s.anim = 0;
		s.dying = false;
		this.syncAnchors();
	}
	liveScrews() {
		const out = [];
		for (const s of this.screws.values()) if (s.alive && !s.dying) out.push(s);
		return out;
	}
	closestHole(p, s, rad) {
		let best = null;
		let bestD = rad;
		for (const h of p.holes) {
			const w = this.worldHole(p, h);
			const d = Math.hypot(w.x - s.x, w.y - s.y);
			if (d <= bestD) {
				best = h;
				bestD = d;
			}
		}
		return best;
	}
	anchorHole(p, key) {
		const s = this.screws.get(key);
		if (s) {
			const h = this.closestHole(p, s, this.cell);
			if (h) return h;
		}
		return p.holes.find((hh) => `${hh.c},${hh.r}` === key) ?? p.holes[0];
	}
	collectAnchors(p) {
		const out = [];
		const used = /* @__PURE__ */ new Set();
		const keepR = this.cell * .5;
		const catchR = this.cell * .32;
		for (const h of p.holes) {
			const w = this.worldHole(p, h);
			let best = null;
			let bestD = keepR;
			for (const s of this.liveScrews()) {
				if (used.has(s.key)) continue;
				const d = Math.hypot(w.x - s.x, w.y - s.y);
				if (d > keepR) continue;
				if (!p.anchors.includes(s.key) && d > catchR) continue;
				if (d < bestD) {
					best = s;
					bestD = d;
				}
			}
			if (best) {
				used.add(best.key);
				out.push(best.key);
			}
		}
		return out;
	}
	syncAnchors() {
		for (const p of this.planks) {
			if (p.removed || p.fly > 0) continue;
			this.updateAnchors(p, true);
		}
	}
	updateAnchors(p, allowRelease) {
		const was = p.anchors;
		const next = this.collectAnchors(p);
		if (was.length === next.length && was.every((k, i) => k === next[i])) return;
		if (was.length > 0 && next.length === 0) {
			if (!allowRelease) return;
			const s = this.screws.get(was[0]);
			const h = this.anchorHole(p, was[0]);
			const pivot = s ? {
				x: s.x,
				y: s.y
			} : this.worldHole(p, h);
			p.anchors = next;
			this.releasePlank(p, pivot);
			return;
		}
		p.anchors = next;
		if (next.length === 1) this.attachToPivot(p);
		else if (next.length >= 2) this.snapToAnchors(p);
		if (next.length > was.length) {
			sfxWood();
			this.emit(p.x, p.y, 8);
			this.trauma = Math.min(1, this.trauma + .16);
			p.vx = 0;
			p.vy = 0;
			if (next.length >= 2) p.av = 0;
		} else if (was.length >= 2 && next.length === 1) {
			p.wiggle = this.reducedMotion ? 0 : .28;
			if (!this.reducedMotion) p.av += (Math.random() - .45) * 1.6;
		}
	}
	snapToAnchors(p) {
		if (p.anchors.length === 1) {
			this.attachToPivot(p);
			return;
		}
		if (p.anchors.length < 2) return;
		const s0 = this.screws.get(p.anchors[0]);
		const s1 = this.screws.get(p.anchors[1]);
		if (!s0 || !s1) return;
		const h0 = this.anchorHole(p, s0.key);
		const h1 = this.anchorHole(p, s1.key);
		p.angle = Math.atan2(s1.y - s0.y, s1.x - s0.x) - Math.atan2(h1.ly - h0.ly, h1.lx - h0.lx);
		const ca = Math.cos(p.angle);
		const sa = Math.sin(p.angle);
		p.x = s0.x - (h0.lx * ca - h0.ly * sa);
		p.y = s0.y - (h0.lx * sa + h0.ly * ca);
		p.vx = 0;
		p.vy = 0;
		p.av = 0;
	}
	releasePlank(p, last) {
		p.wiggle = this.reducedMotion ? 0 : .4;
		if (last) {
			const dx = p.x - last.x;
			const dy = p.y - last.y;
			p.vx += -p.av * dy;
			p.vy += p.av * dx;
		}
		if (!this.reducedMotion) {
			p.vy -= 90;
			p.vx += (Math.random() - .5) * 40;
			p.av += (Math.random() - .5) * 1.8;
		}
		sfxWood();
	}
	attachToPivot(p) {
		const key = p.anchors[0];
		if (!key) return;
		const s = this.screws.get(key);
		if (!s || !s.alive) return;
		const h = this.anchorHole(p, key);
		const ca = Math.cos(p.angle);
		const sa = Math.sin(p.angle);
		p.x = s.x - (h.lx * ca - h.ly * sa);
		p.y = s.y - (h.lx * sa + h.ly * ca);
	}
	pivotLocked(p) {
		if (this.drag?.kind === "pivot" && this.drag.plank === p) return true;
		if (p.anchors.length !== 1) return false;
		const k = p.anchors[0];
		if (this.held?.key === k) return true;
		if (this.placing?.s.key === k) return true;
		return false;
	}
	plankHits(a, b) {
		const n = 8;
		const ca = Math.cos(a.angle);
		const sa = Math.sin(a.angle);
		const half = a.length * .5;
		const nx = -sa * (a.thick * .42);
		const ny = ca * (a.thick * .42);
		for (let i = 0; i <= n; i++) {
			const t = i / n * 2 - 1;
			const x = a.x + ca * half * t;
			const y = a.y + sa * half * t;
			if (this.plankContains(b, x + nx, y + ny, -2)) return true;
			if (this.plankContains(b, x - nx, y - ny, -2)) return true;
		}
		return false;
	}
	screwOnHoleOrbit(p, s) {
		if (p.anchors.length !== 1) return false;
		const pivot = this.screws.get(p.anchors[0]);
		if (!pivot || pivot === s) return false;
		const ph = this.anchorHole(p, pivot.key);
		const pr = Math.hypot(s.x - pivot.x, s.y - pivot.y);
		for (const h of p.holes) {
			if (h === ph) continue;
			const orbit = Math.hypot(h.lx - ph.lx, h.ly - ph.ly);
			if (Math.abs(pr - orbit) < this.cell * .3) return true;
		}
		return false;
	}
	plankHitsScrewBody(p, s) {
		if (!s.alive || s.dying) return false;
		if (p.anchors.includes(s.key)) return false;
		if (this.closestHole(p, s, this.cell * .4)) return false;
		if (this.screwOnHoleOrbit(p, s)) return false;
		return this.plankContains(p, s.x, s.y, this.cell * .2);
	}
	blockPendulum(p, prevAngle, blocked) {
		if (!blocked()) return;
		const cur = p.angle;
		p.angle = prevAngle;
		this.attachToPivot(p);
		if (blocked()) {
			p.angle = cur;
			this.attachToPivot(p);
			return;
		}
		let lo = prevAngle;
		let hi = cur;
		for (let k = 0; k < 8; k++) {
			const mid = (lo + hi) / 2;
			p.angle = mid;
			this.attachToPivot(p);
			if (blocked()) hi = mid;
			else lo = mid;
		}
		p.angle = lo;
		this.attachToPivot(p);
		p.av *= -.28;
		if (Math.abs(p.av) < 1.2) p.av = 0;
	}
	resolvePendulum(p, prevAngle) {
		for (const o of this.planks) {
			if (o === p || o.removed || o.fly > 0 || o.anchors.length === 0) continue;
			this.blockPendulum(p, prevAngle, () => this.plankHits(p, o));
		}
		for (const s of this.liveScrews()) this.blockPendulum(p, prevAngle, () => this.plankHitsScrewBody(p, s));
	}
	integratePendulum(p, dt) {
		if (this.pivotLocked(p)) {
			this.attachToPivot(p);
			return;
		}
		const key = p.anchors[0];
		const s = this.screws.get(key);
		if (!s || !s.alive) return;
		const h = this.anchorHole(p, key);
		if (this.reducedMotion) {
			let d = -Math.PI / 2 - Math.atan2(h.ly, h.lx) - p.angle;
			while (d > Math.PI) d -= Math.PI * 2;
			while (d < -Math.PI) d += Math.PI * 2;
			p.angle += d * Math.min(1, dt * 10);
			p.av = 0;
			this.attachToPivot(p);
			return;
		}
		const d2 = h.lx * h.lx + h.ly * h.ly;
		const I = Math.max(p.length * p.length / 12 + d2, 280);
		const prevAngle = p.angle;
		const rx = p.x - s.x;
		const tau = rx * GRAVITY;
		p.av += tau / I * dt;
		p.av *= Math.pow(.4, dt);
		if (p.av > 12) p.av = 12;
		if (p.av < -12) p.av = -12;
		if (Math.abs(p.av) < .4 && Math.abs(rx) < 3.2) p.av = 0;
		p.angle += p.av * dt;
		this.attachToPivot(p);
		this.resolvePendulum(p, prevAngle);
		this.updateAnchors(p, false);
	}
	integrateFree(p, dt) {
		if (this.drag?.kind === "move" && this.drag.plank === p) return;
		p.vy += GRAVITY * dt;
		p.vy = Math.min(p.vy, MAX_FALL);
		p.vx *= Math.pow(.42, dt);
		p.x += p.vx * dt;
		p.y += p.vy * dt;
		p.angle += p.av * dt;
		p.av *= Math.pow(.55, dt);
		if (p.av > 14) p.av = 14;
		if (p.av < -14) p.av = -14;
		this.updateAnchors(p, false);
		if (p.anchors.length > 0) return;
		this.separatePlankFromScrews(p);
	}
	separatePlankFromScrews(p) {
		const rad = this.cell * .2;
		const r = p.thick / 2;
		const cap = Math.max(0, p.length / 2 - r);
		const ca = Math.cos(p.angle);
		const sa = Math.sin(p.angle);
		const ica = Math.cos(-p.angle);
		const isa = Math.sin(-p.angle);
		for (const s of this.liveScrews()) {
			if (this.closestHole(p, s, this.cell * .36)) continue;
			const dx = s.x - p.x;
			const dy = s.y - p.y;
			const lx = dx * ica - dy * isa;
			const ly = dx * isa + dy * ica;
			const vx = lx - Math.max(-cap, Math.min(cap, lx));
			const vy = ly;
			const d = Math.hypot(vx, vy);
			const need = r + rad;
			if (d >= need) continue;
			let nx;
			let ny;
			if (d < 1e-4) {
				nx = 0;
				ny = -1;
			} else {
				nx = vx / d;
				ny = vy / d;
			}
			const pen = d < 1e-4 ? need : need - d;
			const wx = nx * ca - ny * sa;
			const wy = nx * sa + ny * ca;
			p.x -= wx * pen;
			p.y -= wy * pen;
			const vdot = p.vx * wx + p.vy * wy;
			if (vdot > 0) {
				p.vx -= vdot * wx;
				p.vy -= vdot * wy;
			}
			p.av *= .62;
		}
	}
	maybeExit(p) {
		if (p.removed || p.fly > 0 || p.anchors.length !== 0) return;
		if (this.drag?.plank === p) return;
		const e = extent(p);
		if (p.y - e.y > this.cssH + 6 || p.x + e.x < -48 || p.x - e.x > this.cssW + 48 || p.y + e.y < -80) this.exitPlank(p);
	}
	exitPlank(p) {
		if (p.removed || p.fly > 0) return;
		p.fly = .001;
		p.flyVx = p.vx;
		p.flyVy = Math.max(p.vy, 180);
		p.anchors = [];
		sfxWhoosh();
		this.emit(p.x, Math.min(p.y, this.cssH - 8), 16, true);
		this.trauma = Math.min(1, this.trauma + .22);
		if (this.tutorialStep === 2) this.tutorialStep = 0;
	}
	stepPhysics(dt) {
		const n = 4;
		const h = dt / n;
		for (let i = 0; i < n; i++) {
			for (const p of this.planks) {
				if (p.removed || p.fly > 0) continue;
				if (p.anchors.length === 0) this.integrateFree(p, h);
				else if (p.anchors.length === 1) this.integratePendulum(p, h);
			}
			for (const p of this.planks) this.maybeExit(p);
		}
	}
	removePlank(p, vx = 0, vy = 520) {
		if (p.removed || p.fly > 0) return;
		this.history.push(this.snap());
		if (this.history.length > 24) this.history.shift();
		p.fly = .001;
		p.flyVx = vx || (p.x < this.cssW / 2 ? -70 : 70);
		p.flyVy = vy;
		p.anchors = [];
		sfxWhoosh();
		sfxWood();
		this.emit(p.x, p.y, 22, true);
		this.trauma = Math.min(1, this.trauma + .4);
		if (this.tutorialStep === 2) this.tutorialStep = 0;
	}
	hammerScrew(s) {
		if (this.held) this.cancelHeld();
		return this.destroyScrew(s);
	}
	malletPlank(p) {
		this.removePlank(p, 0, 560);
		this.tool = "none";
		this.hint = "";
	}
	pointerDown(x, y, pointerId) {
		if (this.paused || this.won || this.lost || this.placing) return;
		if (this.tool === "hammer") {
			const s = this.hitScrew(x, y, true);
			if (s) {
				this.hammerScrew(s);
				this.tool = "none";
				this.hint = "";
			}
			return;
		}
		if (this.tool === "mallet") {
			const p = this.hitPlank(x, y, true);
			if (p) this.malletPlank(p);
			return;
		}
		if (this.held) {
			const dest = this.hitEmptyHole(x, y);
			if (dest) {
				this.placeHeld(dest.c, dest.r);
				return;
			}
			const other = this.hitScrew(x, y, false);
			if (other && other !== this.held) {
				this.pickScrew(other, false);
				return;
			}
			if (other === this.held) {
				this.cancelHeld();
				return;
			}
			this.trauma = Math.min(1, this.trauma + .1);
			return;
		}
		const screw = this.hitScrew(x, y, false);
		if (screw) {
			this.pickScrew(screw, false);
			return;
		}
		const free = this.hitFreePlank(x, y);
		if (free) {
			const ca = Math.cos(-free.angle);
			const sa = Math.sin(-free.angle);
			const dx = x - free.x;
			const dy = y - free.y;
			this.drag = {
				kind: "move",
				plank: free,
				lx: dx * ca - dy * sa,
				ly: dx * sa + dy * ca,
				lastX: x,
				lastY: y,
				lastT: performance.now(),
				av: 0,
				vx: 0,
				vy: 0,
				pointerId
			};
			free.vx = 0;
			free.vy = 0;
			return;
		}
		const pivot = this.hitPivotPlank(x, y);
		if (pivot) {
			const s = this.screws.get(pivot.anchors[0]);
			if (!s || !s.alive) return;
			this.drag = {
				kind: "pivot",
				plank: pivot,
				pivotX: s.x,
				pivotY: s.y,
				grabAngle: Math.atan2(y - s.y, x - s.x),
				baseAngle: pivot.angle,
				pointerId,
				lastT: performance.now(),
				lastAngle: pivot.angle
			};
			pivot.av = 0;
			if (this.tutorialStep === 3) this.tutorialStep = 0;
		}
	}
	pointerMove(x, y, pointerId) {
		if (!this.drag || this.drag.pointerId !== pointerId) return;
		if (this.drag.kind === "move") {
			const p = this.drag.plank;
			const ca = Math.cos(p.angle);
			const sa = Math.sin(p.angle);
			const vx = x - this.drag.lastX;
			const vy = y - this.drag.lastY;
			const now = performance.now();
			const dtm = Math.max(8, now - this.drag.lastT) / 1e3;
			const rx = this.drag.lx * ca - this.drag.ly * sa;
			const ry = this.drag.lx * sa + this.drag.ly * ca;
			this.drag.av += (rx * vy - ry * vx) * 8e-4;
			p.angle += this.drag.av;
			this.drag.av *= .86;
			p.x = x - (this.drag.lx * Math.cos(p.angle) - this.drag.ly * Math.sin(p.angle));
			p.y = y - (this.drag.lx * Math.sin(p.angle) + this.drag.ly * Math.cos(p.angle));
			this.drag.vx = vx / dtm;
			this.drag.vy = vy / dtm;
			this.drag.lastX = x;
			this.drag.lastY = y;
			this.drag.lastT = now;
			p.vx = this.drag.vx;
			p.vy = this.drag.vy;
			p.av = this.drag.av * 55;
		} else {
			const ang = Math.atan2(y - this.drag.pivotY, x - this.drag.pivotX);
			const p = this.drag.plank;
			const now = performance.now();
			const dtm = Math.max(8, now - this.drag.lastT) / 1e3;
			p.angle = this.drag.baseAngle + (ang - this.drag.grabAngle);
			p.av = (p.angle - this.drag.lastAngle) / dtm;
			this.drag.lastAngle = p.angle;
			this.drag.lastT = now;
			const h = this.anchorHole(p, p.anchors[0]);
			const ca = Math.cos(p.angle);
			const sa = Math.sin(p.angle);
			p.x = this.drag.pivotX - (h.lx * ca - h.ly * sa);
			p.y = this.drag.pivotY - (h.lx * sa + h.ly * ca);
		}
	}
	pointerUp(_x, _y, pointerId) {
		if (!this.drag || this.drag.pointerId !== pointerId) return;
		if (this.drag.kind === "move") {
			const p = this.drag.plank;
			p.vx = this.drag.vx;
			p.vy = this.drag.vy;
			p.av = this.drag.av * 55;
			this.updateAnchors(p, false);
			const e = extent(p);
			if (p.anchors.length === 0 && (p.y - e.y > this.cssH + 6 || p.x + e.x < -48 || p.x - e.x > this.cssW + 48)) this.exitPlank(p);
		} else {
			const p = this.drag.plank;
			if (p.av > 12) p.av = 12;
			if (p.av < -12) p.av = -12;
		}
		this.drag = null;
	}
	pointerCancel(pointerId) {
		if (this.drag?.pointerId === pointerId) this.drag = null;
	}
	hitScrew(x, y, any) {
		const rad = this.cell * .32;
		let best = null;
		let bestD = rad;
		for (const s of this.screws.values()) {
			if (!s.alive || s.dying) continue;
			if (!any && this.isCovered(s)) continue;
			const d = Math.hypot(s.x - x, s.y - y);
			if (d < bestD) {
				best = s;
				bestD = d;
			}
		}
		return best;
	}
	hitEmptyHole(x, y) {
		const rad = this.cell * .38;
		let best = null;
		let bestD = rad;
		for (const h of this.holeKeys()) {
			if (!this.isDropTarget(h.c, h.r)) continue;
			const p = this.holePos(h.c, h.r);
			const d = Math.hypot(p.x - x, p.y - y);
			if (d < bestD) {
				best = h;
				bestD = d;
			}
		}
		return best;
	}
	hitFreePlank(x, y) {
		const list = this.planks.filter((p) => !p.removed && p.fly === 0 && p.anchors.length === 0).sort((a, b) => b.z - a.z);
		for (const p of list) if (this.plankContains(p, x, y, 4)) return p;
		return null;
	}
	hitPivotPlank(x, y) {
		const list = this.planks.filter((p) => !p.removed && p.fly === 0 && p.anchors.length === 1).sort((a, b) => b.z - a.z);
		for (const p of list) if (this.plankContains(p, x, y, 4)) return p;
		return null;
	}
	hitPlank(x, y, any) {
		const list = this.planks.filter((p) => !p.removed && p.fly === 0).sort((a, b) => b.z - a.z);
		for (const p of list) {
			if (!any && p.anchors.length > 0 && this.drag) continue;
			if (this.plankContains(p, x, y, 4)) return p;
		}
		return null;
	}
	update(dt) {
		this.justWon = false;
		this.justLost = false;
		if (this.paused) return;
		if (!this.won && !this.lost) {
			this.timeLeft = Math.max(0, this.timeLeft - dt);
			if (this.timeLeft <= 0) this.lost = true;
		}
		this.pulse += dt;
		if (this.held && this.held.anim < .55) this.held.anim = Math.min(.55, this.held.anim + dt * 4.2);
		if (this.placing) {
			this.placing.t += dt / .22;
			const u = Math.min(1, this.placing.t);
			const e = 1 - (1 - u) * (1 - u);
			const dest = this.holePos(this.placing.toC, this.placing.toR);
			this.placing.s.x = this.placing.fromX + (dest.x - this.placing.fromX) * e;
			this.placing.s.y = this.placing.fromY + (dest.y - this.placing.fromY) * e;
			this.placing.s.anim = .55 * (1 - u);
			if (u >= 1) this.commitPlace(this.placing);
		}
		for (const s of this.screws.values()) if (s.dying) {
			s.anim += dt * 2.8;
			if (s.anim >= 1) this.finishDestroy(s);
		} else if (s !== this.held && this.placing?.s !== s && s.anim > 0 && s.anim < .9) s.anim = Math.max(0, s.anim - dt * 6);
		this.stepPhysics(dt);
		for (const p of this.planks) {
			if (p.wiggle > 0) p.wiggle = Math.max(0, p.wiggle - dt);
			if (p.fly > 0) {
				p.fly += dt;
				p.x += p.flyVx * dt;
				p.y += p.flyVy * dt;
				p.angle += dt * 2.2;
				p.flyVy += GRAVITY * dt;
				if (p.fly > .55) p.removed = true;
			}
		}
		for (const q of this.particles) {
			q.life += dt;
			q.x += q.vx * dt;
			q.y += q.vy * dt;
			q.vy += 520 * dt;
			q.rot += q.vr * dt;
		}
		this.particles = this.particles.filter((q) => q.life < q.max);
		this.trauma = Math.max(0, this.trauma - dt * 2.2);
		if (this.won) this.checkT = Math.min(1, this.checkT + dt * 1.6);
		if (this.planks.filter((p) => !p.removed).length === 0 && !this.won && !this.lost) {
			this.won = true;
			this.checkT = .01;
			this.emit(this.cssW / 2, this.cssH / 2, 40, true);
		}
		if (this.won && !this.prevWin) this.justWon = true;
		if (this.lost && !this.prevLose) this.justLost = true;
		this.prevWin = this.won;
		this.prevLose = this.lost;
	}
	stars() {
		const ratio = this.timeLeft / this.timeLimit;
		if (ratio > .5) return 3;
		if (ratio > .22) return 2;
		return 1;
	}
	forceWin() {
		for (const p of this.planks) p.removed = true;
		this.won = true;
		this.checkT = 1;
		this.justWon = true;
	}
	shakeOffset() {
		if (this.reducedMotion || !this.shakeOn || this.trauma <= 0) return {
			x: 0,
			y: 0
		};
		const s = this.trauma * this.trauma;
		return {
			x: (Math.random() * 2 - 1) * s * 10,
			y: (Math.random() * 2 - 1) * s * 10
		};
	}
	palette(c) {
		return COLOR_PALETTE[c];
	}
};
var BOARD = {
	oak: {
		base: "#CDB27A",
		dark: "#A07C42",
		light: "#E8D19A"
	},
	walnut: {
		base: "#6B4A32",
		dark: "#3E2A1C",
		light: "#8A6248"
	},
	birch: {
		base: "#E6D7B8",
		dark: "#C4B08A",
		light: "#F4EADA"
	}
};
var SCREW = {
	steel: {
		a: "#EEF0F3",
		b: "#8A9098",
		slot: "#4A5058"
	},
	brass: {
		a: "#F3E0A8",
		b: "#B07A28",
		slot: "#6A4A12"
	},
	obsidian: {
		a: "#6A7080",
		b: "#1C1E24",
		slot: "#0A0C10"
	}
};
function grain(ctx, seed, w, h, color) {
	ctx.save();
	ctx.strokeStyle = color;
	ctx.globalAlpha = .18;
	ctx.lineWidth = 1;
	for (let i = 0; i < 9; i++) {
		const y = -h / 2 + h * (i + .5) / 9;
		ctx.beginPath();
		ctx.moveTo(-w / 2, y);
		for (let x = -w / 2; x <= w / 2; x += 6) {
			const n = Math.sin((x + seed * 13) * .05 + i) * 2.2 + Math.sin((x + seed) * .02) * 1.4;
			ctx.lineTo(x, y + n);
		}
		ctx.stroke();
	}
	ctx.restore();
}
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
function drawShape(ctx, kind, s) {
	ctx.beginPath();
	if (kind === "star") {
		for (let i = 0; i < 5; i++) {
			const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
			const a2 = a + Math.PI / 5;
			ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
			ctx.lineTo(Math.cos(a2) * s * .42, Math.sin(a2) * s * .42);
		}
		ctx.closePath();
	} else if (kind === "heart") {
		ctx.moveTo(0, s * .35);
		ctx.bezierCurveTo(-s, -s * .25, -s * .45, -s, 0, -s * .35);
		ctx.bezierCurveTo(s * .45, -s, s, -s * .25, 0, s * .35);
	} else if (kind === "moon") {
		ctx.arc(0, 0, s, Math.PI * .25, Math.PI * 1.6);
		ctx.quadraticCurveTo(s * .1, 0, Math.cos(Math.PI * .25) * s, Math.sin(Math.PI * .25) * s);
	} else ctx.arc(0, 0, s * .35, 0, Math.PI * 2);
	ctx.fill();
}
function drawWorld(ctx, world, skins) {
	const { cssW, cssH } = world;
	ctx.clearRect(0, 0, cssW, cssH);
	const shake = world.shakeOffset();
	ctx.save();
	ctx.translate(shake.x, shake.y);
	drawBoard(ctx, world, skins.board);
	drawHoles(ctx, world);
	const planks = [...world.planks].filter((p) => !p.removed).sort((a, b) => a.z - b.z || a.id - b.id);
	for (const p of planks) drawPlank(ctx, world, p);
	if (world.held) drawDropTargets(ctx, world);
	for (const s of world.screws.values()) if (s.alive) drawScrew(ctx, world, s, skins.screw);
	for (const q of world.particles) {
		const a = 1 - q.life / q.max;
		ctx.save();
		ctx.translate(q.x, q.y);
		ctx.rotate(q.rot);
		ctx.globalAlpha = a;
		ctx.fillStyle = q.color;
		drawShape(ctx, q.kind, q.size);
		ctx.restore();
	}
	if (world.won && world.checkT > 0) {
		const t = world.checkT;
		ctx.save();
		ctx.translate(cssW / 2, cssH / 2);
		ctx.scale(.7 + .3 * Math.min(1, t * 1.4), .7 + .3 * Math.min(1, t * 1.4));
		ctx.strokeStyle = "#5AA24A";
		ctx.lineWidth = 14;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.globalAlpha = Math.min(1, t * 1.4);
		ctx.beginPath();
		ctx.moveTo(-28, 4);
		ctx.lineTo(-8, 26);
		ctx.lineTo(34, -24);
		ctx.stroke();
		ctx.restore();
	}
	ctx.restore();
}
function drawBoard(ctx, world, skin) {
	const pal = BOARD[skin];
	const { boardX, boardY, boardW, boardH } = world;
	ctx.save();
	roundRect(ctx, boardX, boardY, boardW, boardH, 22);
	const g = ctx.createLinearGradient(boardX, boardY, boardX, boardY + boardH);
	g.addColorStop(0, pal.light);
	g.addColorStop(.5, pal.base);
	g.addColorStop(1, pal.dark);
	ctx.fillStyle = g;
	ctx.fill();
	ctx.save();
	ctx.clip();
	ctx.translate(boardX + boardW / 2, boardY + boardH / 2);
	grain(ctx, 11, boardW, boardH, pal.dark);
	ctx.restore();
	ctx.strokeStyle = "rgba(80,50,20,0.28)";
	ctx.lineWidth = 3;
	roundRect(ctx, boardX + 1.5, boardY + 1.5, boardW - 3, boardH - 3, 20);
	ctx.stroke();
	ctx.restore();
}
function drawHoles(ctx, world) {
	const r = world.cell * .2;
	for (const h of world.holeKeys()) {
		const p = world.holePos(h.c, h.r);
		ctx.beginPath();
		ctx.arc(p.x, p.y + 1.2, r, 0, Math.PI * 2);
		ctx.fillStyle = "rgba(70,50,30,0.22)";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
		ctx.fillStyle = "#6A5438";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(p.x, p.y, r * .72, 0, Math.PI * 2);
		ctx.fillStyle = "#A89068";
		ctx.fill();
	}
}
function drawDropTargets(ctx, world) {
	const pulse = .55 + .45 * Math.sin(world.pulse * 6);
	const r = world.cell * .22;
	for (const h of world.dropTargets()) {
		ctx.beginPath();
		ctx.arc(h.x, h.y, r + 3, 0, Math.PI * 2);
		ctx.strokeStyle = `rgba(244, 230, 196, ${.35 + .45 * pulse})`;
		ctx.lineWidth = 3;
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(h.x, h.y, r * .55, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(232, 195, 90, ${.18 + .22 * pulse})`;
		ctx.fill();
	}
}
function drawPlank(ctx, world, p) {
	const pal = world.palette(p.color);
	const lift = p.anchors.length === 0 && p.fly === 0 ? 3 : 0;
	const wig = p.wiggle > 0 ? Math.sin(p.wiggle * 18) * .045 : 0;
	const alpha = p.fly > 0 ? Math.max(0, 1 - p.fly / .7) : 1;
	ctx.save();
	ctx.globalAlpha = alpha;
	ctx.translate(p.x, p.y - lift);
	ctx.rotate(p.angle + wig);
	ctx.fillStyle = "rgba(40,25,10,0.28)";
	roundRect(ctx, -p.length / 2 + 2, -p.thick / 2 + 4, p.length, p.thick, p.thick / 2);
	ctx.fill();
	roundRect(ctx, -p.length / 2, -p.thick / 2, p.length, p.thick, p.thick / 2);
	const g = ctx.createLinearGradient(0, -p.thick / 2, 0, p.thick / 2);
	g.addColorStop(0, pal.light);
	g.addColorStop(.45, pal.base);
	g.addColorStop(1, pal.dark);
	ctx.fillStyle = g;
	ctx.fill();
	ctx.save();
	ctx.clip();
	grain(ctx, p.seed, p.length, p.thick, pal.grain);
	ctx.restore();
	ctx.strokeStyle = pal.dark;
	ctx.lineWidth = 1.6;
	roundRect(ctx, -p.length / 2 + .8, -p.thick / 2 + .8, p.length - 1.6, p.thick - 1.6, p.thick / 2 - .4);
	ctx.stroke();
	const holeR = world.cell * .2;
	for (const h of p.holes) {
		ctx.beginPath();
		ctx.arc(h.lx, h.ly, holeR, 0, Math.PI * 2);
		ctx.fillStyle = "rgba(60,40,20,0.55)";
		ctx.fill();
		ctx.beginPath();
		ctx.arc(h.lx, h.ly, holeR * .78, 0, Math.PI * 2);
		ctx.fillStyle = "rgba(200,180,140,0.35)";
		ctx.fill();
	}
	if (p.anchors.length === 0 && p.fly === 0) {
		ctx.strokeStyle = "rgba(255,255,240,0.35)";
		ctx.lineWidth = 2;
		roundRect(ctx, -p.length / 2 - 2, -p.thick / 2 - 2, p.length + 4, p.thick + 4, p.thick / 2 + 2);
		ctx.stroke();
	}
	ctx.restore();
}
function drawScrew(ctx, world, s, skin) {
	const covered = world.isCovered(s) && world.held !== s;
	const held = world.held === s;
	const t = s.dying ? s.anim : held ? s.anim : s.anim;
	const pal = SCREW[skin];
	const r = world.cell * .2;
	ctx.save();
	ctx.translate(s.x, s.y - t * 22);
	ctx.rotate(held ? world.pulse * 5 + t * Math.PI : t * Math.PI * 3.2);
	const sc = 1 + t * .28;
	ctx.scale(sc, sc);
	ctx.globalAlpha = covered ? .38 : s.dying ? 1 - t : 1;
	if (held) {
		ctx.beginPath();
		ctx.arc(0, 0, r * 1.55, 0, Math.PI * 2);
		ctx.strokeStyle = "rgba(232, 195, 90, 0.7)";
		ctx.lineWidth = 3;
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.ellipse(1.5, 3.5, r * 1.05, r * .45, 0, 0, Math.PI * 2);
	ctx.fillStyle = "rgba(40,30,15,0.28)";
	ctx.fill();
	const g = ctx.createRadialGradient(-r * .3, -r * .35, r * .1, 0, 0, r);
	g.addColorStop(0, pal.a);
	g.addColorStop(1, pal.b);
	ctx.beginPath();
	ctx.arc(0, 0, r, 0, Math.PI * 2);
	ctx.fillStyle = g;
	ctx.fill();
	ctx.strokeStyle = "rgba(40,40,50,0.35)";
	ctx.lineWidth = 1.2;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, r * .72, 0, Math.PI * 2);
	ctx.strokeStyle = "rgba(255,255,255,0.28)";
	ctx.lineWidth = 1.4;
	ctx.stroke();
	ctx.strokeStyle = pal.slot;
	ctx.lineWidth = Math.max(2.2, r * .22);
	ctx.lineCap = "round";
	const k = r * .42;
	ctx.beginPath();
	ctx.moveTo(-k, -k);
	ctx.lineTo(k, k);
	ctx.moveTo(k, -k);
	ctx.lineTo(-k, k);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(-r * .28, -r * .3, r * .16, 0, Math.PI * 2);
	ctx.fillStyle = "rgba(255,255,255,0.45)";
	ctx.fill();
	ctx.restore();
}
function PlayScreen() {
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
	const levelDef = LEVELS[Math.max(0, Math.min(LEVEL_COUNT, playingLevel) - 1)] ?? LEVELS[0];
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const worldRef = (0, import_react.useRef)(null);
	const [runId, setRunId] = (0, import_react.useState)(0);
	const [hud, setHud] = (0, import_react.useState)({
		time: levelDef.time,
		paused: false,
		won: false,
		lost: false,
		tool: "none",
		tutorial: 0,
		hint: ""
	});
	const [result, setResult] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setSfxEnabled(sfx);
		setMusicEnabled(music);
	}, [sfx, music]);
	(0, import_react.useEffect)(() => {
		unlockAudio();
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const world = new World(levelDef, playingLevel, {
			reducedMotion: reduced,
			shake
		});
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
		const loop = (now) => {
			const dt = Math.min(.1, (now - last) / 1e3);
			last = now;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				world.update(dt);
				drawWorld(ctx, world, {
					board: boardSkin,
					screw: screwSkin
				});
			}
			acc += dt;
			if (acc > .15) {
				acc = 0;
				setHud({
					time: Math.ceil(world.timeLeft),
					paused: world.paused,
					won: world.won,
					lost: world.lost,
					tool: world.tool,
					tutorial: world.tutorialStep,
					hint: world.hint
				});
			}
			if (world.justWon) {
				sfxWin();
				const stars = world.stars();
				completeLevel(playingLevel, stars, world.timeLeft, world.timeLimit);
				const coins = 12 + stars * 8 + Math.floor(world.timeLeft / 8);
				setResult({
					stars,
					coins
				});
			}
			if (world.justLost) sfxLose();
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		const toLocal = (e) => {
			const r = canvas.getBoundingClientRect();
			return {
				x: e.clientX - r.left,
				y: e.clientY - r.top
			};
		};
		const down = (e) => {
			e.preventDefault();
			try {
				canvas.setPointerCapture(e.pointerId);
			} catch {}
			const p = toLocal(e);
			world.pointerDown(p.x, p.y, e.pointerId);
		};
		const move = (e) => {
			const p = toLocal(e);
			world.pointerMove(p.x, p.y, e.pointerId);
		};
		const up = (e) => {
			const p = toLocal(e);
			world.pointerUp(p.x, p.y, e.pointerId);
		};
		const cancel = (e) => world.pointerCancel(e.pointerId);
		canvas.addEventListener("pointerdown", down);
		canvas.addEventListener("pointermove", move);
		canvas.addEventListener("pointerup", up);
		canvas.addEventListener("pointercancel", cancel);
		window.__nutQA = {
			win: () => world.forceWin(),
			level: playingLevel,
			goto: (n) => playLevel(n),
			cover: (c, r) => world.isHoleCovered(c, r),
			timeLeft: () => world.timeLeft,
			held: () => world.held ? world.held.key : null,
			tap: (x, y) => {
				world.pointerDown(x, y, 99);
				world.pointerUp(x, y, 99);
			},
			screws: () => [...world.screws.values()].filter((s) => s.alive).map((s) => ({
				x: s.x,
				y: s.y,
				key: s.key,
				covered: world.isCovered(s)
			})),
			drops: () => world.dropTargets().map((h) => ({
				c: h.c,
				r: h.r,
				x: h.x,
				y: h.y
			})),
			planks: () => world.planks.filter((p) => !p.removed).map((p) => ({
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
				removed: p.removed
			}))
		};
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			canvas.removeEventListener("pointerdown", down);
			canvas.removeEventListener("pointermove", move);
			canvas.removeEventListener("pointerup", up);
			canvas.removeEventListener("pointercancel", cancel);
		};
	}, [
		playingLevel,
		runId,
		levelDef,
		boardSkin,
		screwSkin,
		shake,
		completeLevel
	]);
	const mm = String(Math.floor(hud.time / 60)).padStart(2, "0");
	const ss = String(hud.time % 60).padStart(2, "0");
	const useTool = (k) => {
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
		setHud((h) => ({
			...h,
			tool: k,
			hint: k
		}));
	};
	const retry = () => {
		setResult(null);
		setRunId((n) => n + 1);
	};
	const tutorialText = hud.tutorial === 1 ? t(lang, "tutorial1") : hud.tutorial === 2 ? t(lang, "tutorial2") : hud.tutorial === 3 ? t(lang, "tutorial3") : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-[#5a4632]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-40",
				style: { background: "repeating-linear-gradient(90deg, #4a3828 0 18px, #5c4632 18px 36px, #3e2e22 36px 38px)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex items-center justify-between px-3 pt-[max(10px,env(safe-area-inset-top))] pb-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "hud-chip grid size-11 place-items-center rounded-2xl",
						onClick: () => worldRef.current?.setPaused(true),
						"aria-label": t(lang, "pause"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hud-chip rounded-2xl px-4 py-1 text-base",
							children: [
								t(lang, "level"),
								" ",
								playingLevel
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 rounded-full bg-[#3a2a1c] px-3 py-0.5 text-sm font-extrabold text-[#f4e6c4] tabular-nums",
							children: [
								mm,
								":",
								ss
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HudChip, {
						className: "min-w-11 justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-4" }),
							" ",
							boosters.undo
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: wrapRef,
				className: "relative z-10 mx-3 min-h-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						className: "h-full w-full touch-none",
						style: { touchAction: "none" }
					}),
					tutorialText && !hud.paused && !hud.won && !hud.lost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute top-3 right-3 left-3 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-[rgba(30,24,16,0.72)] px-3 py-1.5 text-sm font-bold text-[var(--color-cream)]",
							children: tutorialText
						})
					}),
					hud.tool !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute bottom-3 left-0 w-full text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-[rgba(30,24,16,0.72)] px-3 py-1.5 text-sm font-bold text-[var(--color-cream)]",
							children: hud.tool === "hammer" ? t(lang, "hammerHint") : t(lang, "malletHint")
						})
					}),
					hud.hint === "place" && hud.tool === "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute bottom-3 left-0 w-full text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-[rgba(30,24,16,0.72)] px-3 py-1.5 text-sm font-bold text-[var(--color-cream)]",
							children: t(lang, "placeHint")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex items-center justify-center gap-5 px-4 pt-2 pb-[max(12px,env(safe-area-inset-bottom))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoosterBtn, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { className: "size-7" }),
						count: boosters.hammer,
						active: hud.tool === "hammer",
						onClick: () => useTool("hammer"),
						label: t(lang, "hammer")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoosterBtn, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-7" }),
						count: boosters.undo,
						onClick: () => useTool("undo"),
						label: t(lang, "undo")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoosterBtn, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-7" }),
						count: boosters.mallet,
						active: hud.tool === "mallet",
						onClick: () => useTool("mallet"),
						label: t(lang, "mallet")
					})
				]
			}),
			hud.paused && !hud.won && !hud.lost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
				title: t(lang, "pause"),
				onClose: () => worldRef.current?.setPaused(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
							onClick: () => worldRef.current?.setPaused(false),
							children: t(lang, "resume")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
							variant: "wood",
							onClick: retry,
							children: t(lang, "retry")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
							variant: "wood",
							onClick: () => setScreen("home"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-5" }),
									" ",
									t(lang, "toHome")
								]
							})
						})
					]
				})
			}),
			hud.lost && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
				title: t(lang, "fail"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-center text-sm font-bold",
					children: t(lang, "failHint")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
						onClick: retry,
						children: t(lang, "retry")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
						variant: "wood",
						onClick: () => setScreen("home"),
						children: t(lang, "toHome")
					})]
				})]
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
				title: t(lang, "clear"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex justify-center gap-1",
						children: [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							className: "star-pop size-9",
							style: { animationDelay: `${i * 80}ms` },
							fill: i <= result.stars ? "#E8C35A" : "transparent",
							color: i <= result.stars ? "#E8C35A" : "rgba(90,70,40,0.35)"
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-center gap-1 font-extrabold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { size: 20 }),
							" +",
							result.coins
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							playingLevel < LEVEL_COUNT && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
								onClick: () => {
									setResult(null);
									playLevel(playingLevel + 1);
								},
								children: t(lang, "next")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
								variant: "wood",
								onClick: retry,
								children: t(lang, "retry")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
								variant: "wood",
								onClick: () => setScreen("home"),
								children: t(lang, "toHome")
							})
						]
					})
				]
			})
		]
	});
}
function BoosterBtn({ icon, count, onClick, active, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": label,
		className: `relative grid size-[68px] place-items-center rounded-[18px] border-[3px] border-[#8a6434] bg-[linear-gradient(#f3e4bf,#d7b87e)] text-[var(--color-ink)] shadow-[0_4px_0_#6a4a24] ${active ? "ring-2 ring-[#5c3a28]" : ""}`,
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-[#6b8f4e] text-xs font-extrabold text-white",
			children: count
		})]
	});
}
function TopBar({ title, onBack }) {
	const coins = useGameStore((s) => s.coins);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex items-center justify-between px-3 pt-[max(12px,env(safe-area-inset-top))] pb-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onBack,
				className: "hud-chip grid size-11 place-items-center rounded-2xl",
				"aria-label": "back",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-extrabold text-[var(--color-cream)]",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HudChip, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {}),
				" ",
				coins
			] })
		]
	});
}
function ShopScreen() {
	const lang = useGameStore((s) => s.lang);
	const setScreen = useGameStore((s) => s.setScreen);
	const addBooster = useGameStore((s) => s.addBooster);
	const buy = useGameStore((s) => s.buy);
	const setToast = useGameStore((s) => s.setToast);
	const items = [
		{
			key: "undo",
			n: 3,
			cost: 40,
			label: t(lang, "shopUndo")
		},
		{
			key: "hammer",
			n: 1,
			cost: 55,
			label: t(lang, "shopHammer")
		},
		{
			key: "mallet",
			n: 1,
			cost: 80,
			label: t(lang, "shopMallet")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "workshop-bg flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			title: t(lang, "shop"),
			onBack: () => setScreen("home")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-3 px-4 py-3",
			children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-wood flex items-center justify-between rounded-[22px] px-4 py-3 text-[var(--color-ink)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-extrabold",
					children: it.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-1 text-sm font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, { size: 14 }),
						" ",
						it.cost
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
					className: "px-4 py-2 text-base",
					onClick: () => {
						sfxUi();
						const ok = buy(it.cost, () => addBooster(it.key, it.n));
						setToast(ok ? null : t(lang, "notEnough"));
					},
					children: t(lang, "buy")
				})]
			}, it.key))
		})]
	});
}
function ClosetScreen() {
	const lang = useGameStore((s) => s.lang);
	const setScreen = useGameStore((s) => s.setScreen);
	const owned = useGameStore((s) => s.ownedSkins);
	const boardSkin = useGameStore((s) => s.boardSkin);
	const screwSkin = useGameStore((s) => s.screwSkin);
	const ownSkin = useGameStore((s) => s.ownSkin);
	const equipBoard = useGameStore((s) => s.equipBoard);
	const equipScrew = useGameStore((s) => s.equipScrew);
	const setToast = useGameStore((s) => s.setToast);
	const boards = [
		{
			id: "oak",
			cost: 0,
			label: t(lang, "boardOak")
		},
		{
			id: "walnut",
			cost: 120,
			label: t(lang, "boardWalnut")
		},
		{
			id: "birch",
			cost: 120,
			label: t(lang, "boardBirch")
		}
	];
	const screws = [
		{
			id: "steel",
			cost: 0,
			label: t(lang, "screwSteel")
		},
		{
			id: "brass",
			cost: 90,
			label: t(lang, "screwBrass")
		},
		{
			id: "obsidian",
			cost: 90,
			label: t(lang, "screwObsidian")
		}
	];
	const act = (id, cost, equip) => {
		sfxUi();
		if (owned.includes(id)) {
			equip();
			return;
		}
		if (ownSkin(id, cost)) equip();
		else setToast(t(lang, "notEnough"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "workshop-bg flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			title: t(lang, "closet"),
			onBack: () => setScreen("home")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 font-extrabold text-[var(--color-cream)]",
					children: t(lang, "boards")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: boards.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinCard, {
						title: b.label,
						owned: owned.includes(b.id),
						equipped: boardSkin === b.id,
						cost: b.cost,
						swatch: b.id === "oak" ? "#C9A66B" : b.id === "walnut" ? "#6B4A32" : "#E6D7B8",
						onClick: () => act(b.id, b.cost, () => equipBoard(b.id)),
						lang
					}, b.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 mb-2 font-extrabold text-[var(--color-cream)]",
					children: t(lang, "screws")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: screws.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinCard, {
						title: b.label,
						owned: owned.includes(b.id),
						equipped: screwSkin === b.id,
						cost: b.cost,
						swatch: b.id === "steel" ? "#C5C8CE" : b.id === "brass" ? "#E0B25A" : "#2A2E36",
						onClick: () => act(b.id, b.cost, () => equipScrew(b.id)),
						lang
					}, b.id))
				})
			]
		})]
	});
}
function SkinCard({ title, owned, equipped, cost, swatch, onClick, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "panel-wood flex flex-col items-center gap-2 rounded-[18px] p-3 text-[var(--color-ink)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block h-10 w-full rounded-xl border border-[#8a6434]",
				style: { background: swatch }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-extrabold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-bold",
				children: equipped ? t(lang, "equipped") : owned ? t(lang, "equip") : `${cost}`
			})
		]
	});
}
function RankScreen() {
	const lang = useGameStore((s) => s.lang);
	const setScreen = useGameStore((s) => s.setScreen);
	const bestTime = useGameStore((s) => s.bestTime);
	const stars = useGameStore((s) => s.stars);
	const rows = Object.keys(bestTime).map((k) => ({
		level: Number(k),
		time: bestTime[k],
		stars: stars[k] ?? 0
	})).sort((a, b) => a.time - b.time).slice(0, 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "workshop-bg flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			title: t(lang, "rankingTitle"),
			onBack: () => setScreen("home")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-auto px-4 py-2",
			children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-center font-bold text-[var(--color-cream-dark)]",
				children: t(lang, "noTimes")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-2",
				children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "panel-wood flex items-center justify-between rounded-[18px] px-4 py-2.5 text-[var(--color-ink)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 font-extrabold",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1 font-bold",
							children: [
								t(lang, "level"),
								" ",
								r.level
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-2 inline-flex text-[var(--color-oak-dark)]",
							children: Array.from({ length: 3 }, (_, si) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								className: "size-3.5",
								fill: si < r.stars ? "#E8C35A" : "transparent",
								color: si < r.stars ? "#E8C35A" : "rgba(90,70,40,0.35)"
							}, si))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-extrabold tabular-nums",
							children: fmt(r.time)
						})
					]
				}, r.level))
			})
		})]
	});
}
function fmt(sec) {
	const s = Math.floor(sec);
	return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function LevelSelect() {
	const lang = useGameStore((s) => s.lang);
	const setScreen = useGameStore((s) => s.setScreen);
	const maxUnlocked = useGameStore((s) => s.maxUnlocked);
	const stars = useGameStore((s) => s.stars);
	const playLevel = useGameStore((s) => s.playLevel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "workshop-bg flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			title: t(lang, "levels"),
			onBack: () => setScreen("home")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-2 overflow-auto px-4 py-3 pb-8",
			children: Array.from({ length: LEVEL_COUNT }, (_, i) => {
				const n = i + 1;
				const locked = n > maxUnlocked;
				const st = stars[String(n)] ?? 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: locked,
					onClick: () => {
						sfxUi();
						playLevel(n);
					},
					className: "panel-wood flex aspect-square flex-col items-center justify-center rounded-[16px] text-[var(--color-ink)] disabled:opacity-50",
					children: [locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-extrabold",
						children: n
					}), !locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 inline-flex",
						children: Array.from({ length: 3 }, (_, si) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							className: "size-2.5",
							fill: si < st ? "#E8C35A" : "transparent",
							color: si < st ? "#E8C35A" : "rgba(90,70,40,0.4)"
						}, si))
					})]
				}, n);
			})
		})]
	});
}
function DailyModal() {
	const lang = useGameStore((s) => s.lang);
	const dailyDone = useGameStore((s) => s.dailyDone);
	const dailyClaimed = useGameStore((s) => s.dailyClaimed);
	const claimDaily = useGameStore((s) => s.claimDaily);
	const setDailyOpen = useGameStore((s) => s.setDailyOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		title: t(lang, "daily"),
		onClose: () => setDailyOpen(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-center text-sm font-bold",
				children: t(lang, "dailyDesc")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 h-3 overflow-hidden rounded-full bg-[rgba(90,50,20,0.15)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-[var(--color-sage)]",
					style: { width: `${dailyDone / 2 * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-center gap-3 font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {}), " 60"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NutIcon, {}), " 2"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WoodButton, {
				className: "w-full",
				disabled: dailyClaimed || dailyDone < 2,
				onClick: () => {
					claimDaily();
					sfxUi();
				},
				children: dailyClaimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" }),
						" ",
						t(lang, "claimed")
					]
				}) : t(lang, "claim")
			})
		]
	});
}
function Toast() {
	const toast = useGameStore((s) => s.toast);
	const setToast = useGameStore((s) => s.setToast);
	if (!toast) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setToast(null),
		className: "absolute bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#3a2a1c] px-4 py-2 text-sm font-bold text-[var(--color-cream)] shadow-lg",
		children: toast
	});
}
function GameApp() {
	const screen = useGameStore((s) => s.screen);
	const settingsOpen = useGameStore((s) => s.settingsOpen);
	const dailyOpen = useGameStore((s) => s.dailyOpen);
	const sfx = useGameStore((s) => s.sfx);
	const music = useGameStore((s) => s.music);
	const lang = useGameStore((s) => s.lang);
	const hydrate = useGameStore((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
		window.__nutStore = useGameStore;
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang === "ja" ? "ja" : "en";
	}, [lang]);
	(0, import_react.useEffect)(() => {
		const unlock = () => unlockAudio();
		window.addEventListener("pointerdown", unlock, { once: true });
		window.addEventListener("keydown", unlock, { once: true });
		return () => {
			window.removeEventListener("pointerdown", unlock);
			window.removeEventListener("keydown", unlock);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		setSfxEnabled(sfx);
		setMusicEnabled(music);
	}, [sfx, music]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-dvh min-h-[100dvh] w-full items-center justify-center bg-[#141820]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "phone-shell",
			children: [
				screen === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, {}),
				screen === "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayScreen, {}),
				screen === "shop" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopScreen, {}),
				screen === "closet" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClosetScreen, {}),
				screen === "rank" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankScreen, {}),
				screen === "levels" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelSelect, {}),
				settingsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsModal, {}),
				dailyOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyModal, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { Home as component };
