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
import { cleanbreathDeepDive } from "@/data/projects/cleanbreath-data";
import { projectsData } from "@/data/projects";
import { ProjectLinks } from "@/components/project-detail";

interface Props {
  topicId: string;
}

export function CleanBreathDeepDivePage({ topicId }: Props) {
  const activeSection = useActiveSection();
  const deepDive = cleanbreathDeepDive;
  const project = projectsData.find((p) => p.id === "cleanbreath")!;
  const currentTopic = deepDive.topics.find((t) => t.id === topicId);

  if (!currentTopic) return null;

  return (
    <main className="dark min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* 상단 헤더 */}
          <div className="mb-8">
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

            <HighlightCards items={deepDive.highlights} />
          </div>

          <MobileTopicNav
            topics={deepDive.topics}
            currentTopicId={topicId}
            projectId={deepDive.projectId}
          />

          <div className="flex gap-8 mt-8">
            <TopicSidebar
              topics={deepDive.topics}
              currentTopicId={topicId}
              activeSectionId={activeSection}
              projectId={deepDive.projectId}
            />

            <div className="flex-1 min-w-0 flex justify-center">
              <TopicContent topic={currentTopic} />
            </div>

            <SubInfoPanel sections={deepDive.sideInfo} />
          </div>
        </div>
      </div>
    </main>
  );
}
