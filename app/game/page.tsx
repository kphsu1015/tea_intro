import type { Metadata } from "next";
import { wrap } from "../components/ui";
import BugCatcher from "./BugCatcher";

export const metadata: Metadata = {
  title: "抓茶蟲小遊戲 · 茶香花園茶園",
  description: "一個限時 30 秒的抓茶蟲小遊戲，單純娛樂。分數只存在你的瀏覽器。",
};

export default function GamePage() {
  return (
    <main className={`${wrap} py-16 md:py-24`}>
      <header className="border-t border-ink pt-6">
        <span className="font-serif text-sm tracking-[0.2em] text-gold">
          小遊戲
        </span>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-6xl">
          抓茶蟲
        </h1>
        <p className="mt-5 max-w-xl text-ink-soft">
          泡茶等水滾的時候玩一下。點掉葉子上冒出來的蟲，看 30 秒內能抓幾分。
        </p>
      </header>

      <div className="mt-12">
        <BugCatcher />
      </div>
    </main>
  );
}
