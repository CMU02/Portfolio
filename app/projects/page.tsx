"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  const t = useTranslations("Projects");

  return (
    <main className="dark min-h-screen">
      <Navigation />

      <section className="py-24 pt-32">
        <div className="container mx-auto px-6">
          {/* 페이지 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("backToHome")}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("pageTitle")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("pageSubtitle")}
            </p>
          </motion.div>

          {/* 프로젝트 카드 그리드 */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projectsData.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
