"use client";

import { useEffect, useRef, useState } from "react";
import { wrap } from "./ui";

const STORAGE_KEY = "tea-visitor-name";

function greetingByHour() {
  const h = new Date().getHours();
  if (h < 5) return "夜深了";
  if (h < 11) return "早安";
  if (h < 14) return "午安";
  if (h < 18) return "午后好";
  return "晚安";
}

export default function WelcomeGate() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }
    if (saved && saved.trim()) {
      setName(saved);
    } else {
      setAsking(true);
    }
  }, []);

  useEffect(() => {
    if (asking) {
      setDraft(name ?? "");
      // 等 modal 掛上再聚焦
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [asking, name]);

  const save = (value: string) => {
    const v = value.trim().slice(0, 20);
    if (!v) return;
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch {
      // 無法寫入也讓本次 session 顯示
    }
    setName(v);
    setAsking(false);
  };

  const skip = () => setAsking(false);

  if (!mounted) return null;

  return (
    <>
      {name && (
        <div className="border-b border-line bg-paper-dim">
          <div
            className={`${wrap} flex items-center justify-between gap-3 py-2 text-xs text-ink-soft`}
          >
            <p className="truncate">
              {greetingByHour()}，
              <span className="font-serif text-sm text-ink">{name}</span>
              　歡迎來到茶香花園茶園
            </p>
            <button
              type="button"
              onClick={() => setAsking(true)}
              className="shrink-0 tracking-[0.1em] underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              改稱呼
            </button>
          </div>
        </div>
      )}

      {asking && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/45 p-4 backdrop-blur-sm sm:items-center"
          onClick={skip}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm border border-line bg-paper p-8"
          >
            <p className="text-xs tracking-[0.3em] text-gold">茶香花園茶園</p>
            <h2 id="welcome-title" className="mt-3 font-serif text-2xl text-ink">
              想怎麼稱呼你？
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              留個稱呼，逛的時候我們好招呼你。只存在你的瀏覽器，不會上傳。
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                save(draft);
              }}
              className="mt-6"
            >
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={20}
                placeholder="例如：陳先生、小雨、茶友"
                aria-label="稱呼"
                className="w-full border border-ink bg-transparent px-3 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/60"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="mt-4 w-full bg-ink py-3 text-sm tracking-[0.2em] text-paper transition-colors hover:bg-pine disabled:opacity-50"
              >
                就這樣稱呼
              </button>
            </form>

            <button
              type="button"
              onClick={skip}
              className="mt-3 w-full py-2 text-xs tracking-[0.1em] text-ink-soft transition-colors hover:text-ink"
            >
              先略過
            </button>
          </div>
        </div>
      )}
    </>
  );
}
