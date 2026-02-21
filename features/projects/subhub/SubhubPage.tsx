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
  Smartphone,
  Store,
} from "lucide-react";
import { CloudFrontImage } from "@/components/cloudfront-image";
import {
  AnimatedSection,
  SectionCard,
  ImageGrid,
  BulletList,
  ProjectLinks,
} from "@/components/project-detail";

export function SubhubPage() {
  const project = projectsData.find((p) => p.id === "subhub")!;
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

            {/* 앱 에셋 */}
            <SectionCard
              title="앱 에셋"
              icon={<Smartphone className="w-5 h-5 text-blue-400" />}
              borderColor="border-blue-500/30"
              delay={0.52}
            >
              <div className="flex flex-wrap items-center gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    앱 아이콘
                  </p>
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-border bg-muted/30">
                    <CloudFrontImage
                      s3Key={project.images!.appIcon!}
                      alt="App Icon"
                      width={96}
                      height={96}
                      sizes="96px"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    로고
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {project.images!.logo!.map((logoKey, index) => (
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
              </div>
            </SectionCard>

            {/* 스토어 에셋 */}
            <SectionCard
              title="스토어 에셋"
              icon={<Store className="w-5 h-5 text-green-400" />}
              borderColor="border-green-500/30"
              delay={0.53}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    대표 이미지
                  </p>
                  <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                    <CloudFrontImage
                      s3Key={project.images!.storeAssets!.featureGraphic!}
                      alt="Feature Graphic"
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    소개 화면
                  </p>
                  <ImageGrid
                    images={project.images!.storeAssets!.introScreens!}
                    altPrefix="Intro Screen"
                  />
                </div>
              </div>
            </SectionCard>

            {/* 모바일 스크린샷 */}
            <SectionCard
              title="모바일 스크린샷"
              icon={<Smartphone className="w-5 h-5 text-cyan-400" />}
              delay={0.54}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Android 스크린샷
                  </p>
                  <ImageGrid
                    images={project.images!.mobileScreenshots!.android!}
                    altPrefix="Android Screenshot"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-400">
                    iOS 스크린샷
                  </p>
                  <ImageGrid
                    images={project.images!.mobileScreenshots!.ios!}
                    altPrefix="iOS Screenshot"
                  />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </section>
    </main>
  );
}
