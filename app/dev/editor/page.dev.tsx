// 로컬 전용 딥다이브 편집기 목록: /dev/editor
// next dev에서만 열리고 프로덕션 빌드에서는 404
import Link from "next/link";
import { notFound } from "next/navigation";
import { deepDives } from "@/lib/deepdive-content";

export default function DevEditorIndexPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <h1 className="text-2xl font-bold">딥다이브 편집기</h1>
      {Object.entries(deepDives).map(([projectId, deepDive]) => (
        <section key={projectId} className="space-y-2">
          <h2 className="text-lg font-semibold">{projectId}</h2>
          <ul>
            {deepDive.topics.map((topic) => (
              <li key={topic.id}>
                <Link
                  href={`/dev/editor/${projectId}/${topic.id}`}
                  className="inline-flex min-h-11 items-center rounded-md px-2 text-sm text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
