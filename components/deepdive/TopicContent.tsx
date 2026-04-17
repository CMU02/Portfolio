"use client";

import {
  AlertTriangle,
  GitCompare,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  Check,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudFrontImage } from "@/components/cloudfront-image";
import { MermaidDiagram } from "./MermaidDiagram";
import type { DeepDiveTopic } from "@/data/projects/types";

interface TopicContentProps {
  topic: DeepDiveTopic;
}

// 중앙 메인 콘텐츠: 토픽의 5개 섹션을 순서대로 렌더링
export function TopicContent({ topic }: TopicContentProps) {
  return (
    <div className="space-y-16 max-w-[860px] mx-auto w-full">
      {/* 토픽 헤더 */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{topic.title}</h2>
        <p className="text-foreground/60">{topic.subtitle}</p>
      </div>

      {/* 1. Problem (배경) */}
      <section id="section-background" className="scroll-mt-28 space-y-4">
        <SectionHeader
          icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
          label="Problem"
          summary={topic.background.summary}
        />
        {/* Tier 1: 본문 단락 */}
        <p className="text-foreground/80 leading-relaxed">
          {topic.background.context}
        </p>
        <ul className="space-y-3">
          {topic.background.painPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="text-red-400 mt-0.5 shrink-0">▸</span>
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Trade-off (비교) */}
      <section id="section-comparison" className="scroll-mt-28 space-y-4">
        <SectionHeader
          icon={<GitCompare className="w-5 h-5 text-yellow-400" />}
          label="Trade-off"
          summary={topic.comparison.summary}
        />

        {/* 비교 카드 그리드 */}
        <div className="grid md:grid-cols-2 gap-4">
          {topic.comparison.options.map((option) => (
            <Card key={option.name} className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{option.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-green-400 mb-1.5">
                    장점
                  </p>
                  <ul className="space-y-1.5">
                    {option.pros.map((pro, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-sm text-foreground/70"
                      >
                        <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-red-400 mb-1.5">
                    단점
                  </p>
                  <ul className="space-y-1.5">
                    {option.cons.map((con, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-sm text-foreground/70"
                      >
                        <X className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 의사결정 */}
        <div className="rounded-lg border border-tech-cyan/30 bg-tech-cyan/5 p-4">
          <p className="text-sm font-medium text-tech-cyan mb-1">의사결정</p>
          <p className="text-sm text-foreground/80">
            {topic.comparison.decision}
          </p>
          {topic.comparison.tradeOff && (
            <p className="text-xs text-muted-foreground/70 mt-2 italic">
              Trade-off: {topic.comparison.tradeOff}
            </p>
          )}
        </div>
      </section>

      {/* 3. Architecture (구현) */}
      <section id="section-implementation" className="scroll-mt-28 space-y-4">
        <SectionHeader
          icon={<Layers className="w-5 h-5 text-blue-400" />}
          label="Architecture"
          summary={topic.implementation.summary}
        />
        {/* Tier 1: 본문 단락 */}
        <p className="text-foreground/80 leading-relaxed">
          {topic.implementation.description}
        </p>

        {/* 구조도 */}
        {topic.implementation.architecture && (
          <div className="rounded-lg border border-border bg-muted/50 overflow-hidden">
            {topic.implementation.architectureType === "image" ? (
              <CloudFrontImage
                s3Key={topic.implementation.architecture}
                alt={`${topic.title} 아키텍처`}
                sizes="(max-width: 768px) 100vw, 700px"
              />
            ) : (
              <MermaidDiagram chart={topic.implementation.architecture} />
            )}
          </div>
        )}

        {/* 구현 단계 */}
        {topic.implementation.steps && (
          <div className="mt-8">
            <p className="text-sm font-medium text-foreground mb-3">
              구현 흐름
            </p>
            <ol className="space-y-3">
              {topic.implementation.steps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground/70"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-tech-cyan/10 text-tech-cyan text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* 코드 스니펫 */}
        {topic.implementation.codeSnippets?.map((snippet, i) => (
          <div
            key={i}
            className="rounded-lg border border-border overflow-hidden"
          >
            <div className="bg-muted/50 px-4 py-2 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground">
                {snippet.title}
                <Badge variant="outline" className="ml-2 text-[10px]">
                  {snippet.language}
                </Badge>
              </p>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}
      </section>

      {/* 4. Verification (검증) */}
      <section id="section-verification" className="scroll-mt-28 space-y-4">
        <SectionHeader
          icon={<CheckCircle2 className="w-5 h-5 text-green-400" />}
          label="Verification"
          summary={topic.verification.summary}
        />
        {/* Tier 1: 본문 단락 */}
        <p className="text-foreground/80 leading-relaxed">
          {topic.verification.description}
        </p>
        {/* 수치 데이터 */}
        {topic.verification.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {topic.verification.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-border bg-card p-3"
              >
                <p className="text-lg font-bold text-tech-cyan">
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                {metric.description && (
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {metric.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        {/* 근거 */}
        {topic.verification.evidence && (
          <ul className="space-y-3">
            {topic.verification.evidence.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}{" "}
      </section>

      {/* 5. Retrospective (한계점 보완방향) */}
      <section id="section-limitations" className="scroll-mt-28 space-y-4">
        <SectionHeader
          icon={<ArrowUpRight className="w-5 h-5 text-tech-purple" />}
          label="Retrospective"
          summary={topic.limitations.summary}
        />
        <div className="space-y-4">
          {topic.limitations.items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-4 space-y-3"
            >
              <div>
                <p className="text-xs font-medium text-red-400 mb-1">한계점</p>
                <p className="text-sm text-foreground/70">{item.limitation}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-tech-cyan mb-1">
                  보완 방향
                </p>
                <p className="text-sm text-foreground/70">{item.improvement}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// 섹션 헤더: 아이콘 + 라벨 + 결론 한 줄 요약
function SectionHeader({
  icon,
  label,
  summary,
}: {
  icon: React.ReactNode;
  label: string;
  summary?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        {icon}
        <h3 className="text-lg font-semibold">{label}</h3>
      </div>
      {summary && (
        <p className="text-sm font-medium text-tech-cyan/90">→ {summary}</p>
      )}
    </div>
  );
}
