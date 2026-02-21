import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projects";
import { generateProjectStructuredData } from "@/lib/seo-utils";
import {
  ArrowLeft,
  User,
  Target,
  Lightbulb,
  Wrench,
  CheckCircle,
  TrendingUp,
  Database,
  AlertTriangle,
  Search,
  CheckCircle2,
} from "lucide-react";
import { ArchitectureImageWithLink } from "@/components/architecture-image-with-link";
import {
  AnimatedSection,
  SectionCard,
  BulletList,
  ProjectLinks,
} from "@/components/project-detail";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function PhantomFilePage() {
  const project = projectsData.find((p) => p.id === "phantom-file")!;
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
              <Badge className="bg-tech-purple/20 text-tech-purple border-tech-purple/50">
                개인 프로젝트
              </Badge>
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
            <SectionCard
              title="해결한 문제"
              icon={<Target className="w-5 h-5 text-red-400" />}
              delay={0.25}
            >
              <p className="text-muted-foreground leading-relaxed">
                {project.problem as string}
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

            {/* 주요 기능 */}
            <SectionCard
              title="주요 기능"
              icon={<CheckCircle className="w-5 h-5 text-green-400" />}
              delay={0.4}
            >
              <BulletList items={project.features as string[]} />
            </SectionCard>

            {/* 기여한 부분 */}
            <SectionCard
              title="내가 기여한 부분"
              icon={<User className="w-5 h-5 text-tech-purple" />}
              borderColor="border-tech-purple/30"
              delay={0.45}
            >
              <BulletList
                items={project.myContributions!}
                bulletColor="text-tech-purple"
                bulletChar="✓"
                textColor=""
              />
            </SectionCard>

            {/* 기대 효과 */}
            <SectionCard
              title="기대 효과"
              icon={<TrendingUp className="w-5 h-5 text-orange-400" />}
              delay={0.5}
            >
              <BulletList
                items={project.expectedEffects!}
                bulletColor="text-orange-400"
                bulletChar="▸"
              />
            </SectionCard>

            {/* 아키텍처 */}
            <SectionCard
              title="아키텍처"
              icon={<Database className="w-5 h-5 text-blue-400" />}
              delay={0.54}
            >
              <div className="space-y-4">
                {project.images!.architecture!.map((archKey, index) => (
                  <ArchitectureImageWithLink
                    key={index}
                    s3Key={archKey}
                    alt={`Architecture ${index + 1}`}
                    priority={index === 0}
                  />
                ))}
              </div>
            </SectionCard>

            {/* 트러블슈팅 */}
            {project.troubleShooting && project.troubleShooting.length > 0 && (
              <SectionCard
                title="트러블슈팅"
                icon={<AlertTriangle className="w-5 h-5 text-yellow-400" />}
                delay={0.58}
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {project.troubleShooting.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-border rounded-lg px-4 bg-card/50"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              문제 상황
                            </p>
                            <p className="text-sm">{item.problem}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Search className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              원인 분석
                            </p>
                            <div
                              className="text-sm"
                              dangerouslySetInnerHTML={{ __html: item.cause }}
                            />
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-4 h-4 text-tech-cyan mt-1 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              해결 방법
                            </p>
                            <div
                              className="text-sm"
                              dangerouslySetInnerHTML={{
                                __html: item.solution,
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              결과
                            </p>
                            <div
                              className="text-sm text-green-400"
                              dangerouslySetInnerHTML={{ __html: item.result }}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </SectionCard>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
