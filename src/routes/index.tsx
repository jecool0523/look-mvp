import { createFileRoute, Link } from "@tanstack/react-router";
import { NATIONAL_STATS, MOTIVE_DATA } from "@/lib/lookData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Look. — 학교별 맞춤형 언어폭력 예방 교육" },
      { name: "description", content: "학생들의 실제 언어를 분석해 학교별 맞춤 예방 교육을 제공합니다." },
      { property: "og:title", content: "Look. — 학교별 맞춤형 언어폭력 예방 교육" },
      { property: "og:description", content: "감에 의존하던 예방교육에서 데이터 기반 대응으로." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="px-6 pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              제 8회 교육 공공데이터 AI 활용 대회 · TEAM 모나드
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              100% 실제 학생 사용 데이터 연동
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            학교마다 필요한<br />
            <span className="text-primary">언어 교육은 다릅니다.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Look.은 학생들이 실제로 쓰는 언어를 분석해
            학교별 위험 표현을 찾아내고, 그에 맞는 예방 교육 자료를 자동으로 생성합니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/teacher"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              선생님으로 시작하기 →
            </Link>
            <Link
              to="/student"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              학생 학습 체험
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Background</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            학생들의 언어폭력은 매일 심각해지고 있습니다
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {NATIONAL_STATS.map((s, i) => (
              <div key={i} className="rounded-2xl border border-border bg-background p-7">
                <div className="text-xs font-semibold text-muted-foreground">0{i + 1}</div>
                <div className="mt-4 text-5xl font-bold text-primary">{s.value}</div>
                <div className="mt-3 text-sm font-semibold">{s.label}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            출처 · KOSIS 2025 사이버 폭력 실태 조사
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Problem</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            학생들의 가해 이유는 <span className="text-primary">‘몰라서’</span>가 아닙니다
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            현재 영상 시청 중심의 예방교육은 가해 학생들에게 유의미한 영향을 주지 못합니다.
            가해 동기 데이터를 보면 — 보복, 분노, 이유 없음, 재미 등 감정과 관계 갈등에서 시작됩니다.
          </p>
          <div className="mt-10 space-y-3">
            {MOTIVE_DATA.map((m) => (
              <div key={m.motive} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium">{m.motive}</div>
                <div className="h-9 flex-1 overflow-hidden rounded-lg bg-muted">
                  <div
                    className="flex h-full items-center justify-end pr-3 text-xs font-semibold text-primary-foreground"
                    style={{ width: `${(m.value / 40) * 100}%`, backgroundColor: "var(--color-primary)" }}
                  >
                    {m.value}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-accent/40 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Solution</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            학생들의 실제 언어를 분석합니다
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "언어 데이터 수집", desc: "학교별 커뮤니티·SNS 게시글에서 실제 표현을 비식별화 수집합니다." },
              { step: "02", title: "혐오표현 분석", desc: "AI Hub 혐오 데이터로 학습된 모델로 유형·위험도를 분류합니다." },
              { step: "03", title: "맞춤 교육 생성", desc: "LLM이 학교별 예방 교육 자료(PPT·퀴즈·활동지)를 생성합니다." },
            ].map((c) => (
              <div key={c.step} className="rounded-2xl border border-border bg-card p-7">
                <div className="text-xs font-semibold text-primary">{c.step}</div>
                <h3 className="mt-3 text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">감에 의존하던 예방교육에서<br />데이터 기반 대응으로.</h2>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/teacher" className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              선생님 대시보드
            </Link>
            <Link to="/student" className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted">
              학생 학습
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div>© 2026 TEAM 모나드 · Look.</div>
          <div>데이터 · KOSIS 사이버폭력 실태조사 / 학교알리미 예방교육 실적</div>
        </div>
      </footer>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">L</span>
          Look<span className="text-primary">.</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link to="/teacher" className="rounded-lg px-3 py-2 hover:bg-muted">선생님</Link>
          <Link to="/student" className="rounded-lg px-3 py-2 hover:bg-muted">학생</Link>
        </nav>
      </div>
    </header>
  );
}
