"use client";

import { useActionState } from "react";
import { joinInterestList, type InterestState } from "../actions";

const initial: InterestState = { status: "idle", message: "" };

export default function InterestForm() {
  const [state, formAction, pending] = useActionState(joinInterestList, initial);

  return (
    <form action={formAction} className="mt-8 max-w-md md:mt-0 md:w-80">
      <label
        htmlFor="interest-email"
        className="text-xs tracking-[0.2em] text-ink-soft"
      >
        留下 email，加入有興趣名單
      </label>
      <div className="mt-3 flex border border-ink">
        <input
          id="interest-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-ink outline-none placeholder:text-ink-soft/60"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 bg-ink px-5 text-sm tracking-[0.15em] text-paper transition-colors hover:bg-pine disabled:opacity-60"
        >
          {pending ? "送出中" : "加入"}
        </button>
      </div>
      <input
        type="text"
        name="note"
        placeholder="想先了解的茶款或問題（選填）"
        className="mt-2 w-full border-b border-line bg-transparent py-2 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-ink"
      />
      <p
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-xs ${
          state.status === "error" ? "text-[#9b3b2f]" : "text-ink-soft"
        }`}
      >
        {state.message}
      </p>
      <p className="mt-1 text-xs text-ink-soft/70">
        僅用於開賣通知，不做其他用途。
      </p>
    </form>
  );
}
