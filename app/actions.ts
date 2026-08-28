"use server";

import { promises as fs } from "node:fs";
import path from "node:path";

export type InterestState = {
  status: "idle" | "ok" | "error";
  message: string;
};

const LIST_PATH = path.join(process.cwd(), "interest-list.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Entry = { email: string; note: string; at: string };

async function readList(): Promise<Entry[]> {
  try {
    const raw = await fs.readFile(LIST_PATH, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as Entry[]) : [];
  } catch {
    return [];
  }
}

export async function joinInterestList(
  _prev: InterestState,
  formData: FormData,
): Promise<InterestState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const note = String(formData.get("note") ?? "").trim().slice(0, 500);

  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "請輸入正確的 email。" };
  }

  const list = await readList();
  if (list.some((e) => e.email === email)) {
    return { status: "ok", message: "你已經在名單上了，我們有消息會通知你。" };
  }

  list.push({ email, note, at: new Date().toISOString() });

  try {
    await fs.writeFile(LIST_PATH, JSON.stringify(list, null, 2) + "\n", "utf8");
  } catch {
    return { status: "error", message: "暫時無法送出，請稍後再試。" };
  }

  return { status: "ok", message: "收到了！開賣或有品飲組時會寄信給你。" };
}
