// Client-side store: lets users upload CSV / 학교알리미 data and
// override the mock dataset in src/lib/lookData.ts for the current session.
import { useEffect, useState } from "react";
import {
  CATEGORY_BY_SCHOOL,
  PREVENTION_HISTORY,
  TOP_EXPRESSIONS,
  type CategoryDatum,
  type Expression,
} from "./lookData";

export type SchoolOverride = {
  expressions?: Expression[];
  categories?: CategoryDatum[];
  history?: { target: string; hours: number; type: string }[];
  updatedAt?: string;
  source?: string; // file name
};

type Store = Record<string, SchoolOverride>;

const KEY = "look.overrides.v1";
const listeners = new Set<() => void>();
let cache: Store | null = null;

function read(): Store {
  if (cache) return cache;
  if (typeof window === "undefined") return (cache = {});
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Store;
  } catch {
    cache = {};
  }
  return cache!;
}

function write(next: Store) {
  cache = next;
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

export function setSchoolOverride(schoolId: string, override: SchoolOverride) {
  const cur = read();
  write({ ...cur, [schoolId]: { ...cur[schoolId], ...override, updatedAt: new Date().toISOString() } });
}

export function clearSchoolOverride(schoolId: string) {
  const cur = { ...read() };
  delete cur[schoolId];
  write(cur);
}

export function useSchoolData(schoolId: string) {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => void listeners.delete(l);
  }, []);
  const o = read()[schoolId] ?? {};
  return {
    expressions: o.expressions ?? TOP_EXPRESSIONS[schoolId] ?? [],
    categories: o.categories ?? CATEGORY_BY_SCHOOL[schoolId] ?? [],
    history: o.history ?? PREVENTION_HISTORY[schoolId] ?? [],
    override: o,
  };
}

// ---------- CSV parsing ----------

// Minimal CSV parser supporting quoted fields and commas inside quotes.
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQ = false;
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { cur.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        cur.push(field); field = "";
        if (cur.some((v) => v.trim() !== "")) rows.push(cur);
        cur = [];
      } else field += c;
    }
  }
  if (field !== "" || cur.length) { cur.push(field); if (cur.some((v) => v.trim() !== "")) rows.push(cur); }
  return rows;
}

function pickCol(headers: string[], names: string[]) {
  const norm = headers.map((h) => h.trim().toLowerCase());
  for (const n of names) {
    const i = norm.indexOf(n.toLowerCase());
    if (i >= 0) return i;
  }
  return -1;
}

function inferRisk(v: string, count: number): "high" | "mid" | "low" {
  const s = v.trim().toLowerCase();
  if (["high", "높음", "상", "3"].includes(s)) return "high";
  if (["mid", "medium", "중간", "중", "2"].includes(s)) return "mid";
  if (["low", "낮음", "하", "1"].includes(s)) return "low";
  if (count >= 120) return "high";
  if (count >= 60) return "mid";
  return "low";
}

export type CSVParseResult = {
  kind: "expressions" | "history" | "unknown";
  expressions?: Expression[];
  categories?: CategoryDatum[];
  history?: { target: string; hours: number; type: string }[];
  rowCount: number;
  error?: string;
};

export function ingestCSV(text: string): CSVParseResult {
  const rows = parseCSV(text);
  if (rows.length < 2) return { kind: "unknown", rowCount: 0, error: "데이터 행이 없습니다." };
  const headers = rows[0];
  const lower = headers.map((h) => h.trim().toLowerCase());

  // 학교알리미: 예방교육 실적 (target, hours, type)
  if (lower.some((h) => ["대상", "target"].includes(h)) && lower.some((h) => ["시간", "hours"].includes(h))) {
    const tI = pickCol(headers, ["대상", "target"]);
    const hI = pickCol(headers, ["시간", "hours"]);
    const tyI = pickCol(headers, ["유형", "type", "방법"]);
    const history = rows.slice(1).map((r) => ({
      target: r[tI]?.trim() ?? "",
      hours: Number(r[hI]) || 0,
      type: r[tyI]?.trim() ?? "-",
    })).filter((h) => h.target);
    return { kind: "history", history, rowCount: history.length };
  }

  // 표현 데이터 (phrase, category, risk, count, context)
  const pI = pickCol(headers, ["phrase", "표현", "expression", "text"]);
  const cI = pickCol(headers, ["category", "카테고리", "유형", "label"]);
  if (pI < 0 || cI < 0) {
    return { kind: "unknown", rowCount: 0, error: "열을 인식하지 못했습니다. (phrase, category 필요)" };
  }
  const rI = pickCol(headers, ["risk", "위험도"]);
  const nI = pickCol(headers, ["count", "빈도", "관측"]);
  const xI = pickCol(headers, ["context", "맥락", "출처"]);

  const expressions: Expression[] = rows.slice(1).map((r) => {
    const count = Number(r[nI]) || 1;
    return {
      phrase: r[pI]?.trim() ?? "",
      category: r[cI]?.trim() ?? "기타",
      risk: inferRisk(rI >= 0 ? (r[rI] ?? "") : "", count),
      count,
      context: xI >= 0 ? (r[xI]?.trim() ?? "") : "업로드 데이터",
    };
  }).filter((e) => e.phrase);

  // Aggregate categories by total count -> percentage
  const totals = new Map<string, number>();
  for (const e of expressions) totals.set(e.category, (totals.get(e.category) ?? 0) + e.count);
  const sum = Array.from(totals.values()).reduce((a, b) => a + b, 0) || 1;
  const categories: CategoryDatum[] = Array.from(totals.entries())
    .map(([name, value]) => ({ name, value: Math.round((value / sum) * 1000) / 10 }))
    .sort((a, b) => b.value - a.value);

  const topExpressions = [...expressions].sort((a, b) => b.count - a.count).slice(0, 8);

  return { kind: "expressions", expressions: topExpressions, categories, rowCount: expressions.length };
}
