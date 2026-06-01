import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteNav } from "./SiteNav-DGbDMogW.mjs";
import { S as SCHOOLS, P as PREVENTION_HISTORY, C as CATEGORY_BY_SCHOOL, T as TOP_EXPRESSIONS } from "./lookData-ZpA45Dh_.mjs";
import { R as ResponsiveContainer, P as PieChart, a as Pie, C as Cell, T as Tooltip } from "../_libs/recharts.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const KEY = "look.overrides.v1";
const listeners = /* @__PURE__ */ new Set();
let cache = null;
function read() {
  if (cache) return cache;
  if (typeof window === "undefined") return cache = {};
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    cache = {};
  }
  return cache;
}
function write(next) {
  cache = next;
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}
function setSchoolOverride(schoolId, override) {
  const cur = read();
  write({ ...cur, [schoolId]: { ...cur[schoolId], ...override, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } });
}
function clearSchoolOverride(schoolId) {
  const cur = { ...read() };
  delete cur[schoolId];
  write(cur);
}
function useSchoolData(schoolId) {
  const [, force] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => void listeners.delete(l);
  }, []);
  const o = read()[schoolId] ?? {};
  return {
    expressions: o.expressions ?? TOP_EXPRESSIONS[schoolId] ?? [],
    categories: o.categories ?? CATEGORY_BY_SCHOOL[schoolId] ?? [],
    history: o.history ?? PREVENTION_HISTORY[schoolId] ?? [],
    override: o
  };
}
function parseCSV(text) {
  const rows = [];
  let cur = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') inQ = false;
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") {
        cur.push(field);
        field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        cur.push(field);
        field = "";
        if (cur.some((v) => v.trim() !== "")) rows.push(cur);
        cur = [];
      } else field += c;
    }
  }
  if (field !== "" || cur.length) {
    cur.push(field);
    if (cur.some((v) => v.trim() !== "")) rows.push(cur);
  }
  return rows;
}
function pickCol(headers, names) {
  const norm = headers.map((h) => h.trim().toLowerCase());
  for (const n of names) {
    const i = norm.indexOf(n.toLowerCase());
    if (i >= 0) return i;
  }
  return -1;
}
function inferRisk(v, count) {
  const s = v.trim().toLowerCase();
  if (["high", "높음", "상", "3"].includes(s)) return "high";
  if (["mid", "medium", "중간", "중", "2"].includes(s)) return "mid";
  if (["low", "낮음", "하", "1"].includes(s)) return "low";
  if (count >= 120) return "high";
  if (count >= 60) return "mid";
  return "low";
}
function ingestCSV(text) {
  const rows = parseCSV(text);
  if (rows.length < 2) return { kind: "unknown", rowCount: 0, error: "데이터 행이 없습니다." };
  const headers = rows[0];
  const lower = headers.map((h) => h.trim().toLowerCase());
  if (lower.some((h) => ["대상", "target"].includes(h)) && lower.some((h) => ["시간", "hours"].includes(h))) {
    const tI = pickCol(headers, ["대상", "target"]);
    const hI = pickCol(headers, ["시간", "hours"]);
    const tyI = pickCol(headers, ["유형", "type", "방법"]);
    const history = rows.slice(1).map((r) => ({
      target: r[tI]?.trim() ?? "",
      hours: Number(r[hI]) || 0,
      type: r[tyI]?.trim() ?? "-"
    })).filter((h) => h.target);
    return { kind: "history", history, rowCount: history.length };
  }
  const pI = pickCol(headers, ["phrase", "표현", "expression", "text"]);
  const cI = pickCol(headers, ["category", "카테고리", "유형", "label"]);
  if (pI < 0 || cI < 0) {
    return { kind: "unknown", rowCount: 0, error: "열을 인식하지 못했습니다. (phrase, category 필요)" };
  }
  const rI = pickCol(headers, ["risk", "위험도"]);
  const nI = pickCol(headers, ["count", "빈도", "관측"]);
  const xI = pickCol(headers, ["context", "맥락", "출처"]);
  const expressions = rows.slice(1).map((r) => {
    const count = Number(r[nI]) || 1;
    return {
      phrase: r[pI]?.trim() ?? "",
      category: r[cI]?.trim() ?? "기타",
      risk: inferRisk(rI >= 0 ? r[rI] ?? "" : "", count),
      count,
      context: xI >= 0 ? r[xI]?.trim() ?? "" : "업로드 데이터"
    };
  }).filter((e) => e.phrase);
  const totals = /* @__PURE__ */ new Map();
  for (const e of expressions) totals.set(e.category, (totals.get(e.category) ?? 0) + e.count);
  const sum = Array.from(totals.values()).reduce((a, b) => a + b, 0) || 1;
  const categories = Array.from(totals.entries()).map(([name, value]) => ({ name, value: Math.round(value / sum * 1e3) / 10 })).sort((a, b) => b.value - a.value);
  const topExpressions = [...expressions].sort((a, b) => b.count - a.count).slice(0, 8);
  return { kind: "expressions", expressions: topExpressions, categories, rowCount: expressions.length };
}
const CHART_COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-chart-6)", "var(--color-chart-7)"];
const RISK_LABEL = {
  high: {
    text: "높음",
    cls: "bg-destructive/10 text-destructive"
  },
  mid: {
    text: "중간",
    cls: "bg-warn/20 text-warn-foreground"
  },
  low: {
    text: "낮음",
    cls: "bg-success/15 text-success"
  }
};
function TeacherPage() {
  const [schoolId, setSchoolId] = reactExports.useState(SCHOOLS[0].id);
  const school = SCHOOLS.find((s) => s.id === schoolId);
  const {
    categories,
    expressions,
    history,
    override
  } = useSchoolData(schoolId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, { active: "teacher" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "선생님 대시보드" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-3xl font-bold md:text-4xl", children: school.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            school.region,
            " · 재학생 ",
            school.students.toLocaleString(),
            "명"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: schoolId, onChange: (e) => setSchoolId(e.target.value), className: "rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium", children: SCHOOLS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.name }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UploadPanel, { schoolId, schoolName: school.name, override }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-4 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "수집된 표현", value: expressions.reduce((a, b) => a + b.count, 0).toLocaleString(), sub: "비식별화 처리 완료" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "고위험 표현", value: expressions.filter((e) => e.risk === "high").length.toString(), sub: "즉시 개입 권장", tone: "danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "주요 카테고리", value: categories[0]?.name ?? "-", sub: categories[0] ? `${categories[0].value}%` : "데이터 없음" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "최근 예방교육", value: `${history[0]?.hours ?? 0}시간`, sub: history[0]?.type ?? "-" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "혐오 표현 카테고리 분포" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardSub, { children: "크롤링된 표현을 AI Hub 혐오 데이터 기준으로 분류" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: categories, dataKey: "value", nameKey: "name", innerRadius: 50, outerRadius: 90, paddingAngle: 2, children: categories.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: CHART_COLORS[i % CHART_COLORS.length] }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-card)"
            }, formatter: (v) => `${v}%` })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: categories.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-sm", style: {
              background: CHART_COLORS[i % CHART_COLORS.length]
            } }),
            c.name,
            " ",
            c.value,
            "%"
          ] }, c.name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
            "자주 쓰이는 위험 표현 TOP ",
            expressions.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardSub, { children: "학생 커뮤니티·SNS에서 비식별화 수집된 실제 표현" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-border", children: expressions.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: e.phrase }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md px-2 py-0.5 text-[10px] font-bold ${RISK_LABEL[e.risk].cls}`, children: RISK_LABEL[e.risk].text }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "· ",
                  e.category
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                "맥락 · ",
                e.context
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: e.count }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "관측" })
            ] })
          ] }, e.phrase)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "학교폭력 예방교육 실적" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardSub, { children: "학교알리미 11-가-2 기준" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: history.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: h.target }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: h.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              h.hours,
              "시간"
            ] })
          ] }, h.target)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Generator, { school: school.name, topCategory: categories[0]?.name ?? "혐오 표현", topPhrase: expressions[0]?.phrase ?? "" }) })
      ] })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  sub,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-2xl font-bold ${tone === "danger" ? "text-destructive" : ""}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: sub })
  ] });
}
function Card({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-2xl border border-border bg-card p-6 ${className}`, children });
}
function CardTitle({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold", children });
}
function CardSub({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children });
}
function Generator({
  school,
  topCategory,
  topPhrase
}) {
  const [grade, setGrade] = reactExports.useState("중2");
  const [duration, setDuration] = reactExports.useState("45분");
  const [activity, setActivity] = reactExports.useState("토론 + 퀴즈");
  const [generated, setGenerated] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const lesson = reactExports.useMemo(() => buildLesson({
    school,
    topCategory,
    topPhrase,
    grade,
    duration,
    activity
  }), [school, topCategory, topPhrase, grade, duration, activity]);
  const handle = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 900);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "맞춤 교육 자료 생성" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardSub, { children: "분석 결과와 공공데이터를 바탕으로 LLM이 PPT·퀴즈·활동지를 만듭니다" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "대상 학년", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: grade, onChange: (e) => setGrade(e.target.value), className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm", children: ["초5", "초6", "중1", "중2", "중3", "고1", "고2"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: g }, g)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "수업 시간", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: duration, onChange: (e) => setDuration(e.target.value), className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm", children: ["25분", "45분", "90분"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: g }, g)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "활동 유형", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: activity, onChange: (e) => setActivity(e.target.value), className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm", children: ["강의형", "토론 + 퀴즈", "역할극", "캠페인 제작"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: g }, g)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handle, disabled: loading, className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60", children: loading ? "생성 중…" : generated ? "다시 생성" : "교육 자료 생성" }),
    generated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-primary", children: [
          "PPT 개요 · ",
          lesson.slides.length,
          "슬라이드"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-1 text-lg font-bold", children: lesson.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-3 space-y-2 text-sm", children: lesson.slides.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 shrink-0 text-xs font-bold text-muted-foreground", children: (i + 1).toString().padStart(2, "0") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.body })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-primary", children: [
          "퀴즈 · ",
          lesson.quizzes.length,
          "문항"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-3 text-sm", children: lesson.quizzes.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
            "Q",
            i + 1,
            ". ",
            q.q
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
            "정답 · ",
            q.a
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary", children: "활동지" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: lesson.activity })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: label }),
    children
  ] });
}
function buildLesson({
  school,
  topCategory,
  topPhrase,
  grade,
  duration,
  activity
}) {
  return {
    title: `[${school}] ${grade} 맞춤 언어폭력 예방 수업 (${duration}, ${activity})`,
    slides: [{
      title: "수업 열기",
      body: "최근 우리 학교에서 자주 들리는 표현을 함께 살펴봅니다."
    }, {
      title: `우리 학교의 위험 카테고리: ${topCategory}`,
      body: "데이터로 본 우리 학교에서 가장 자주 등장한 혐오 유형입니다."
    }, {
      title: `사례 분석: "${topPhrase}"`,
      body: "이 표현이 누구를, 어떻게 배제하는지 함께 분석합니다."
    }, {
      title: "감정과 관계 — 왜 우리는 이런 말을 쓸까?",
      body: "보복·분노·재미 — 동기를 짚고, 다른 선택지를 탐색합니다."
    }, {
      title: "역할 바꿔 생각하기",
      body: "듣는 사람의 입장에서 다시 읽고 표현을 바꿔봅니다."
    }, {
      title: "더 나은 표현 만들기 (활동)",
      body: `${activity} 형식으로 대안 표현을 직접 만들어 봅니다.`
    }, {
      title: "다짐과 약속",
      body: "우리 반에서 쓰지 않을 표현 3가지를 함께 정합니다."
    }],
    quizzes: [{
      q: `"${topPhrase}" 표현이 문제인 이유로 가장 적절한 것은?`,
      a: "특정 집단을 비하·배제하는 혐오 표현이기 때문"
    }, {
      q: "친구가 ‘그냥 농담’이라며 혐오 표현을 쓸 때 가장 적절한 반응은?",
      a: "그 표현이 누군가에게 상처가 될 수 있다고 말한다"
    }, {
      q: "사이버 언어폭력을 목격했을 때 방관의 영향은?",
      a: "피해자에게는 동의로 느껴져 피해가 커진다"
    }],
    activity: `모둠별로 우리 학교에서 자주 쓰이는 표현 5개를 적고, 그 중 ${topCategory} 카테고리에 해당하는 표현을 골라 ‘대체 표현 카드’를 만듭니다. 카드는 복도에 게시해 캠페인으로 확장합니다.`
  };
}
function UploadPanel({
  schoolId,
  schoolName,
  override
}) {
  const fileRef = reactExports.useRef(null);
  const [msg, setMsg] = reactExports.useState(null);
  const handleFile = async (file) => {
    setMsg(null);
    try {
      const text = await file.text();
      const result = ingestCSV(text);
      if (result.kind === "unknown") {
        setMsg({
          kind: "err",
          text: result.error ?? "인식할 수 없는 CSV입니다."
        });
        return;
      }
      const patch = result.kind === "expressions" ? {
        expressions: result.expressions,
        categories: result.categories,
        source: file.name
      } : {
        history: result.history,
        source: file.name
      };
      setSchoolOverride(schoolId, patch);
      setMsg({
        kind: "ok",
        text: result.kind === "expressions" ? `표현 ${result.rowCount}건을 분석에 반영했습니다. (TOP ${result.expressions?.length ?? 0} · 카테고리 ${result.categories?.length ?? 0}종)` : `예방교육 실적 ${result.rowCount}건을 반영했습니다.`
      });
    } catch (e) {
      setMsg({
        kind: "err",
        text: e instanceof Error ? e.message : "파일을 읽지 못했습니다."
      });
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "데이터 업로드" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-1 text-base font-bold", children: [
          schoolName,
          " 분석 데이터 연결"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          "CSV (",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "phrase, category, risk, count, context" }),
          ") 또는 학교알리미 예방교육 실적 (",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "대상, 시간, 유형" }),
          ")을 업로드하면 즉시 차트·통계에 반영됩니다."
        ] }),
        override.updatedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-success", children: [
          "● 연결됨 · ",
          override.source ?? "업로드",
          " · ",
          new Date(override.updatedAt).toLocaleString("ko-KR")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: ".csv,text/csv", className: "hidden", onChange: (e) => e.target.files?.[0] && handleFile(e.target.files[0]) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => fileRef.current?.click(), className: "rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90", children: "CSV 업로드" }),
        override.updatedAt && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          clearSchoolOverride(schoolId);
          setMsg(null);
        }, className: "rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted", children: "초기화" })
      ] })
    ] }),
    msg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-3 rounded-lg px-3 py-2 text-xs ${msg.kind === "ok" ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive"}`, children: msg.text })
  ] });
}
export {
  TeacherPage as component
};
