import type { Metadata } from "next";
import { Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LuckyDraw from "./components/LuckyDraw";
import WelcomeGate from "./components/WelcomeGate";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
  display: "swap",
  preload: false,
});

const notoSansTC = Noto_Sans_TC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "茶香花園茶園 · 阿里山高山烏龍",
  description:
    "阿里山海拔 1,200 公尺以上的自有茶區，青心烏龍與金萱，清晨手採、日光萎凋、輕發酵。認識我們的茶區、茶款與沖泡方式。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSerifTC.variable} ${notoSansTC.variable} h-full`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-paper text-ink antialiased">
        <WelcomeGate />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <LuckyDraw />
      </body>
    </html>
  );
}
