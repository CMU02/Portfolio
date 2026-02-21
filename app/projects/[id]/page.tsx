import Link from "next/link";
import { notFound } from "next/navigation";
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
  TrendingUp,
  Database,
  ImageIcon,
  Search,
  AlertTriangle,
  MapPin,
  Palette,
  Smartphone,
  Store,
} from "lucide-react";
import { CloudFrontImage } from "@/components/cloudfront-image";
import { ArchitectureImageWithLink } from "@/components/architecture-image-with-link";
import {
  AnimatedSection,
  SectionCard,
  ImageGrid,
  BulletList,
  ProjectLinks,
  TroubleShootingItem,
} from "@/components/project-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) notFound();

  const structuredData = generateProjectStructuredData(project);
  const typeLabel =
    project.type === "personal" ? "개인 프로젝트" : "팀 프로젝트";

  return (
    <main className="dark min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navigation />

      <section className="py-24 pt-32">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* 뒤로가기 버튼 */}
          <AnimatedSection className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                프로젝트 목록
              </Link>
            </Button>
          </AnimatedSection>

          {/* 헤더 섹션 */}
          <AnimatedSection delay={0.1} className="mb-12">
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
                {typeLabel}
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
                playStoreUrl={project.playStoreUrl}
                appStoreUrl={project.appStoreUrl}
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

          {/* 상세 섹션들 */}
          <div className="space-y-6">
            {project.problem && (
              <SectionCard
                title="해결한 문제"
                icon={<Target className="w-5 h-5 text-red-400" />}
                delay={0.25}
              >
                {Array.isArray(project.problem) ? (
                  <div className="grid gap-6">
                    {project.problem.map((item, index) => (
                      <div key={index} className="space-y-3">
                        <h4 className="font-semibold text-base">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {item.description}
                        </p>
                        {item.images && item.images.length > 0 && (
                          <div className="space-y-4 mt-4">
                            {/* 1열: 처음 3개 이미지 가로 배치 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {item.images
                                .slice(0, 3)
                                .map((imgKey, imgIndex) => (
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
                            {/* 2열: 4번째 이미지 */}
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
                        {item.image && !item.images && (
                          <div className="relative w-full max-w-[35%] rounded-lg overflow-hidden border border-border bg-muted/30">
                            <CloudFrontImage
                              s3Key={item.image}
                              alt={item.title}
                              sizes="(max-width: 768px) 35vw, 280px"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {project.problem}
                  </p>
                )}
              </SectionCard>
            )}

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

            {project.techReasons && project.techReasons.length > 0 && (
              <SectionCard
                title="기술 선택 이유"
                icon={<Wrench className="w-5 h-5 text-blue-400" />}
                delay={0.35}
              >
                <div className="space-y-6">
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

            <SectionCard
              title="주요 기능"
              icon={<CheckCircle className="w-5 h-5 text-green-400" />}
              delay={0.4}
            >
              {Array.isArray(project.features) &&
              typeof project.features[0] === "object" ? (
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
                            {feature.images.map(
                              (imgKey: string, imgIndex: number) => (
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
                              ),
                            )}
                          </div>
                        )}
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <BulletList items={project.features as string[]} />
              )}
            </SectionCard>

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

            {(project.images?.appIcon || project.images?.logo) && (
              <SectionCard
                title="앱 에셋"
                icon={<Smartphone className="w-5 h-5 text-blue-400" />}
                borderColor="border-blue-500/30"
                delay={0.52}
              >
                <div className="flex flex-wrap items-center gap-6">
                  {project.images?.appIcon && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        앱 아이콘
                      </p>
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border border-border bg-muted/30">
                        <CloudFrontImage
                          s3Key={project.images.appIcon}
                          alt="App Icon"
                          width={96}
                          height={96}
                          sizes="96px"
                        />
                      </div>
                    </div>
                  )}
                  {project.images?.logo && project.images.logo.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        로고
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {project.images.logo.map((logoKey, index) => (
                          <div
                            key={index}
                            className="h-24 rounded-lg border border-border bg-muted/30 px-6 py-3 flex items-center"
                          >
                            <CloudFrontImage
                              s3Key={logoKey}
                              alt={`Logo ${index + 1}`}
                              width={300}
                              height={72}
                              sizes="300px"
                              className="w-auto! h-full! max-h-18 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </SectionCard>
            )}

            {project.images?.storeAssets && (
              <SectionCard
                title="스토어 에셋"
                icon={<Store className="w-5 h-5 text-green-400" />}
                borderColor="border-green-500/30"
                delay={0.53}
              >
                <div className="space-y-6">
                  {project.images.storeAssets.featureGraphic && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        대표 이미지
                      </p>
                      <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                        <CloudFrontImage
                          s3Key={project.images.storeAssets.featureGraphic}
                          alt="Feature Graphic"
                          sizes="(max-width: 768px) 100vw, 800px"
                          priority
                        />
                      </div>
                    </div>
                  )}
                  {project.images.storeAssets.introScreens &&
                    project.images.storeAssets.introScreens.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          소개 화면
                        </p>
                        <ImageGrid
                          images={project.images.storeAssets.introScreens}
                          altPrefix="Intro Screen"
                        />
                      </div>
                    )}
                </div>
              </SectionCard>
            )}

            {project.images?.mobileScreenshots && (
              <SectionCard
                title="모바일 스크린샷"
                icon={<Smartphone className="w-5 h-5 text-cyan-400" />}
                delay={0.54}
              >
                <div className="space-y-6">
                  {project.images.mobileScreenshots.android &&
                    project.images.mobileScreenshots.android.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Android 스크린샷
                        </p>
                        <ImageGrid
                          images={project.images.mobileScreenshots.android}
                          altPrefix="Android Screenshot"
                        />
                      </div>
                    )}
                  {project.images.mobileScreenshots.ios &&
                    project.images.mobileScreenshots.ios.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-green-400">
                          iOS 스크린샷
                        </p>
                        <ImageGrid
                          images={project.images.mobileScreenshots.ios}
                          altPrefix="iOS Screenshot"
                        />
                      </div>
                    )}
                </div>
              </SectionCard>
            )}

            {project.images?.architecture &&
              project.images.architecture.length > 0 && (
                <SectionCard
                  title="아키텍처"
                  icon={<Database className="w-5 h-5 text-blue-400" />}
                  delay={0.54}
                >
                  <div className="space-y-4">
                    {project.images.architecture.map((archKey, index) => (
                      <ArchitectureImageWithLink
                        key={index}
                        s3Key={archKey}
                        alt={`Architecture ${index + 1}`}
                        priority={index === 0}
                      />
                    ))}
                  </div>
                </SectionCard>
              )}

            {project.images?.erd && project.images.erd.length > 0 && (
              <SectionCard
                title="ERD 다이어그램"
                icon={<Database className="w-5 h-5 text-purple-400" />}
                delay={0.55}
              >
                <div className="space-y-6">
                  {project.images.erd.map((erdKey, index) => (
                    <div key={index} className="space-y-2">
                      {project.images!.erd!.length > 1 && (
                        <p className="text-sm font-medium text-muted-foreground">
                          {erdKey.includes("legacy")
                            ? "레거시 버전"
                            : "최신 버전"}
                        </p>
                      )}
                      <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                        <CloudFrontImage
                          s3Key={erdKey}
                          alt={`ERD ${index + 1}`}
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {project.images?.screenshots &&
              project.images.screenshots.length > 0 && (
                <SectionCard
                  title="스크린샷"
                  icon={<ImageIcon className="w-5 h-5 text-cyan-400" />}
                  delay={0.6}
                >
                  <div className="space-y-6">
                    {project.images.screenshots.map((screenshotKey, index) => (
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
              )}

            {project.images?.fieldSurvey && (
              <SectionCard
                title="현장 조사"
                icon={<MapPin className="w-5 h-5 text-green-400" />}
                delay={0.65}
              >
                <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                  <CloudFrontImage
                    s3Key={project.images.fieldSurvey}
                    alt="Field Survey"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </SectionCard>
            )}

            {project.images?.uiDesign &&
              (project.images.uiDesign.before ||
                project.images.uiDesign.after) && (
                <SectionCard
                  title="UI 디자인 개선"
                  icon={<Palette className="w-5 h-5 text-pink-400" />}
                  borderColor="border-pink-500/30"
                  delay={0.68}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {project.images.uiDesign.before && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          개선 전
                        </p>
                        <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                          <CloudFrontImage
                            s3Key={project.images.uiDesign.before}
                            alt="UI Design Before"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    )}
                    {project.images.uiDesign.after && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-pink-400">
                          개선 후
                        </p>
                        <div className="relative w-full rounded-lg overflow-hidden border border-pink-500/30 bg-muted/30">
                          <CloudFrontImage
                            s3Key={project.images.uiDesign.after}
                            alt="UI Design After"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </SectionCard>
              )}

            {project.troubleShooting && project.troubleShooting.length > 0 && (
              <SectionCard
                title="문제 해결 사례"
                icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
                borderColor="border-red-500/30"
                delay={0.7}
              >
                <div className="space-y-6">
                  {project.troubleShooting.map((item, index) => (
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
            )}

            {project.seoResult && (
              <SectionCard
                title="SEO 성과"
                icon={<Search className="w-5 h-5 text-green-400" />}
                borderColor="border-green-500/30"
                delay={0.75}
              >
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    {project.seoResult.description}
                  </p>

                  {project.seoResult.searchRankings &&
                    project.seoResult.searchRankings.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold">구글 검색어 순위</h4>
                        <div className="grid gap-4">
                          {project.seoResult.searchRankings.map(
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
                    )}

                  <div className="space-y-3">
                    <h4 className="font-semibold">지표 변화</h4>
                    <div className="grid gap-3">
                      {project.seoResult.metrics.map((metric, index) => (
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
                          {project.seoResult.keywords.before.map(
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
                          {project.seoResult.keywords.after.map(
                            (keyword, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-green-500/50"
                              >
                                {keyword}
                              </Badge>
                            ),
                          )}
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
                        {project.seoResult.images.before.map((imgKey, i) => (
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
                        {project.seoResult.images.after.map((imgKey, i) => (
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
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
