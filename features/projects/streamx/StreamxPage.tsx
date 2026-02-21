import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsData, FeatureSection } from "@/data/projects";
import { generateProjectStructuredData } from "@/lib/seo-utils";
import {
  ArrowLeft,
  User,
  Target,
  Lightbulb,
  Wrench,
  CheckCircle,
} from "lucide-react";
import { CloudFrontImage } from "@/components/cloudfront-image";
import {
  AnimatedSection,
  SectionCard,
  ProjectLinks,
} from "@/components/project-detail";

export function StreamxPage() {
  const project = projectsData.find((p) => p.id === "streamx")!;
  const structuredData = generateProjectStructuredData(project);

  return (
    <main className="dark min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navigation />

      <section className="py-24 pt-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSection className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                프로젝트 목록
              </Link>
            </Button>
          </AnimatedSection>

          {/* 헤더 */}
          <AnimatedSection delay={0.1} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                {project.title}
              </h1>
              <Badge variant="secondary">팀 프로젝트</Badge>
            </div>
            <p className="text-xl text-muted-foreground mb-4">
              {project.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Badge variant="secondary">{project.role}</Badge>
              </div>
              <ProjectLinks githubUrl={project.githubUrl} />
            </div>
          </AnimatedSection>

          {/* 기술 스택 */}
          <AnimatedSection delay={0.15} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </AnimatedSection>

          {/* 설명 */}
          <AnimatedSection delay={0.2} className="mb-8">
            <p className="text-lg leading-relaxed">{project.description}</p>
          </AnimatedSection>

          <div className="space-y-6">
            {/* 해결한 문제 */}
            <SectionCard
              title="해결한 문제"
              icon={<Target className="w-5 h-5 text-red-400" />}
              delay={0.25}
            >
              <p className="text-muted-foreground leading-relaxed">
                {
                  (
                    project.problem as { title: string; description: string }[]
                  )[0].description
                }
              </p>
            </SectionCard>

            {/* 동기 */}
            <SectionCard
              title="동기 및 문제정의"
              icon={<Lightbulb className="w-5 h-5 text-yellow-400" />}
              delay={0.3}
            >
              <p className="text-muted-foreground leading-relaxed">
                {project.motivation}
              </p>
            </SectionCard>

            {/* 기술 선택 이유 */}
            <SectionCard
              title="기술 선택 이유"
              icon={<Wrench className="w-5 h-5 text-blue-400" />}
              delay={0.35}
            >
              <div className="space-y-6">
                {project.techReasons?.map((item, index) => (
                  <div key={index} className="border-l-2 border-tech-cyan pl-4">
                    <h4 className="font-semibold text-lg mb-2">{item.tech}</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">
                          선택 이유:{" "}
                        </span>
                        {item.reason}
                      </p>
                      <p>
                        <span className="text-muted-foreground">
                          해결한 것:{" "}
                        </span>
                        {item.solved}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 주요 기능 — 이미지가 포함된 FeatureSection[] 형태 */}
            <SectionCard
              title="주요 기능"
              icon={<CheckCircle className="w-5 h-5 text-green-400" />}
              delay={0.4}
            >
              <ul className="space-y-4">
                {(project.features as FeatureSection[]).map(
                  (feature, index) => (
                    <li key={index} className="space-y-3">
                      <div className="flex gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span className="flex-1">{feature.text}</span>
                      </div>
                      {feature.images && feature.images.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                          {feature.images.map((imgKey, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30"
                            >
                              <CloudFrontImage
                                s3Key={imgKey}
                                alt={`${feature.text} 이미지 ${imgIndex + 1}`}
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  ),
                )}
              </ul>
            </SectionCard>

            {/* 기여한 부분 */}
            <SectionCard
              title="내가 기여한 부분"
              icon={<User className="w-5 h-5 text-tech-purple" />}
              borderColor="border-tech-purple/30"
              delay={0.45}
            >
              <ul className="space-y-2">
                {project.myContributions!.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-tech-purple mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>
      </section>
    </main>
  );
}
