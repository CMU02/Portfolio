"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/data/projects";
import { ProjectLinks } from "@/components/project-detail/project-links";
import { CloudFrontImage } from "@/components/cloudfront-image";
import { User, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const typeLabel =
    project.type === "personal"
      ? "개인 프로젝트"
      : `팀 프로젝트 (${project.teamSize ?? "?"}인)`;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:border-primary/50 transition-colors flex flex-col overflow-hidden">
        {/* 미리보기 이미지 — 높이 고정으로 카드 크기 통일 */}
        <div className="relative w-full h-48 overflow-hidden bg-muted/30 shrink-0">
          {project.previewImage ? (
            <CloudFrontImage
              s3Key={project.previewImage}
              alt={`${project.title} 미리보기`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted/50" />
          )}
        </div>

        <CardHeader className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <Badge
                variant={project.type === "personal" ? "default" : "secondary"}
                className={
                  project.type === "personal"
                    ? "bg-tech-purple/20 text-tech-purple border-tech-purple/50"
                    : ""
                }
              >
                {typeLabel}
              </Badge>
            </div>
            <p className="text-muted-foreground">{project.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Role:</span>
            <Badge variant="secondary">{project.role}</Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 5 && (
              <Badge variant="outline">+{project.techStack.length - 5}</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <p className="text-sm leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 pt-2 mt-auto">
            <Button size="sm" variant="default" asChild>
              <Link href={`/projects/${project.id}`}>
                상세보기
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <ProjectLinks
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
              playStoreUrl={project.playStoreUrl}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
