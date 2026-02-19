"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { ArrowRight } from "lucide-react";

const PREVIEW_COUNT = 4;

export function ProjectsSection() {
  const previewProjects = projectsData.slice(0, PREVIEW_COUNT);
  const hasMoreProjects = projectsData.length > PREVIEW_COUNT;

  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground text-lg">
            직접 만들어본 프로젝트들
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {previewProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                모든 프로젝트 보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}

        {!hasMoreProjects && projectsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="ghost" asChild>
              <Link href="/projects">
                프로젝트 전체보기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
