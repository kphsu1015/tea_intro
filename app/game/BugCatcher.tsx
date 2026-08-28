"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GRID = 12; // 4 x 3
const DURATION = 30; // 秒
const BEST_KEY = "tea-bug-game-best";
const NAME_KEY = "tea-visitor-name";

type Kind = "pest" | "rare" | "avoid";
// 只用舊版就有的 emoji，避免 Windows 10 的表情字型缺字（🪲 之類新符號會變空白）
const EMOJI: Record<Kind, string> = { pest: "🐛", rare: "🐞", avoid: "🦋" };
const POINTS: Record<Kind, number> = { pest: 1, rare: 3, avoid: -2 };
const LIFE: Record<Kind, number> = { pest: 950, rare: 750, avoid: 1150 };

type Cell = { id: number; kind: Kind } | null;
type Phase = "idle" | "playing" | "over";

export default function BugCatcher() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cells, setCells] = useState<Cell[]>(Array(GRID).fill(null));
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(DURATION);
  const [best, setBest] = useState(0);
  const [name, setName] = useState<string | null>(null);
  const [flash, setFlash] = useState<number | null>(null);
  const lifeTimers = useRef<number[]>([]);
  const idRef = useRef(1);

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem(BEST_KEY)) || 0);
      const n = localStorage.getItem(NAME_KEY);
      if (n && n.trim()) setName(n);
    } catch {
      // 忽略
    }
  }, []);

  const clearLifeTimers = useCallback(() => {
    lifeTimers.current.forEach((t) => window.clearTimeout(t));
    lifeTimers.current = [];
  }, []);

  useEffect(() => clearLifeTimers, [clearLifeTimers]);

  const start = () => {
    clearLifeTimers();
    setCells(Array(GRID).fill(null));
    setScore(0);
    setTime(DURATION);
    setPhase("playing");
  };

  // 倒數
  useEffect(() => {
    if (phase !== "playing") return;
    if (time <= 0) {
      setPhase("over");
      return;
    }
    const t = window.setTimeout(() => setTime((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, time]);

  // 結束時清場並記錄最佳
  useEffect(() => {
    if (phase !== "over") return;
    clearLifeTimers();
    setCells(Array(GRID).fill(null));
    setBest((b) => {
      const nb = Math.max(b, score);
      try {
        localStorage.setItem(BEST_KEY, String(nb));
      } catch {
        // 忽略
      }
      return nb;
    });
  }, [phase, score, clearLifeTimers]);

  // 冒蟲
  useEffect(() => {
    if (phase !== "playing") return;
    const spawn = () => {
      setCells((prev) => {
        const empty: number[] = [];
        prev.forEach((c, i) => {
          if (!c) empty.push(i);
        });
        if (empty.length === 0) return prev;
        const idx = empty[Math.floor(Math.random() * empty.length)];
        const r = Math.random();
        const kind: Kind = r < 0.12 ? "rare" : r < 0.3 ? "avoid" : "pest";
        const id = idRef.current++;
        const next = [...prev];
        next[idx] = { id, kind };
        const to = window.setTimeout(() => {
          setCells((cur) => {
            const c = cur[idx];
            if (!c || c.id !== id) return cur; // 已被抓掉或換成別隻
            const n = [...cur];
            n[idx] = null;
            return n;
          });
        }, LIFE[kind]);
        lifeTimers.current.push(to);
        return next;
      });
    };
    const interval = window.setInterval(spawn, 620);
    return () => window.clearInterval(interval);
  }, [phase]);

  const hit = (i: number) => {
    if (phase !== "playing") return;
    const cell = cells[i];
    if (!cell) return;
    setScore((s) => Math.max(0, s + POINTS[cell.kind]));
    if (cell.kind === "avoid") {
      setFlash(i);
      window.setTimeout(() => setFlash(null), 240);
    }
    setCells((prev) => {
      if (prev[i]?.id !== cell.id) return prev;
      const n = [...prev];
      n[i] = null;
      return n;
    });
  };

  return (
    <div className="mx-auto max-w-xl">
      {/* 計分列 */}
      <div className="flex items-end justify-between border-y border-line py-4 text-sm">
        <div>
          <span className="text-xs tracking-[0.2em] text-ink-soft">分數</span>
          <p className="font-serif text-3xl text-ink">{score}</p>
        </div>
        <div className="text-center">
          <span className="text-xs tracking-[0.2em] text-ink-soft">剩餘</span>
          <p
            className={`font-serif text-3xl ${
              phase === "playing" && time <= 5 ? "text-[#9b3b2f]" : "text-ink"
            }`}
          >
            {time}s
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs tracking-[0.2em] text-ink-soft">最佳</span>
          <p className="font-serif text-3xl text-gold">{best}</p>
        </div>
      </div>

      {/* 遊戲盤 */}
      <div className="relative mt-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {cells.map((cell, i) => (
            <button
              key={i}
              type="button"
              onClick={() => hit(i)}
              aria-label={cell ? `抓 ${EMOJI[cell.kind]}` : "空的葉子"}
              className={`flex aspect-square items-center justify-center border ring-1 ring-line transition-colors ${
                flash === i
                  ? "border-[#9b3b2f] bg-[#9b3b2f]/10"
                  : "border-line bg-paper-dim hover:bg-paper"
              }`}
            >
              {cell && (
                <span
                  key={cell.id}
                  className="text-3xl leading-none sm:text-4xl"
                  style={{ animation: "bug-pop .14s ease-out" }}
                >
                  {EMOJI[cell.kind]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 開始畫面 */}
        {phase === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/92 p-6 text-center backdrop-blur-sm">
            <h2 className="font-serif text-2xl text-ink">抓茶蟲</h2>
            <p className="mt-3 max-w-xs text-sm leading-7 text-ink-soft">
              葉子上冒出蟲就點掉它。
              <br />
              🐛 +1　🐞 +3　🦋 別打（−2）
              <br />
              限時 {DURATION} 秒。
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-6 bg-ink px-8 py-3 text-sm tracking-[0.2em] text-paper transition-colors hover:bg-pine"
            >
              開始
            </button>
          </div>
        )}

        {/* 結束畫面 */}
        {phase === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/92 p-6 text-center backdrop-blur-sm">
            <p className="text-xs tracking-[0.3em] text-gold">時間到</p>
            <h2 className="mt-3 font-serif text-2xl text-ink">
              {name ? `${name}，` : ""}你抓到 {score} 分
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              {score >= best && score > 0
                ? "刷新個人最佳！"
                : `個人最佳 ${best} 分`}
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-6 bg-ink px-8 py-3 text-sm tracking-[0.2em] text-paper transition-colors hover:bg-pine"
            >
              再玩一次
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs leading-6 text-ink-soft/80">
        純娛樂小遊戲，分數只存在你的瀏覽器。畫面裡的蟲和真實茶園管理無關——
        我們的茶區其實很歡迎小綠葉蟬，牠咬過的芽才有蜜香。
      </p>
    </div>
  );
}
