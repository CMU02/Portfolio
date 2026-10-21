// 딥다이브 토픽 라우트: /projects/[id]/[topic]
// 레지스트리(deepDives)에 있는 토픽만 정적 생성하고 공통 템플릿으로 렌더링합니다.
import { notFound } from "next/navigation";
import { deepDives, findTopic } from "@/lib/deepdive-content";
import { DeepDivePage } from "@/features/projects/DeepDivePage";
import type { ProjectId } from "@/features/projects/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string; topic: string }>;
}

// 빌드 시 생성된 경로 외에는 404 (런타임 fs 읽기 방지)
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.entries(deepDives).flatMap(([id, d]) =>
    d.topics.map((t) => ({ id, topic: t.id })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, topic: topicId } = await params;
  const found = findTopic(id, topicId);
  if (!found) return {};

  return {
    title: `${found.topic.title} | Deep Dive`,
    description: `${found.topic.title} - 기술적 의사결정과 구현 과정을 상세히 다룹니다.`,
  };
}

export default async function DeepDiveTopicPage({ params }: PageProps) {
  const { id, topic } = await params;
  if (!findTopic(id, topic)) notFound();

  return <DeepDivePage projectId={id as ProjectId} topicId={topic} />;
}
