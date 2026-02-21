// 라우트 진입점: id 검증 및 메타데이터 생성만 담당합니다.
// 실제 렌더링은 ProjectPage → 각 프로젝트 컴포넌트로 위임합니다.
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { generateProjectMetadata } from "@/lib/seo-utils";
import { ProjectPage } from "@/features/projects/ProjectPage";
import { isValidProjectId, PROJECT_IDS } from "@/features/projects/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECT_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return generateProjectMetadata(id);
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!isValidProjectId(id)) notFound();

  return (
    <Suspense>
      <ProjectPage id={id} />
    </Suspense>
  );
}
