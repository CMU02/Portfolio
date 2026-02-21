import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsData, ProblemSection } from "@/data/projects";
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
  ImageIcon,
  Search,
  AlertTriangle,
  MapPin,
  Palette,
} from "lucide-react";
import { CloudFrontImage } from "@/components/cloudfront-image";
import {
  AnimatedSection,
  SectionCard,
  BulletList,
  ProjectLinks,
  TroubleShootingItem,
} from "@/components/project-detail";

export function CleanBreathPage() {
  const project = projectsData.find((p) => p.id === "cleanbreath")!;
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
            {/* 해결한 문제 — ProblemSection[] 형태 */}
            <SectionCard
              title="해결한 문제"
              icon={<Target className="w-5 h-5 text-red-400" />}
              delay={0.25}
            >
              <div className="grid gap-6">
                {(project.problem as ProblemSection[]).map((item, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-base">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.description}
                    </p>
                    {item.images && item.images.length > 0 && (
                      <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {item.images.slice(0, 3).map((imgKey, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30"
                            >
                              <CloudFrontImage
                                s3Key={imgKey}
                                alt={`${item.title} 사례 ${imgIndex + 1}`}
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          ))}
                        </div>
                        {item.images[3] && (
                          <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                            <CloudFrontImage
                              s3Key={item.images[3]}
                              alt={`${item.title} 사례 4`}
                              sizes="(max-width: 768px) 100vw, 100vw"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
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

            {/* ERD */}
            <SectionCard
              title="ERD 다이어그램"
              icon={<Database className="w-5 h-5 text-purple-400" />}
              delay={0.55}
            >
              <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                <CloudFrontImage
                  s3Key={project.images!.erd![0]}
                  alt="ERD"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </SectionCard>

            {/* 스크린샷 */}
            <SectionCard
              title="스크린샷"
              icon={<ImageIcon className="w-5 h-5 text-cyan-400" />}
              delay={0.6}
            >
              <div className="space-y-6">
                {project.images!.screenshots!.map((screenshotKey, index) => (
                  <div
                    key={index}
                    className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30"
                  >
                    <CloudFrontImage
                      s3Key={screenshotKey}
                      alt={`Screenshot ${index + 1}`}
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* 현장 조사 */}
            <SectionCard
              title="현장 조사"
              icon={<MapPin className="w-5 h-5 text-green-400" />}
              delay={0.65}
            >
              <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                <CloudFrontImage
                  s3Key={project.images!.fieldSurvey!}
                  alt="Field Survey"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </SectionCard>

            {/* UI 디자인 개선 */}
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
                      s3Key={project.images!.uiDesign!.before!}
                      alt="UI Design Before"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-pink-400">개선 후</p>
                  <div className="relative w-full rounded-lg overflow-hidden border border-pink-500/30 bg-muted/30">
                    <CloudFrontImage
                      s3Key={project.images!.uiDesign!.after!}
                      alt="UI Design After"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 문제 해결 사례 */}
            <SectionCard
              title="문제 해결 사례"
              icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
              borderColor="border-red-500/30"
              delay={0.7}
            >
              <div className="space-y-6">
                {project.troubleShooting!.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <div className="grid gap-3 text-sm">
                      <TroubleShootingItem
                        label="문제 상황"
                        content={item.problem}
                        colorClass="red"
                      />
                      <TroubleShootingItem
                        label="원인 분석"
                        content={item.cause}
                        colorClass="yellow"
                      />
                      <TroubleShootingItem
                        label="해결 방법"
                        content={item.solution}
                        colorClass="blue"
                      />
                      <TroubleShootingItem
                        label="결과"
                        content={item.result}
                        colorClass="green"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* SEO 성과 */}
            <SectionCard
              title="SEO 성과"
              icon={<Search className="w-5 h-5 text-green-400" />}
              borderColor="border-green-500/30"
              delay={0.75}
            >
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  {project.seoResult!.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold">구글 검색어 순위</h4>
                  <div className="grid gap-4">
                    {project.seoResult!.searchRankings!.map(
                      (ranking, index) => (
                        <div key={index} className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {new Date(ranking.date).toLocaleDateString(
                              "ko-KR",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </p>
                          <div className="rounded-lg overflow-hidden border border-border">
                            <CloudFrontImage
                              s3Key={ranking.image}
                              alt={`Search Ranking ${ranking.date}`}
                              sizes="(max-width: 768px) 100vw, 800px"
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">지표 변화</h4>
                  <div className="grid gap-3">
                    {project.seoResult!.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-4 gap-2 p-3 rounded-lg bg-muted/30 text-sm"
                      >
                        <span className="font-medium">{metric.label}</span>
                        <span className="text-muted-foreground">
                          적용 전: {metric.before}
                        </span>
                        <span className="text-muted-foreground">
                          적용 후: {metric.after}
                        </span>
                        <span
                          className={
                            metric.change.startsWith("+")
                              ? "text-green-400"
                              : "text-yellow-400"
                          }
                        >
                          {metric.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">키워드 변화</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        적용 전
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.seoResult!.keywords.before.map(
                          (keyword, i) => (
                            <Badge key={i} variant="outline">
                              {keyword}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-sm font-medium text-green-400 mb-2">
                        적용 후
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.seoResult!.keywords.after.map((keyword, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="border-green-500/50"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Google Search Console</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        적용 전
                      </p>
                      {project.seoResult!.images.before.map((imgKey, i) => (
                        <div
                          key={i}
                          className="rounded-lg overflow-hidden border border-border"
                        >
                          <CloudFrontImage
                            s3Key={imgKey}
                            alt={`SEO Before ${i + 1}`}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-green-400">
                        적용 후
                      </p>
                      {project.seoResult!.images.after.map((imgKey, i) => (
                        <div
                          key={i}
                          className="rounded-lg overflow-hidden border border-green-500/30"
                        >
                          <CloudFrontImage
                            s3Key={imgKey}
                            alt={`SEO After ${i + 1}`}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </section>
    </main>
  );
}
