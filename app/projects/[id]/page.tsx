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
import { generateProjectStructuredData } from "@/lib/seo-utils";
import {
  ArrowLeft,
  Github,
  ExternalLink,
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

  // 구조화된 데이터 생성
  const structuredData = generateProjectStructuredData(project);

  return (
    <main className="dark min-h-screen">
      {/* 구조화된 데이터 추가 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

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
                    {t("liveService")}
                  </a>
                </Button>
              )}
              {project.playStoreUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Store className="w-4 h-4 mr-1" />
                    {t("viewOnPlayStore")}
                  </a>
                </Button>
              )}
              {project.appStoreUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Store className="w-4 h-4 mr-1" />
                    {t("viewOnAppStore")}
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

            {/* 기대 효과 */}
            {project.expectedEffects && project.expectedEffects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <TrendingUp className="w-5 h-5 text-orange-400" />
                      {t("expectedEffects")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.expectedEffects.map((effect, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-orange-400">▸</span>
                          <span className="text-muted-foreground">
                            {effect}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 앱 아이콘 & 로고 (모바일 앱 전용) */}
            {(project.images?.appIcon || project.images?.logo) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 }}
              >
                <Card className="border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Smartphone className="w-5 h-5 text-blue-400" />
                      {t("appAssets")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-6">
                      {project.images?.appIcon && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {t("appIcon")}
                          </p>
                          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-border bg-muted/30">
                            <CloudFrontImage
                              s3Key={project.images.appIcon}
                              alt="App Icon"
                            />
                          </div>
                        </div>
                      )}
                      {project.images?.logo &&
                        project.images.logo.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                              {t("logo")}
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
                                    className="!w-auto !h-full max-h-18 object-contain"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 스토어 에셋 (모바일 앱 전용) */}
            {project.images?.storeAssets && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.53 }}
              >
                <Card className="border-green-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Store className="w-5 h-5 text-green-400" />
                      {t("storeAssets")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {project.images.storeAssets.featureGraphic && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {t("featureGraphic")}
                        </p>
                        <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                          <CloudFrontImage
                            s3Key={project.images.storeAssets.featureGraphic}
                            alt="Feature Graphic"
                          />
                        </div>
                      </div>
                    )}
                    {project.images.storeAssets.introScreens &&
                      project.images.storeAssets.introScreens.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {t("introScreens")}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {project.images.storeAssets.introScreens.map(
                              (introKey, index) => (
                                <div
                                  key={index}
                                  className="relative rounded-lg overflow-hidden border border-border bg-muted/30"
                                >
                                  <CloudFrontImage
                                    s3Key={introKey}
                                    alt={`Intro Screen ${index + 1}`}
                                  />
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 모바일 스크린샷 (모바일 앱 전용) */}
            {project.images?.mobileScreenshots && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.54 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Smartphone className="w-5 h-5 text-cyan-400" />
                      {t("mobileScreenshots")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {project.images.mobileScreenshots.android &&
                      project.images.mobileScreenshots.android.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {t("androidScreenshots")}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {project.images.mobileScreenshots.android.map(
                              (ssKey, index) => (
                                <div
                                  key={index}
                                  className="relative rounded-lg overflow-hidden border border-border bg-muted/30"
                                >
                                  <CloudFrontImage
                                    s3Key={ssKey}
                                    alt={`Android Screenshot ${index + 1}`}
                                  />
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    {project.images.mobileScreenshots.ios &&
                      project.images.mobileScreenshots.ios.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-green-400">
                            {t("iosScreenshots")}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {project.images.mobileScreenshots.ios.map(
                              (ssKey, index) => (
                                <div
                                  key={index}
                                  className="relative rounded-lg overflow-hidden border border-border bg-muted/30"
                                >
                                  <CloudFrontImage
                                    s3Key={ssKey}
                                    alt={`iOS Screenshot ${index + 1}`}
                                  />
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ERD 이미지 */}
            {project.images?.erd && project.images.erd.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Database className="w-5 h-5 text-purple-400" />
                      {t("erdDiagram")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {project.images.erd.map((erdKey, index) => (
                      <div key={index} className="space-y-2">
                        {project.images!.erd!.length > 1 && (
                          <p className="text-sm font-medium text-muted-foreground">
                            {erdKey.includes("legacy")
                              ? t("erdLegacy")
                              : t("erdLatest")}
                          </p>
                        )}
                        <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                          <CloudFrontImage
                            s3Key={erdKey}
                            alt={`ERD ${index + 1}`}
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 스크린샷 */}
            {project.images?.screenshots &&
              project.images.screenshots.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <ImageIcon className="w-5 h-5 text-cyan-400" />
                        {t("screenshots")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {project.images.screenshots.map(
                        (screenshotKey, index) => (
                          <div
                            key={index}
                            className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30"
                          >
                            <CloudFrontImage
                              s3Key={screenshotKey}
                              alt={`Screenshot ${index + 1}`}
                            />
                          </div>
                        ),
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

            {/* 현장 조사 이미지 */}
            {project.images?.fieldSurvey && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MapPin className="w-5 h-5 text-green-400" />
                      {t("fieldSurvey")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                      <CloudFrontImage
                        s3Key={project.images.fieldSurvey}
                        alt="Field Survey"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* UI 디자인 개선 */}
            {project.images?.uiDesign &&
              (project.images.uiDesign.before ||
                project.images.uiDesign.after) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.68 }}
                >
                  <Card className="border-pink-500/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Palette className="w-5 h-5 text-pink-400" />
                        {t("uiDesignImprovement")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {project.images.uiDesign.before && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                              {t("designBefore")}
                            </p>
                            <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                              <CloudFrontImage
                                s3Key={project.images.uiDesign.before}
                                alt="UI Design Before"
                              />
                            </div>
                          </div>
                        )}
                        {project.images.uiDesign.after && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-pink-400">
                              {t("designAfter")}
                            </p>
                            <div className="relative w-full rounded-lg overflow-hidden border border-pink-500/30 bg-muted/30">
                              <CloudFrontImage
                                s3Key={project.images.uiDesign.after}
                                alt="UI Design After"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

            {/* 문제 해결 사례 */}
            {project.troubleShooting && project.troubleShooting.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="border-red-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      {t("troubleShooting")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {project.troubleShooting.map((item, index) => (
                      <div key={index} className="space-y-4">
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                        <div className="grid gap-3 text-sm">
                          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="font-medium text-red-400 mb-1">
                              {t("tsProblem")}
                            </p>
                            <p className="text-muted-foreground">
                              {item.problem}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <p className="font-medium text-yellow-400 mb-1">
                              {t("tsCause")}
                            </p>
                            <p className="text-muted-foreground">
                              {item.cause}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <p className="font-medium text-blue-400 mb-1">
                              {t("tsSolution")}
                            </p>
                            <p className="text-muted-foreground">
                              {item.solution}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <p className="font-medium text-green-400 mb-1">
                              {t("tsResult")}
                            </p>
                            <p className="text-muted-foreground">
                              {item.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* SEO 성과 */}
            {project.seoResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                <Card className="border-green-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Search className="w-5 h-5 text-green-400" />
                      {t("seoResult")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      {project.seoResult.description}
                    </p>

                    {/* 지표 비교 */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">{t("seoMetrics")}</h4>
                      <div className="grid gap-3">
                        {project.seoResult.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-4 gap-2 p-3 rounded-lg bg-muted/30 text-sm"
                          >
                            <span className="font-medium">{metric.label}</span>
                            <span className="text-muted-foreground">
                              {t("seoBefore")}: {metric.before}
                            </span>
                            <span className="text-muted-foreground">
                              {t("seoAfter")}: {metric.after}
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

                    {/* 키워드 변화 */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">{t("seoKeywords")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-muted/30">
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            {t("seoBefore")}
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
                            {t("seoAfter")}
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

                    {/* SEO 이미지 비교 */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">{t("seoSearchConsole")}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {t("seoBefore")}
                          </p>
                          {project.seoResult.images.before.map((imgKey, i) => (
                            <div
                              key={i}
                              className="rounded-lg overflow-hidden border border-border"
                            >
                              <CloudFrontImage
                                s3Key={imgKey}
                                alt={`SEO Before ${i + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-green-400">
                            {t("seoAfter")}
                          </p>
                          {project.seoResult.images.after.map((imgKey, i) => (
                            <div
                              key={i}
                              className="rounded-lg overflow-hidden border border-green-500/30"
                            >
                              <CloudFrontImage
                                s3Key={imgKey}
                                alt={`SEO After ${i + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
