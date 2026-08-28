import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { wrap } from "../../components/ui";
import { getPost, posts } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} · 茶記`,
    description: post.excerpt,
  };
}

const fmtDate = (iso: string) => iso.replaceAll("-", ".");

export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === slug);
  const next = posts[(idx + 1) % posts.length];

  return (
    <main className={`${wrap} py-16 md:py-24`}>
      <Link
        href="/blog"
        className="text-sm tracking-[0.15em] text-ink-soft transition-colors hover:text-ink"
      >
        ← 茶記
      </Link>

      <article className="mt-8">
        <header className="border-t border-ink pt-6">
          <p className="text-xs tracking-[0.2em] text-ink-soft">
            {fmtDate(post.date)}　{post.read}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.2] text-ink md:text-5xl">
            {post.title}
          </h1>
        </header>

        <figure className="mt-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden ring-1 ring-line">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              placeholder="blur"
              className="object-cover saturate-[.9] contrast-[1.02]"
            />
          </div>
        </figure>

        <div className="mx-auto mt-12 max-w-2xl">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="mt-12 font-serif text-2xl text-ink md:text-[1.7rem]"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-10 border-l-2 border-gold pl-5 font-serif text-xl leading-relaxed text-ink"
                >
                  {block.text}
                </blockquote>
              );
            }
            return (
              <p key={i} className="mt-6 leading-8 text-ink-soft">
                {block.text}
              </p>
            );
          })}
        </div>
      </article>

      <div className="mx-auto mt-16 max-w-2xl border-t border-line pt-8">
        <p className="text-xs tracking-[0.2em] text-ink-soft">下一篇</p>
        <Link
          href={`/blog/${next.slug}`}
          className="group mt-3 inline-flex items-baseline gap-3"
        >
          <span className="font-serif text-xl text-ink transition-colors group-hover:text-gold">
            {next.title}
          </span>
          <span
            aria-hidden
            className="text-ink-soft transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
