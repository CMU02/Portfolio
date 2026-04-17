"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import {
  TopicSidebar,
  SubInfoPanel,
  HighlightCards,
  TopicContent,
  MobileTopicNav,
  useActiveSection,
} from "@/components/deepdive";
import { phantomFileDeepDive } from "@/data/projects/phantomfile-data";
import { projectsData } from "@/data/projects";
import { ProjectLinks } from "@/components/project-detail";

interface Props {
  topicId: string;
}

export function PhantomFileDeepDivePage({ topicId }: Props) {
  const activeSection = useActiveSection();
  const deepDive = phantomFileDeepDive;
  const project = projectsData.find((p) => p.id === "phantom-file")!;
  const currentTopic = deepDive.topics.find((t) => t.id === topicId);

  if (!currentTopic) return null;

  return (
    <main className="dark min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* 상단 헤더 */}
          <div className="mb-8">
            {/* 뒤로가기 + 링크 */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  프로젝트 목록
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <ProjectLinks
                  githubUrl={project.githubUrl}
                  demoUrl={project.demoUrl}
                />
              </div>
            </div>

            {/* 프로젝트 제목 + 기술 스택 */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {deepDive.title}
            </h1>
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
            projectId={deepDive.projectId}
          />

          {/* 3컬럼 레이아웃 */}
          <div className="flex gap-8 mt-8">
            {/* 좌측: 이중 목차 */}
            <TopicSidebar
              topics={deepDive.topics}
              currentTopicId={topicId}
              activeSectionId={activeSection}
              projectId={deepDive.projectId}
            />

            {/* 중앙: 메인 콘텐츠 */}
            <div className="flex-1 min-w-0 flex justify-center">
              <TopicContent topic={currentTopic} />
            </div>

            {/* 우측: 서브 정보 */}
            <SubInfoPanel sections={deepDive.sideInfo} />
          </div>
        </div>
      </div>
    </main>
  );
}
