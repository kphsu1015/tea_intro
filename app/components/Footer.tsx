import { wrap } from "./ui";

const columns = [
  {
    title: "茶款",
    items: ["青心烏龍・春摘", "金萱烏龍", "冬片蜜香烏龍"],
  },
  {
    title: "認識",
    items: ["茶區環境", "沖泡方式", "產銷履歷", "製茶筆記"],
  },
  {
    title: "聯繫",
    items: ["來信詢問", "電話洽詢", "Instagram", "茶園位置"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className={`${wrap} py-16`}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-2xl tracking-tight text-ink">
              茶香花園茶園
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-ink-soft">
              阿里山自有茶區，當季手採的高山烏龍。
              不靠重焙火，讓乾淨的茶菁與走透的水，替一座山說話。
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs tracking-[0.25em] text-ink-soft">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-ink">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#top"
                      className="transition-colors hover:text-gold"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs tracking-wide text-ink-soft sm:flex-row">
          <span>© {new Date().getFullYear()} 茶香花園茶園　嘉義縣阿里山鄉</span>
          <span>service@example.com　+886 5 000 0000</span>
        </div>
      </div>
    </footer>
  );
}
