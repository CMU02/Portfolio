// 로컬 전용 딥다이브 토픽 편집: /dev/editor/[id]/[topic]
// 편집기 JS는 이 라우트에서만 참조된다 (공개 페이지에서 import 금지)
import { notFound } from "next/navigation";
import { DeepDiveEditor } from "@/components/dev-editor/DeepDiveEditor";
import { findTopic, loadTopicContent } from "@/lib/deepdive-content";

interface PageProps {
  params: Promise<{ id: string; topic: string }>;
}

export default async function DevEditorTopicPage({ params }: PageProps) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { id, topic } = await params;
  const found = findTopic(id, topic);
  if (!found) notFound();

  const { doc } = await loadTopicContent(id, topic);

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-12">
      <h1 className="text-2xl font-bold">{found.topic.title}</h1>
      <DeepDiveEditor projectId={id} topicId={topic} initialDoc={doc} />
    </main>
  );
}
