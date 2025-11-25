"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { projectsData, Project } from "@/data/projects";
import { ExternalLink, GitBranch, Layers } from "lucide-react";

// 프로젝트 카드 컴포넌트
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("Projects");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
    >
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <p className="text-muted-foreground text-sm">{project.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 기술 하이라이트 */}
          <div className="space-y-2">
            {project.techHighlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-tech-cyan mt-1">▸</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* 기술 스택 배지 */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          {/* 버튼들 */}
          <div className="flex gap-2 pt-2">
            {project.liveUrl && (
              <Button size="sm" variant="outline" asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  {t("liveDemo")}
                </a>
              </Button>
            )}

            {/* Architecture 모달 */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Layers className="w-4 h-4 mr-1" />
                  {t("architecture")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{project.title} - Architecture</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* 시스템 구성도 플레이스홀더 */}
                  <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center border border-dashed border-border">
                    <div className="text-center text-muted-foreground">
                      <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>System Architecture Diagram</p>
                      <p className="text-xs mt-1">이미지를 추가해주세요</p>
                    </div>
                  </div>

                  {/* 기술 설명 */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Technical Highlights</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {project.techHighlights.map((h, i) => (
                        <li key={i}>• {h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {project.githubUrl && (
              <Button size="sm" variant="ghost" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch className="w-4 h-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
