import { Link } from "@tanstack/react-router";

export function SiteNav({ active }: { active?: "teacher" | "student" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">L</span>
          Look<span className="text-primary">.</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/teacher"
            className={`rounded-lg px-3 py-2 ${active === "teacher" ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted"}`}
          >
            선생님
          </Link>
          <Link
            to="/student"
            className={`rounded-lg px-3 py-2 ${active === "student" ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted"}`}
          >
            학생
          </Link>
        </nav>
      </div>
    </header>
  );
}
