import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
function SiteNav({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border bg-background/80 px-6 py-4 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold tracking-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground", children: "L" }),
      "Look",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/teacher",
          className: `rounded-lg px-3 py-2 ${active === "teacher" ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted"}`,
          children: "선생님"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/student",
          className: `rounded-lg px-3 py-2 ${active === "student" ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted"}`,
          children: "학생"
        }
      )
    ] })
  ] }) });
}
export {
  SiteNav as S
};
