"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { ArrowRight } from "lucide-react";

// 미리보기로 보여줄 최대 프로젝트 수
const PREVIEW_COUNT = 4;

export function ProjectsSection() {
  const t = useTranslations("Projects");

  // 미리보기용 프로젝트 (최대 4개)
  const previewProjects = projectsData.slice(0, PREVIEW_COUNT);
  const hasMoreProjects = projectsData.length > PREVIEW_COUNT;

  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-6">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </motion.div>

        {/* 프로젝트 카드 - 미리보기 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {previewProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* 더보기 버튼 */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                {t("viewAll")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}

        {/* 프로젝트가 4개 이하여도 전체보기 링크 제공 */}
        {!hasMoreProjects && projectsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="ghost" asChild>
              <Link href="/projects">
                {t("viewAllProjects")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
