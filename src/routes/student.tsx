import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { STUDENT_QUIZZES } from "@/lib/lookData";

export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "학생 학습 · Look." },
      { name: "description", content: "실제 사례 기반 언어폭력 예방 학습" },
    ],
  }),
  component: StudentPage,
});

function StudentPage() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = STUDENT_QUIZZES[idx];
  const total = STUDENT_QUIZZES.length;

  const pick = (i: number) => {
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
    setIdx(0); setPicked(null); setScore(0); setDone(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav active="student" />

      <main className="mx-auto max-w-2xl px-6 py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">학생 학습</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">우리 학교 사례로 배우기</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          실제로 발생한 상황을 읽고, 가장 좋은 선택을 골라보세요.
        </p>

        {!done ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                {idx + 1} / {total}
              </span>
              <div className="flex gap-1">
                {STUDENT_QUIZZES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-6 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-accent/50 p-4 text-sm leading-relaxed">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-primary">상황</span>
              {q.scenario}
            </div>

            <h2 className="mt-6 text-lg font-bold">{q.question}</h2>

            <div className="mt-4 space-y-2">
              {q.choices.map((c, i) => {
                const isPicked = picked === i;
                const showState = picked !== null;
                const correct = c.correct;
                const cls = !showState
                  ? "hover:border-primary hover:bg-accent/30"
                  : correct
                  ? "border-success bg-success/10"
                  : isPicked
                  ? "border-destructive bg-destructive/10"
                  : "opacity-60";
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className={`w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-left text-sm font-medium transition ${cls}`}
                  >
                    {c.text}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="mt-5 rounded-xl border border-border bg-muted/50 p-4 text-sm">
                <span className="font-bold">{q.choices[picked].correct ? "정답이에요" : "다시 생각해볼까요"}</span>
                <p className="mt-1 text-muted-foreground">{q.choices[picked].feedback}</p>
                <button
                  onClick={next}
                  className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  {idx + 1 >= total ? "결과 보기" : "다음 문제"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">학습 완료</div>
            <div className="mt-4 text-6xl font-bold text-primary">{score} / {total}</div>
            <p className="mt-3 text-sm text-muted-foreground">
              한 사람의 작은 개입이 그룹의 분위기를 바꿉니다.<br />
              오늘 배운 표현을 친구들과 나눠보세요.
            </p>
            <button
              onClick={restart}
              className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              다시 학습하기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
