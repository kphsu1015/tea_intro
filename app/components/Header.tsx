import { wrap } from "./ui";

const links = [
  { href: "/#terroir", label: "茶區" },
  { href: "/#teas", label: "茶款" },
  { href: "/#brewing", label: "沖泡" },
  { href: "/#story", label: "茶事" },
  { href: "/blog", label: "茶記" },
  { href: "/game", label: "小遊戲" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className={`${wrap} flex h-16 items-center justify-between gap-3`}>
        <a href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-base tracking-tight text-ink sm:text-xl">
            茶香花園茶園
          </span>
          <span className="hidden text-[11px] tracking-[0.25em] text-ink-soft sm:inline">
            ALISHAN
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden items-center gap-5 md:flex lg:gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm tracking-[0.15em] text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="/#teas"
            className="border border-ink px-3 py-2 text-xs tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-paper sm:px-4 sm:text-sm"
          >
            當季茶款
          </a>

          {/* 手機選單（無需 JS） */}
          <details className="group relative md:hidden">
            <summary className="flex cursor-pointer list-none items-center p-2 [&::-webkit-details-marker]:hidden">
              <span className="sr-only">開啟選單</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
                className="text-ink"
              >
                <path d="M3 6h16M3 11h16M3 16h16" className="group-open:hidden" />
                <path d="M5 5l12 12M17 5L5 17" className="hidden group-open:block" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-40 border border-line bg-paper p-1.5 shadow-[0_12px_40px_-12px_rgba(27,25,21,0.35)]">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-3 py-3 text-sm tracking-[0.15em] text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
