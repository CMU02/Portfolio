import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  projectsData,
  ProblemSection as ProblemSectionType,
} from "@/data/projects";
import { generateProjectStructuredData } from "@/lib/seo-utils";
import {
  ArrowLeft,
  User,
  Lightbulb,
  Wrench,
  CheckCircle,
  TrendingUp,
  Database,
  ImageIcon,
  MapPin,
  Palette,
} from "lucide-react";
import { CloudFrontImage } from "@/components/cloudfront-image";
import {
  AnimatedSection,
  SectionCard,
  BulletList,
  ProjectLinks,
} from "@/components/project-detail";
import {
  ProblemSection,
  SeoResultSection,
  TroubleShootingSection,
} from "./sections";

/**
 * ProblemSection 타입 가드
 */
function isProblemSectionArray(
  problem: unknown,
): problem is ProblemSectionType[] {
  return (
    Array.isArray(problem) &&
    problem.length > 0 &&
    typeof problem[0] === "object" &&
    problem[0] !== null &&
    "title" in problem[0]
  );
}

export function CleanBreathPage() {
  const project = projectsData.find((p) => p.id === "cleanbreath");

  // 프로젝트를 찾지 못한 경우 처리
  if (!project) {
    return (
      <main className="dark min-h-screen">
        <Navigation />
        <section className="py-24 pt-32">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-center text-muted-foreground">
              프로젝트를 찾을 수 없습니다.
            </p>
          </div>
        </section>
      </main>
    );
  }

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
              <ProjectLinks
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
              />
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
            {isProblemSectionArray(project.problem) && (
              <ProblemSection problems={project.problem} delay={0.25} />
            )}

            {/* 동기 */}
            {project.motivation && (
              <SectionCard
                title="동기 및 문제정의"
                icon={<Lightbulb className="w-5 h-5 text-yellow-400" />}
                delay={0.3}
              >
                <p className="text-muted-foreground leading-relaxed">
                  {project.motivation}
                </p>
              </SectionCard>
            )}

            {/* 기술 선택 이유 */}
            {project.techReasons && project.techReasons.length > 0 && (
              <SectionCard
                title="기술 선택 이유"
                icon={<Wrench className="w-5 h-5 text-blue-400" />}
                delay={0.35}
              >
                <div className="space-y-6">
                  {project.techReasons.map((item) => (
                    <div
                      key={item.tech}
                      className="border-l-2 border-tech-cyan pl-4"
                    >
                      <h4 className="font-semibold text-lg mb-2">
                        {item.tech}
                      </h4>
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
            )}

            {/* 주요 기능 */}
            {Array.isArray(project.features) && project.features.length > 0 && (
              <SectionCard
                title="주요 기능"
                icon={<CheckCircle className="w-5 h-5 text-green-400" />}
                delay={0.4}
              >
                <BulletList items={project.features as string[]} />
              </SectionCard>
            )}

            {/* 기여한 부분 */}
            {project.myContributions && project.myContributions.length > 0 && (
              <SectionCard
                title="내가 기여한 부분"
                icon={<User className="w-5 h-5 text-tech-purple" />}
                borderColor="border-tech-purple/30"
                delay={0.45}
              >
                <BulletList
                  items={project.myContributions}
                  bulletColor="text-tech-purple"
                  bulletChar="✓"
                  textColor=""
                />
              </SectionCard>
            )}

            {/* 기대 효과 */}
            {project.expectedEffects && project.expectedEffects.length > 0 && (
              <SectionCard
                title="기대 효과"
                icon={<TrendingUp className="w-5 h-5 text-orange-400" />}
                delay={0.5}
              >
                <BulletList
                  items={project.expectedEffects}
                  bulletColor="text-orange-400"
                  bulletChar="▸"
                />
              </SectionCard>
            )}

            {/* ERD */}
            {project.images?.erd && project.images.erd.length > 0 && (
              <SectionCard
                title="ERD 다이어그램"
                icon={<Database className="w-5 h-5 text-purple-400" />}
                delay={0.55}
              >
                <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                  <CloudFrontImage
                    s3Key={project.images.erd[0]}
                    alt="ERD 다이어그램"
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </SectionCard>
            )}

            {/* 스크린샷 */}
            {project.images?.screenshots &&
              project.images.screenshots.length > 0 && (
                <SectionCard
                  title="스크린샷"
                  icon={<ImageIcon className="w-5 h-5 text-cyan-400" />}
                  delay={0.6}
                >
                  <div className="space-y-6">
                    {project.images.screenshots.map((screenshotKey) => (
                      <div
                        key={screenshotKey}
                        className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30"
                      >
                        <CloudFrontImage
                          s3Key={screenshotKey}
                          alt="스크린샷"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

            {/* 현장 조사 */}
            {project.images?.fieldSurvey && (
              <SectionCard
                title="현장 조사"
                icon={<MapPin className="w-5 h-5 text-green-400" />}
                delay={0.65}
              >
                <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                  <CloudFrontImage
                    s3Key={project.images.fieldSurvey}
                    alt="현장 조사"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </SectionCard>
            )}

            {/* UI 디자인 개선 */}
            {project.images?.uiDesign?.before &&
              project.images?.uiDesign?.after && (
                <SectionCard
                  title="UI 디자인 개선"
                  icon={<Palette className="w-5 h-5 text-pink-400" />}
                  borderColor="border-pink-500/30"
                  delay={0.68}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        개선 전
                      </p>
                      <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                        <CloudFrontImage
                          s3Key={project.images.uiDesign.before}
                          alt="UI 디자인 개선 전"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-pink-400">
                        개선 후
                      </p>
                      <div className="relative w-full rounded-lg overflow-hidden border border-pink-500/30 bg-muted/30">
                        <CloudFrontImage
                          s3Key={project.images.uiDesign.after}
                          alt="UI 디자인 개선 후"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </SectionCard>
              )}

            {/* 문제 해결 사례 */}
            {project.troubleShooting && project.troubleShooting.length > 0 && (
              <TroubleShootingSection
                troubleShooting={project.troubleShooting}
                delay={0.7}
              />
            )}

            {/* SEO 성과 */}
            {project.seoResult && (
              <SeoResultSection seoResult={project.seoResult} delay={0.75} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
