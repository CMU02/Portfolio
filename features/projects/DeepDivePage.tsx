// 딥다이브 공통 템플릿 (서버 컴포넌트)
// 본문은 Tiptap JSON을 서버에서 정적 렌더링하고, 목차/스크롤 감지만 클라이언트로 내립니다.
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import {
  TopicSidebar,
  SubInfoPanel,
  HighlightCards,
  MobileTopicNav,
  RichText,
} from "@/components/deepdive";
import { projectsData } from "@/data/projects";
import { ProjectLinks } from "@/components/project-detail";
import { findTopic, loadTopicContent } from "@/lib/deepdive-content";
import type { ProjectId } from "./types";

interface Props {
  projectId: ProjectId;
  topicId: string;
}

export async function DeepDivePage({ projectId, topicId }: Props) {
  const found = findTopic(projectId, topicId);
  const project = projectsData.find((p) => p.id === projectId);
  if (!found || !project) notFound();

  const { deepDive, topic } = found;
  const { doc, toc } = await loadTopicContent(projectId, topicId);

  return (
    <main className="dark min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* 상단 헤더 */}
          <div className="mb-8">
            {/* 뒤로가기 + 링크: 375px에서 가로 스크롤이 생기지 않도록 줄바꿈 허용 */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              {/* 모바일 터치 영역 44px, 공용 Button 크기는 그대로 둔다 */}
              <Button
                variant="ghost"
                size="sm"
                className="max-md:min-h-11"
                asChild
              >
                <Link href="/projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  프로젝트 목록
                </Link>
              </Button>
              <div className="flex flex-wrap gap-2 max-md:[&>a]:min-h-11">
                <ProjectLinks
                  githubUrl={project.githubUrl}
                  demoUrl={project.demoUrl}
                  playStoreUrl={project.playStoreUrl}
                />
              </div>
            </div>

            {/* 프로젝트 제목 + 기술 스택 (페이지마다 다른 토픽 제목이 h1) */}
            <p className="text-3xl md:text-4xl font-bold mb-2">
              {deepDive.title}
            </p>
            <p className="text-muted-foreground mb-4">{deepDive.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* 핵심 지표 */}
            <HighlightCards items={deepDive.highlights} />
          </div>

          {/* 모바일 네비게이션 */}
          <MobileTopicNav
            topics={deepDive.topics}
            currentTopicId={topicId}
            projectId={projectId}
            sections={toc}
          />

          {/* 3컬럼 레이아웃 */}
          <div className="flex gap-8 mt-8">
            <TopicSidebar
              topics={deepDive.topics}
              currentTopicId={topicId}
              projectId={projectId}
              sections={toc}
            />

            {/* 중앙: 토픽 헤더 + 본문 */}
            <div className="flex-1 min-w-0">
              <article className="max-w-[860px] mx-auto w-full">
                <header className="mb-16">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {topic.title}
                  </h1>
                  <p className="text-muted-foreground">{topic.subtitle}</p>
                </header>
                <RichText doc={doc} />
              </article>
            </div>

            <SubInfoPanel sections={deepDive.sideInfo} />
          </div>
        </div>
      </div>
    </main>
  );
}
