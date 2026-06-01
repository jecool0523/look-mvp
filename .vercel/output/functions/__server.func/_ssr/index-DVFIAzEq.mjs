import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as NATIONAL_STATS, M as MOTIVE_DATA } from "./lookData-ZuqCrwjH.mjs";
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
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 pt-20 pb-24 md:pt-32 md:pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
          "제 8회 교육 공공데이터 AI 활용 대회 · TEAM 모나드"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-primary" })
          ] }),
          "100% 실제 학생 사용 데이터 연동"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl", children: [
        "학교마다 필요한",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "언어 교육은 다릅니다." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl", children: "Look.은 학생들이 실제로 쓰는 언어를 분석해 학교별 위험 표현을 찾아내고, 그에 맞는 예방 교육 자료를 자동으로 생성합니다." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher", className: "inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90", children: "선생님으로 시작하기 →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student", className: "inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted", children: "학생 학습 체험" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-card px-6 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-bold md:text-4xl", children: "학생들의 언어폭력은 매일 심각해지고 있습니다" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: NATIONAL_STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-muted-foreground", children: [
          "0",
          i + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-5xl font-bold text-primary", children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm font-semibold", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: s.desc })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-xs text-muted-foreground", children: "출처 · KOSIS 2025 사이버 폭력 실태 조사" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Problem" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 text-3xl font-bold md:text-4xl", children: [
        "학생들의 가해 이유는 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "‘몰라서’" }),
        "가 아닙니다"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-muted-foreground", children: "현재 영상 시청 중심의 예방교육은 가해 학생들에게 유의미한 영향을 주지 못합니다. 가해 동기 데이터를 보면 — 보복, 분노, 이유 없음, 재미 등 감정과 관계 갈등에서 시작됩니다." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-3", children: MOTIVE_DATA.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 text-sm font-medium", children: m.motive }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 flex-1 overflow-hidden rounded-lg bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full items-center justify-end pr-3 text-xs font-semibold text-primary-foreground", style: {
          width: `${m.value / 40 * 100}%`,
          backgroundColor: "var(--color-primary)"
        }, children: [
          m.value,
          "%"
        ] }) })
      ] }, m.motive)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-accent/40 px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Solution" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-bold md:text-4xl", children: "학생들의 실제 언어를 분석합니다" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: [{
        step: "01",
        title: "언어 데이터 수집",
        desc: "학교별 커뮤니티·SNS 게시글에서 실제 표현을 비식별화 수집합니다."
      }, {
        step: "02",
        title: "혐오표현 분석",
        desc: "AI Hub 혐오 데이터로 학습된 모델로 유형·위험도를 분류합니다."
      }, {
        step: "03",
        title: "맞춤 교육 생성",
        desc: "LLM이 학교별 예방 교육 자료(PPT·퀴즈·활동지)를 생성합니다."
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-primary", children: c.step }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-lg font-bold", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: c.desc })
      ] }, c.step)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold md:text-4xl", children: [
        "감에 의존하던 예방교육에서",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "데이터 기반 대응으로."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher", className: "rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90", children: "선생님 대시보드" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student", className: "rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted", children: "학생 학습" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border px-6 py-10 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "© 2026 TEAM 모나드 · Look." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "데이터 · KOSIS 사이버폭력 실태조사 / 학교알리미 예방교육 실적" })
    ] }) })
  ] });
}
function Nav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border bg-background/80 px-6 py-4 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-5xl items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold tracking-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground", children: "L" }),
      "Look",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher", className: "rounded-lg px-3 py-2 hover:bg-muted", children: "선생님" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student", className: "rounded-lg px-3 py-2 hover:bg-muted", children: "학생" })
    ] })
  ] }) });
}
export {
  Landing as component
};
