"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WIN_RATE = 0.1; // 10%
const STORAGE_KEY = "tea-lucky-draw-v1";

type Result =
  | { state: "win"; code: string; at: string }
  | { state: "lose"; at: string };

function makeCode() {
  const s = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TEA90-${s}`;
}

function readStored(): Result | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.state === "win" || parsed?.state === "lose") return parsed;
    return null;
  } catch {
    return null;
  }
}

/** 一心二葉的茶芽圖示 */
function TeaSprig() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 莖 */}
      <path d="M12 21c0-4-0-6-0-8" />
      {/* 中心的芽（一心） */}
      <path d="M12 13c-1.7-2-1.7-5.2 0-8 1.7 2.8 1.7 6 0 8Z" />
      {/* 左葉 */}
      <path d="M12 15C8.6 14 5 12 4 7.5 8.4 8 11.4 10.6 12 15Z" />
      <path d="M11 13.4C9 12 7.2 10.3 5.8 8.6" />
      {/* 右葉 */}
      <path d="M12 15c3.4-1 7-3 8-7.5-4.4.5-7.4 3.1-8 7.5Z" />
      <path d="M13 13.4c2-1.4 3.8-3.1 5.2-4.8" />
    </svg>
  );
}

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [rolling, setRolling] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // 讀取先前抽獎結果（每個瀏覽器一次）
  useEffect(() => {
    setResult(readStored());
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Esc 關閉 + 鎖背景捲動
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const draw = () => {
    if (result || rolling) return;
    setRolling(true);
    // 一點點延遲，讓抽獎有「轉」的感覺
    window.setTimeout(() => {
      const won = Math.random() < WIN_RATE;
      const next: Result = won
        ? { state: "win", code: makeCode(), at: new Date().toISOString() }
        : { state: "lose", at: new Date().toISOString() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // 無法寫入 localStorage 也不影響本次結果顯示
      }
      setResult(next);
      setRolling(false);
    }, 700);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 border border-ink bg-paper px-4 py-3 text-sm tracking-[0.1em] text-ink shadow-[0_14px_40px_-14px_rgba(27,25,21,0.5)] transition-colors hover:bg-ink hover:text-paper"
      >
        <TeaSprig />
        抽茶葉優惠券
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-4 backdrop-blur-sm sm:items-center"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lucky-draw-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm border border-line bg-paper p-8 outline-none"
          >
            <button
              type="button"
              onClick={close}
              aria-label="關閉"
              className="absolute right-3 top-3 p-2 text-ink-soft transition-colors hover:text-ink"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path d="M4 4l10 10M14 4L4 14" />
              </svg>
            </button>

            <p className="text-xs tracking-[0.3em] text-gold">茶香花園茶園</p>
            <h2
              id="lucky-draw-title"
              className="mt-3 font-serif text-2xl text-ink"
            >
              抽一張茶葉優惠券
            </h2>

            {!result && (
              <>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  每人一次機會，10&nbsp;%&nbsp;機率抽中「茶葉優惠券&nbsp;9&nbsp;折」。
                  中獎後會給你一組折扣碼。
                </p>
                <button
                  type="button"
                  onClick={draw}
                  disabled={rolling}
                  className="mt-6 w-full bg-ink py-3 text-sm tracking-[0.2em] text-paper transition-colors hover:bg-pine disabled:opacity-60"
                >
                  {rolling ? "抽獎中…" : "開始抽獎"}
                </button>
              </>
            )}

            {result?.state === "win" && (
              <div className="mt-4">
                <p className="text-sm leading-7 text-ink-soft">
                  恭喜中獎！這是你的
                  <span className="text-ink">「茶葉優惠券 9 折」</span>折扣碼：
                </p>
                <p className="mt-4 select-all border border-dashed border-ink bg-paper-dim px-4 py-3 text-center font-serif text-lg tracking-[0.15em] text-ink">
                  {result.code}
                </p>
                <p className="mt-3 text-xs leading-6 text-ink-soft">
                  開賣後結帳時輸入即可享 9 折，單筆訂單限用一次。
                  此頁會為你記住這組折扣碼。
                </p>
              </div>
            )}

            {result?.state === "lose" && (
              <div className="mt-4">
                <p className="text-sm leading-7 text-ink-soft">
                  這次沒有抽中，銘謝惠顧。
                  之後有新一季的茶或活動，歡迎在頁尾留下&nbsp;email，我們會通知你。
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 w-full border border-ink py-3 text-sm tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  好
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
