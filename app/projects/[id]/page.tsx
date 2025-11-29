"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projects";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  User,
  Target,
  Lightbulb,
  Wrench,
  CheckCircle,
} from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const t = useTranslations("Projects");

  const project = projectsData.find((p) => p.id === params.id);

  // 프로젝트를 찾지 못한 경우
  if (!project) {
    return (
      <main className="dark min-h-screen">
        <Navigation />
        <section className="py-24 pt-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">{t("notFound")}</h1>
            <p className="text-muted-foreground mb-8">{t("notFoundDesc")}</p>
            <Button asChild>
              <Link href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("backToProjects")}
              </Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="dark min-h-screen">
      <Navigation />

      <section className="py-24 pt-32">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* 뒤로가기 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("backToProjects")}
              </Link>
            </Button>
          </motion.div>

          {/* 프로젝트 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                {project.title}
              </h1>
              <Badge
                variant={project.type === "personal" ? "default" : "secondary"}
                className={
                  project.type === "personal"
                    ? "bg-tech-purple/20 text-tech-purple border-tech-purple/50"
                    : ""
                }
              >
                {t(project.type)}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground mb-4">
              {project.subtitle}
            </p>

            {/* Role & Links */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Badge variant="secondary">{project.role}</Badge>
              </div>
              {project.githubUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* 프로젝트 설명 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-lg leading-relaxed">{project.description}</p>
          </motion.div>

          {/* 상세 정보 카드들 */}
          <div className="space-y-6">
            {/* 문제 정의 */}
            {project.problem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Target className="w-5 h-5 text-red-400" />
                      {t("problemTitle")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.problem}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 동기 및 문제정의 */}
            {project.motivation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      {t("motivationTitle")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.motivation}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 기술 선택 이유 */}
            {project.techReasons && project.techReasons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Wrench className="w-5 h-5 text-blue-400" />
                      {t("techReasonsTitle")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {project.techReasons.map((item, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-tech-cyan pl-4"
                      >
                        <h4 className="font-semibold text-lg mb-2">
                          {item.tech}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="text-muted-foreground">
                              {t("whyChose")}:{" "}
                            </span>
                            {item.reason}
                          </p>
                          <p>
                            <span className="text-muted-foreground">
                              {t("whatSolved")}:{" "}
                            </span>
                            {item.solved}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 주요 기능 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    {t("features")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-tech-cyan">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* 내가 기여한 부분 */}
            {project.myContributions && project.myContributions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Card className="border-tech-purple/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <User className="w-5 h-5 text-tech-purple" />
                      {t("myContributions")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.myContributions.map((contribution, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-tech-purple">✓</span>
                          <span>{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
