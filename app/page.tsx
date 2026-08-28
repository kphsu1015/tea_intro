import Image from "next/image";
import { wrap } from "./components/ui";
import InterestForm from "./components/InterestForm";

import teaGarden01 from "@/public/images/tea-garden-01.jpg";
import teaGarden02 from "@/public/images/tea-garden-02.jpg";
import teaGarden03 from "@/public/images/tea-garden-03.jpg";
import teaGarden04 from "@/public/images/tea-garden-04.jpg";
import teaGarden05 from "@/public/images/tea-garden-05.jpg";
import teaHarvest01 from "@/public/images/tea-harvest-01.jpg";
import teaHarvest02 from "@/public/images/tea-harvest-02.jpg";
import teaLeaves01 from "@/public/images/tea-leaves-01.jpg";
import teaLeaves02 from "@/public/images/tea-leaves-02.jpg";
import teaPlant01 from "@/public/images/tea-plant-01.jpg";

/** 統一影像色調，讓照片和紙墨版面貼合 */
const tone = "saturate-[.9] contrast-[1.02]";
/** 影像滾動視差（強：滿版／大圖，弱：一般框內圖） */
const par = `object-cover ${tone} parallax`;
const parSoft = `object-cover ${tone} parallax-soft`;

const spec = [
  { k: "海拔", v: "1,200 – 1,450 公尺" },
  { k: "品種", v: "青心烏龍・金萱" },
  { k: "採摘", v: "明前與冬片　清晨手採一心二葉" },
  { k: "製法", v: "日光萎凋・室內靜置・輕發酵" },
];

const reasons = [
  {
    n: "i",
    title: "低溫讓茶樹放慢",
    body: "日夜溫差大、日照時間短，新芽生長趨緩，胺基酸與果膠留在葉裡不被消耗，滋味因此厚實、少苦澀。",
  },
  {
    n: "ii",
    title: "終年雲霧漫射光",
    body: "午後起霧遮去直射陽光，兒茶素轉化較溫和，湯色清亮，花香停在高處而不悶。",
  },
  {
    n: "iii",
    title: "礫質壤土與山泉",
    body: "原始林邊坡排水良好，土層帶礦質，養出乾淨的水質底韻，尾段回甘乾淨俐落。",
  },
  {
    n: "iv",
    title: "當日走水到位",
    body: "露水未乾即採下，當天完成萎凋與靜置。走水透了，才鎖得住高山特有的鮮爽。",
  },
];

const teas = [
  {
    name: "青心烏龍・春摘",
    note: "梔子花香・奶油感・冰糖回甘",
    roast: "輕發酵 25%・未焙火",
    img: teaHarvest02,
  },
  {
    name: "金萱烏龍",
    note: "天然奶香・玉蘭花・口感圓潤",
    roast: "輕發酵 20%・輕焙火",
    img: teaLeaves02,
  },
  {
    name: "冬片蜜香烏龍",
    note: "熟果蜜韻・蔗糖甜・尾韻悠長",
    roast: "中發酵 40%・中焙火",
    img: teaPlant01,
  },
];

const steps = [
  {
    n: "一",
    title: "溫壺醒茶",
    body: "沸水溫熱蓋碗，置茶 3g／150ml。注水後立即倒掉，喚醒條索。",
  },
  {
    n: "二",
    title: "首泡 45 秒",
    body: "水溫 95°C 沿邊緣注入，靜置約 45 秒出湯，先聞香氣頂端。",
  },
  {
    n: "三",
    title: "逐泡遞增",
    body: "第二泡起每泡加 10–15 秒。高山茶耐泡，可穩定沖至六、七泡。",
  },
  {
    n: "四",
    title: "冷泡替代",
    body: "3g 對 500ml 常溫水，冷藏 4–6 小時，甜感清爽、幾乎無澀。",
  },
];

function SectionHead({
  index,
  title,
  lead,
}: {
  index: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="border-t border-ink pt-6">
      <div className="flex items-baseline gap-4">
        <span className="font-serif text-sm text-gold">{index}</span>
        <h2 className="font-serif text-3xl leading-tight text-ink md:text-[2.6rem]">
          {title}
        </h2>
      </div>
      {lead ? <p className="mt-4 max-w-xl text-ink-soft">{lead}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      {/* Hero */}
      <section className={`${wrap} pt-16 pb-14 md:pt-24 md:pb-16`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.35em] text-gold">
              臺灣　嘉義　阿里山
            </p>
            <h1 className="mt-6 font-serif text-4xl leading-[1.14] text-ink sm:text-6xl md:text-7xl">
              霧養的茶園，
              <br />
              慢慢就甘了。
            </h1>
            <p className="mt-8 max-w-md leading-8 text-ink-soft">
              我們只做自家茶區、當季手採的阿里山高山烏龍。一杯茶的風味，
              從一座山的天氣開始——低溫、雲霧、與夠慢的時間。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a
                href="#teas"
                className="bg-ink px-7 py-3 text-sm tracking-[0.15em] text-paper transition-colors hover:bg-pine"
              >
                看當季茶款
              </a>
              <a
                href="#terroir"
                className="group inline-flex items-center gap-2 text-sm tracking-[0.15em] text-ink"
              >
                <span className="border-b border-ink pb-0.5 transition-colors group-hover:border-gold group-hover:text-gold">
                  認識茶區
                </span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none lg:pl-6">
            <figure>
              <div className="relative aspect-[3/4] w-full overflow-hidden ring-1 ring-line">
                <Image
                  src={teaGarden03}
                  alt="沿著山坡整理成一壟一壟的阿里山高山茶園"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  placeholder="blur"
                  className={parSoft}
                />
              </div>
              <figcaption className="mt-2 text-xs tracking-wide text-ink-soft">
                自有茶區・海拔約 1,300 公尺
              </figcaption>
            </figure>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {spec.map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[4.5rem_1fr] gap-4 py-4"
                >
                  <dt className="text-xs tracking-[0.2em] text-ink-soft">
                    {row.k}
                  </dt>
                  <dd className="text-sm text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 影像：茶區風景（雙圖） */}
      <section className={`${wrap} pb-16 md:pb-24`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <figure>
            <div className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-line">
              <Image
                src={teaGarden01}
                alt="順著坡度整理的茶樹壟"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                placeholder="blur"
                className={parSoft}
              />
            </div>
            <figcaption className="mt-2 text-xs tracking-wide text-ink-soft">
              茶園一隅
            </figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-line">
              <Image
                src={teaGarden02}
                alt="整齊成排的茶樹，順著坡度延伸"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                placeholder="blur"
                className={parSoft}
              />
            </div>
            <figcaption className="mt-2 text-xs tracking-wide text-ink-soft">
              晨霧・採摘前
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 大字陳述 */}
      <section className="border-y border-ink bg-paper-dim">
        <div className={`${wrap} py-16 md:py-24`}>
          <div className="grid items-baseline gap-8 md:grid-cols-[auto_1fr] md:gap-14">
            <p className="font-serif text-6xl text-pine md:text-8xl">12°C</p>
            <p className="max-w-xl text-lg leading-9 text-ink-soft">
              阿里山茶區的日夜溫差。入夜的低溫讓茶樹停下腳步，
              把整天累積的養分留在葉子裡不再消耗——這就是高山茶回甘的來源，
              也是重焙火換不來的乾淨。
            </p>
          </div>
        </div>
      </section>

      {/* 01 茶區 */}
      <section id="terroir" className={`${wrap} scroll-mt-20 py-20 md:py-28`}>
        <SectionHead
          index="01"
          title="為什麼是這座山"
          lead="海拔、氣候、土壤與工序，一層層疊出高山茶乾淨明亮、耐泡回甘的特質。"
        />
        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,19rem)_1fr] md:gap-14">
          <figure className="md:sticky md:top-24 md:self-start">
            <div className="relative aspect-[3/4] w-full overflow-hidden ring-1 ring-line">
              <Image
                src={teaHarvest01}
                alt="高山茶樹上剛冒出的新芽，一心二葉"
                fill
                sizes="(max-width: 768px) 100vw, 19rem"
                placeholder="blur"
                className={parSoft}
              />
            </div>
            <figcaption className="mt-2 text-xs tracking-wide text-ink-soft">
              高山茶菁・一心二葉
            </figcaption>
          </figure>

          <div className="grid gap-y-8">
            {reasons.map((r) => (
              <div
                key={r.n}
                className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-line pt-6"
              >
                <span className="font-serif text-gold">{r.n}.</span>
                <div>
                  <h3 className="font-serif text-xl text-ink">{r.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-ink-soft">
                    {r.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 影像：滿版茶田 */}
      <section>
        <div className="relative h-[52vh] min-h-[320px] w-full overflow-hidden md:h-[72vh]">
          <Image
            src={teaGarden04}
            alt="鋪滿整片山坡的高山茶園"
            fill
            sizes="100vw"
            placeholder="blur"
            className={par}
          />
        </div>
        <div className={`${wrap} pt-3`}>
          <p className="text-xs tracking-wide text-ink-soft">
            採收季的茶園　—　同一片山，一天只採得完一小塊。
          </p>
        </div>
      </section>

      {/* 02 茶款 */}
      <section id="teas" className={`${wrap} scroll-mt-20 py-20 md:py-28`}>
        <SectionHead
          index="02"
          title="當季茶款"
          lead="皆為自有茶區、單一批次少量製作。以下是這一季正在製作的品項。"
        />
        <ul className="mt-12 border-y border-line">
          {teas.map((t) => (
            <li key={t.name} className="border-t border-line first:border-t-0">
              <div className="flex items-center gap-4 py-5">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden ring-1 ring-line">
                  <Image
                    src={t.img}
                    alt=""
                    fill
                    sizes="64px"
                    placeholder="blur"
                    className={`object-cover ${tone}`}
                  />
                </span>
                <span className="grid min-w-0 flex-1 gap-1 md:grid-cols-12 md:items-baseline md:gap-4">
                  <span className="font-serif text-xl text-ink md:col-span-4">
                    {t.name}
                  </span>
                  <span className="text-sm text-ink-soft md:col-span-5">
                    {t.note}
                  </span>
                  <span className="text-sm text-ink-soft md:col-span-3">
                    {t.roast}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs tracking-wide text-ink-soft">
          目前尚未開放線上購買。想先認識這一季的茶，歡迎與我們聯繫。
        </p>
      </section>

      {/* 03 沖泡 */}
      <section id="brewing" className={`${wrap} scroll-mt-20 py-20 md:py-28`}>
        <SectionHead
          index="03"
          title="這樣沖，最像它自己"
          lead="蓋碗、瓷壺或冷泡都適合。高山茶耐泡，別急著把它泡淡。"
        />
        <div className="mt-12 grid border-y border-line md:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`border-t border-line py-8 md:border-t-0 md:px-6 md:py-6 ${
                i === 0 ? "md:pl-0" : ""
              } ${i !== 0 ? "md:border-l md:border-line" : ""}`}
            >
              <p className="font-serif text-3xl text-gold">{s.n}</p>
              <h3 className="mt-4 font-serif text-lg text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 茶事 */}
      <section
        id="story"
        className="scroll-mt-20 border-t border-ink bg-pine text-paper"
      >
        <div className={`${wrap} py-20 md:py-28`}>
          <div className="relative mb-14 aspect-[16/10] w-full overflow-hidden ring-1 ring-paper/15 md:aspect-[21/9]">
            <Image
              src={teaLeaves01}
              alt="剛採下、攤開靜置的高山茶菁"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              placeholder="blur"
              className={par}
            />
          </div>

          <p className="text-xs tracking-[0.35em] text-paper/60">茶事</p>
          <blockquote className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed md:text-[2.4rem] md:leading-[1.5]">
            「我們不用重焙火去蓋味道。乾淨的茶菁、走得透的水，
            山自己會說話。」
          </blockquote>
          <p className="mt-8 text-sm tracking-wide text-paper/70">
            — 第三代製茶人・林／署名
          </p>

          <div className="mt-16 grid gap-10 border-t border-paper/20 pt-10 md:grid-cols-2">
            <p className="leading-8 text-paper/80">
              茶園在阿里山鄉，從祖父那一輩開始種茶。海拔高、坡度陡，機械進不來，
              至今仍靠人工採摘與看天製茶。每年只做春、冬兩季，量不多，
              但每一批都看得見地塊、採摘日期與烘焙師。
            </p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm">
              <div>
                <dt className="text-paper/50">茶區位置</dt>
                <dd className="mt-1 text-paper">嘉義縣阿里山鄉</dd>
              </div>
              <div>
                <dt className="text-paper/50">年採摘</dt>
                <dd className="mt-1 text-paper">春、冬兩季</dd>
              </div>
              <div>
                <dt className="text-paper/50">檢驗</dt>
                <dd className="mt-1 text-paper">農藥殘留 388 項</dd>
              </div>
              <div>
                <dt className="text-paper/50">產量</dt>
                <dd className="mt-1 text-paper">年約 300 台斤</dd>
              </div>
            </dl>
          </div>

          <figure className="mt-14">
            <div className="relative aspect-[21/9] w-full overflow-hidden ring-1 ring-paper/15">
              <Image
                src={teaGarden05}
                alt="俯瞰阿里山的高山茶園"
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                placeholder="blur"
                className={par}
              />
            </div>
            <figcaption className="mt-2 text-xs tracking-wide text-paper/50">
              茶園・輪區採摘
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA：有興趣名單 */}
      <section className={`${wrap} py-20 md:py-28`}>
        <div className="border-t border-ink pt-10 md:flex md:items-start md:justify-between md:gap-12">
          <div className="md:max-w-md">
            <h2 className="font-serif text-3xl leading-tight text-ink md:text-[2.6rem]">
              先喝一杯，再說
            </h2>
            <p className="mt-4 text-ink-soft">
              我們正在準備少量的品飲組，還沒開賣。留下 email，
              開賣或有品飲組時，第一時間寄信給你。
            </p>
          </div>
          <InterestForm />
        </div>
      </section>
    </main>
  );
}
