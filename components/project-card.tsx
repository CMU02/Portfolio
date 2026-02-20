"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/data/projects";
import { ProjectLinks } from "@/components/project-detail/project-links";
import { User, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const typeLabel =
    project.type === "personal" ? "개인 프로젝트" : "팀 프로젝트";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:border-primary/50 transition-colors flex flex-col">
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

        <CardContent className="space-y-6 flex-1 flex flex-col">
          <p className="text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="space-y-2">
            <p className="text-sm font-medium">주요 기능</p>
            <ul className="space-y-1">
              {project.features.slice(0, 3).map((feature, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex gap-2"
                >
                  <span className="text-tech-cyan">•</span>
                  <span className="line-clamp-1">
                    {typeof feature === "string" ? feature : feature.text}
                  </span>
                </li>
              ))}
              {project.features.length > 3 && (
                <li className="text-sm text-muted-foreground">
                  <span className="text-tech-cyan">...</span>
                  <span className="ml-2">
                    +{project.features.length - 3} more
                  </span>
                </li>
              )}
            </ul>
          </div>

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
