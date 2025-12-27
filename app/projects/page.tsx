import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { ProjectCard } from "@/components/project-card";
import { projectsData } from "@/data/projects";
import * as motion from "motion/react-client";

export const metadata: Metadata = {
  title: "프로젝트 | CMU02 Portfolio",
  description:
    "CMU02가 개발한 풀스택 프로젝트들을 소개합니다. React, Next.js, Spring Boot, NestJS를 활용한 실무 프로젝트와 오픈소스 라이브러리 개발 경험을 확인하세요.",
  keywords: [
    "개발 프로젝트",
    "포트폴리오 프로젝트",
    "React 프로젝트",
    "Next.js 프로젝트",
    "Spring Boot 프로젝트",
    "풀스택 개발",
    "웹 개발 프로젝트",
    "오픈소스",
    "CMU02 프로젝트",
  ],
  openGraph: {
    title: "프로젝트 | CMU02 Portfolio",
    description: "CMU02가 개발한 풀스택 프로젝트들을 소개합니다.",
    url: "https://cmu02-studio.com/projects",
  },
  alternates: {
    canonical: "https://cmu02-studio.com/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="dark min-h-screen">
      <Navigation />

      <section className="py-24 pt-32">
        <div className="container mx-auto px-6">
          {/* 페이지 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">프로젝트</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              문제를 해결하고 가치를 창출하는 프로젝트들을 소개합니다. 각
              프로젝트는 실제 문제를 해결하기 위해 기획되었으며, 최신 기술
              스택을 활용하여 구현되었습니다.
            </p>
          </motion.div>

          {/* 프로젝트 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
