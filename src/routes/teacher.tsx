import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SiteNav } from "@/components/SiteNav";
import { SCHOOLS } from "@/lib/lookData";
import {
  clearSchoolOverride,
  ingestCSV,
  setSchoolOverride,
  useSchoolData,
} from "@/lib/lookStore";

export const Route = createFileRoute("/teacher")({
  head: () => ({
    meta: [
      { title: "선생님 대시보드 · Look." },
      { name: "description", content: "학교별 언어폭력 분석과 맞춤 교육 자료 생성" },
    ],
  }),
  component: TeacherPage,
});

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
  "var(--color-chart-7)",
];

const RISK_LABEL: Record<string, { text: string; cls: string }> = {
  high: { text: "높음", cls: "bg-destructive/10 text-destructive" },
  mid: { text: "중간", cls: "bg-warn/20 text-warn-foreground" },
  low: { text: "낮음", cls: "bg-success/15 text-success" },
};

function TeacherPage() {
  const [schoolId, setSchoolId] = useState(SCHOOLS[0].id);
  const school = SCHOOLS.find((s) => s.id === schoolId)!;
  const { categories, expressions, history, override } = useSchoolData(schoolId);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav active="teacher" />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              선생님 대시보드
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">{school.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {school.region} · 재학생 {school.students.toLocaleString()}명
            </p>
          </div>
          <select
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium"
          >
            {SCHOOLS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <UploadPanel schoolId={schoolId} schoolName={school.name} override={override} />

        {/* Top stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="수집된 표현" value={expressions.reduce((a, b) => a + b.count, 0).toLocaleString()} sub="비식별화 처리 완료" />
          <StatCard label="고위험 표현" value={expressions.filter((e) => e.risk === "high").length.toString()} sub="즉시 개입 권장" tone="danger" />
          <StatCard label="주요 카테고리" value={categories[0]?.name ?? "-"} sub={categories[0] ? `${categories[0].value}%` : "데이터 없음"} />
          <StatCard label="최근 예방교육" value={`${history[0]?.hours ?? 0}시간`} sub={history[0]?.type ?? "-"} />
        </div>

        {/* Analysis */}
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardTitle>혐오 표현 카테고리 분포</CardTitle>
            <CardSub>크롤링된 표현을 AI Hub 혐오 데이터 기준으로 분류</CardSub>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {categories.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-card)",
                    }}
                    formatter={(v: number) => `${v}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((c, i) => (
                <div key={c.name} className="flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs">
                  <span className="h-2 w-2 rounded-sm" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  {c.name} {c.value}%
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-3">
            <CardTitle>자주 쓰이는 위험 표현 TOP {expressions.length}</CardTitle>
            <CardSub>학생 커뮤니티·SNS에서 비식별화 수집된 실제 표현</CardSub>
            <div className="mt-4 divide-y divide-border">
              {expressions.map((e) => (
                <div key={e.phrase} className="flex items-start gap-4 py-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{e.phrase}</span>
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${RISK_LABEL[e.risk].cls}`}>
                        {RISK_LABEL[e.risk].text}
                      </span>
                      <span className="text-xs text-muted-foreground">· {e.category}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">맥락 · {e.context}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{e.count}</div>
                    <div className="text-[10px] text-muted-foreground">관측</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Prevention history + generator */}
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardTitle>학교폭력 예방교육 실적</CardTitle>
            <CardSub>학교알리미 11-가-2 기준</CardSub>
            <div className="mt-4 space-y-2">
              {history.map((h) => (
                <div key={h.target} className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-sm">
                  <span className="font-medium">{h.target}</span>
                  <span className="text-muted-foreground">{h.type}</span>
                  <span className="font-semibold">{h.hours}시간</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-3">
            <Generator school={school.name} topCategory={categories[0].name} topPhrase={expressions[0]?.phrase ?? ""} />
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, sub, tone }: { label: string; value: string; sub: string; tone?: "danger" }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className={`mt-2 text-2xl font-bold ${tone === "danger" ? "text-destructive" : ""}`}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-border bg-card p-6 ${className}`}>{children}</div>;
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-bold">{children}</h3>;
}
function CardSub({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-muted-foreground">{children}</p>;
}

function Generator({ school, topCategory, topPhrase }: { school: string; topCategory: string; topPhrase: string }) {
  const [grade, setGrade] = useState("중2");
  const [duration, setDuration] = useState("45분");
  const [activity, setActivity] = useState("토론 + 퀴즈");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const lesson = useMemo(() => buildLesson({ school, topCategory, topPhrase, grade, duration, activity }), [school, topCategory, topPhrase, grade, duration, activity]);

  const handle = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 900);
  };

  return (
    <div>
      <CardTitle>맞춤 교육 자료 생성</CardTitle>
      <CardSub>분석 결과와 공공데이터를 바탕으로 LLM이 PPT·퀴즈·활동지를 만듭니다</CardSub>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Field label="대상 학년">
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
            {["초5", "초6", "중1", "중2", "중3", "고1", "고2"].map((g) => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="수업 시간">
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
            {["25분", "45분", "90분"].map((g) => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="활동 유형">
          <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
            {["강의형", "토론 + 퀴즈", "역할극", "캠페인 제작"].map((g) => <option key={g}>{g}</option>)}
          </select>
        </Field>
      </div>

      <button
        onClick={handle}
        disabled={loading}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "생성 중…" : generated ? "다시 생성" : "교육 자료 생성"}
      </button>

      {generated && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="text-xs font-semibold text-primary">PPT 개요 · {lesson.slides.length}슬라이드</div>
            <h4 className="mt-1 text-lg font-bold">{lesson.title}</h4>
            <ol className="mt-3 space-y-2 text-sm">
              {lesson.slides.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 shrink-0 text-xs font-bold text-muted-foreground">{(i + 1).toString().padStart(2, "0")}</span>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.body}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border border-border bg-background p-5">
            <div className="text-xs font-semibold text-primary">퀴즈 · {lesson.quizzes.length}문항</div>
            <ul className="mt-3 space-y-3 text-sm">
              {lesson.quizzes.map((q, i) => (
                <li key={i}>
                  <div className="font-semibold">Q{i + 1}. {q.q}</div>
                  <div className="mt-1 text-xs text-muted-foreground">정답 · {q.a}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-background p-5">
            <div className="text-xs font-semibold text-primary">활동지</div>
            <p className="mt-2 text-sm">{lesson.activity}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function buildLesson({ school, topCategory, topPhrase, grade, duration, activity }: { school: string; topCategory: string; topPhrase: string; grade: string; duration: string; activity: string }) {
  return {
    title: `[${school}] ${grade} 맞춤 언어폭력 예방 수업 (${duration}, ${activity})`,
    slides: [
      { title: "수업 열기", body: "최근 우리 학교에서 자주 들리는 표현을 함께 살펴봅니다." },
      { title: `우리 학교의 위험 카테고리: ${topCategory}`, body: "데이터로 본 우리 학교에서 가장 자주 등장한 혐오 유형입니다." },
      { title: `사례 분석: \"${topPhrase}\"`, body: "이 표현이 누구를, 어떻게 배제하는지 함께 분석합니다." },
      { title: "감정과 관계 — 왜 우리는 이런 말을 쓸까?", body: "보복·분노·재미 — 동기를 짚고, 다른 선택지를 탐색합니다." },
      { title: "역할 바꿔 생각하기", body: "듣는 사람의 입장에서 다시 읽고 표현을 바꿔봅니다." },
      { title: "더 나은 표현 만들기 (활동)", body: `${activity} 형식으로 대안 표현을 직접 만들어 봅니다.` },
      { title: "다짐과 약속", body: "우리 반에서 쓰지 않을 표현 3가지를 함께 정합니다." },
    ],
    quizzes: [
      { q: `\"${topPhrase}\" 표현이 문제인 이유로 가장 적절한 것은?`, a: "특정 집단을 비하·배제하는 혐오 표현이기 때문" },
      { q: "친구가 ‘그냥 농담’이라며 혐오 표현을 쓸 때 가장 적절한 반응은?", a: "그 표현이 누군가에게 상처가 될 수 있다고 말한다" },
      { q: "사이버 언어폭력을 목격했을 때 방관의 영향은?", a: "피해자에게는 동의로 느껴져 피해가 커진다" },
    ],
    activity: `모둠별로 우리 학교에서 자주 쓰이는 표현 5개를 적고, 그 중 ${topCategory} 카테고리에 해당하는 표현을 골라 ‘대체 표현 카드’를 만듭니다. 카드는 복도에 게시해 캠페인으로 확장합니다.`,
  };
}
