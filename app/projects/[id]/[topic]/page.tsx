// 딥다이브 토픽 라우트: /projects/[id]/[topic]
// 프로젝트별 딥다이브 페이지로 분기합니다.
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { phantomFileDeepDive } from "@/data/projects/phantomfile-data";
import { PhantomFileDeepDivePage } from "@/features/projects/phantom-file/PhantomFileDeepDivePage";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string; topic: string }>;
}

// 딥다이브 데이터 매핑 (프로젝트 추가 시 여기에 추가)
const deepDiveMap: Record<string, { topics: { id: string; title: string }[] }> =
  {
    "phantom-file": phantomFileDeepDive,
  };

export async function generateStaticParams() {
  const params: { id: string; topic: string }[] = [];

  for (const [projectId, data] of Object.entries(deepDiveMap)) {
    for (const topic of data.topics) {
      params.push({ id: projectId, topic: topic.id });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, topic: topicId } = await params;
  const data = deepDiveMap[id];
  if (!data) return {};

  const topic = data.topics.find((t) => t.id === topicId);
  if (!topic) return {};

  return {
    title: `${topic.title} | Deep Dive`,
    description: `${topic.title} - 기술적 의사결정과 구현 과정을 상세히 다룹니다.`,
  };
}

export default async function DeepDiveTopicPage({ params }: PageProps) {
  const { id, topic: topicId } = await params;

  // 현재는 phantom-file만 지원 (프로젝트 추가 시 switch 분기)
  if (id === "phantom-file") {
    const validTopicIds = phantomFileDeepDive.topics.map((t) => t.id);
    if (!validTopicIds.includes(topicId)) notFound();

    return (
      <Suspense>
        <PhantomFileDeepDivePage topicId={topicId} />
      </Suspense>
    );
  }

  notFound();
}
