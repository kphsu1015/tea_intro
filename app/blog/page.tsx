import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { wrap } from "../components/ui";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "茶記 · 茶香花園茶園",
  description:
    "關於阿里山高山茶的筆記：茶區的天氣如何養出回甘、一心二葉的手採與走水、以及在家把高山烏龍泡好的方法。",
};

const fmtDate = (iso: string) => iso.replaceAll("-", ".");

export default function BlogIndex() {
  return (
    <main className={`${wrap} py-16 md:py-24`}>
      <header className="border-t border-ink pt-6">
        <span className="font-serif text-sm tracking-[0.2em] text-gold">
          茶記
        </span>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-6xl">
          關於這座山的茶
        </h1>
        <p className="mt-5 max-w-xl text-ink-soft">
          我們把茶區、製茶與沖泡的一些想法寫下來。不談玄的，只談那些真的會影響一杯茶的事。
        </p>
      </header>

      <ul className="mt-14 border-t border-line">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-line">
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-6 py-10 md:grid-cols-[16rem_1fr] md:gap-10"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-line">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 16rem"
                  placeholder="blur"
                  className="object-cover saturate-[.9] contrast-[1.02] transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-ink-soft">
                  {fmtDate(post.date)}　{post.read}
                </p>
                <h2 className="mt-3 font-serif text-2xl text-ink transition-colors group-hover:text-gold md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-4 max-w-xl leading-8 text-ink-soft">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm tracking-[0.15em] text-ink">
                  <span className="border-b border-ink pb-0.5 transition-colors group-hover:border-gold group-hover:text-gold">
                    讀這篇
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
