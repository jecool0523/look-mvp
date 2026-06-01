import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteNav } from "./SiteNav-DGbDMogW.mjs";
import { a as STUDENT_QUIZZES } from "./lookData-ZpA45Dh_.mjs";
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
function StudentPage() {
  const [idx, setIdx] = reactExports.useState(0);
  const [picked, setPicked] = reactExports.useState(null);
  const [score, setScore] = reactExports.useState(0);
  const [done, setDone] = reactExports.useState(false);
  const q = STUDENT_QUIZZES[idx];
  const total = STUDENT_QUIZZES.length;
  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (q.choices[i].correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (idx + 1 >= total) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };
  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, { active: "student" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-2xl px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "학생 학습" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-3xl font-bold md:text-4xl", children: "우리 학교 사례로 배우기" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "실제로 발생한 상황을 읽고, 가장 좋은 선택을 골라보세요." }),
      !done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
            idx + 1,
            " / ",
            total
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: STUDENT_QUIZZES.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-6 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}` }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl bg-accent/50 p-4 text-sm leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-primary", children: "상황" }),
          q.scenario
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-lg font-bold", children: q.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: q.choices.map((c, i) => {
          const isPicked = picked === i;
          const showState = picked !== null;
          const correct = c.correct;
          const cls = !showState ? "hover:border-primary hover:bg-accent/30" : correct ? "border-success bg-success/10" : isPicked ? "border-destructive bg-destructive/10" : "opacity-60";
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => pick(i), className: `w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-left text-sm font-medium transition ${cls}`, children: c.text }, i);
        }) }),
        picked !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl border border-border bg-muted/50 p-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: q.choices[picked].correct ? "정답이에요" : "다시 생각해볼까요" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: q.choices[picked].feedback }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: next, className: "mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90", children: idx + 1 >= total ? "결과 보기" : "다음 문제" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-card p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "학습 완료" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-6xl font-bold text-primary", children: [
          score,
          " / ",
          total
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
          "한 사람의 작은 개입이 그룹의 분위기를 바꿉니다.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "오늘 배운 표현을 친구들과 나눠보세요."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: restart, className: "mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90", children: "다시 학습하기" })
      ] })
    ] })
  ] });
}
export {
  StudentPage as component
};
