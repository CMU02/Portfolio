import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CloudFrontImage } from "@/components/cloudfront-image";
import { SectionCard } from "@/components/project-detail";
import { SeoResult } from "@/data/projects";
import { formatDateKorean, getChangeColorClass } from "../utils";

interface SeoResultSectionProps {
  seoResult: SeoResult;
  delay?: number;
}

export function SeoResultSection({
  seoResult,
  delay = 0.75,
}: SeoResultSectionProps) {
  return (
    <SectionCard
      title="SEO 성과"
      icon={<Search className="w-5 h-5 text-green-400" />}
      borderColor="border-green-500/30"
      delay={delay}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">{seoResult.description}</p>

        {/* 구글 검색어 순위 */}
        {seoResult.searchRankings && seoResult.searchRankings.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">구글 검색어 순위</h4>
            <div className="grid gap-4">
              {seoResult.searchRankings.map((ranking) => (
                <div key={ranking.image} className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {formatDateKorean(ranking.date)}
                  </p>
                  <div className="rounded-lg overflow-hidden border border-border">
                    <CloudFrontImage
                      s3Key={ranking.image}
                      alt={`검색 순위 ${ranking.date}`}
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 지표 변화 */}
        <div className="space-y-3">
          <h4 className="font-semibold">지표 변화</h4>
          <div className="grid gap-3">
            {seoResult.metrics.map((metric) => (
              <div
                key={metric.label}
                className="grid grid-cols-4 gap-2 p-3 rounded-lg bg-muted/30 text-sm"
              >
                <span className="font-medium">{metric.label}</span>
                <span className="text-muted-foreground">
                  적용 전: {metric.before}
                </span>
                <span className="text-muted-foreground">
                  적용 후: {metric.after}
                </span>
                <span className={getChangeColorClass(metric.change)}>
                  {metric.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 키워드 변화 */}
        <div className="space-y-3">
          <h4 className="font-semibold">키워드 변화</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                적용 전
              </p>
              <div className="flex flex-wrap gap-2">
                {seoResult.keywords.before.map((keyword) => (
                  <Badge key={keyword} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-400 mb-2">적용 후</p>
              <div className="flex flex-wrap gap-2">
                {seoResult.keywords.after.map((keyword) => (
                  <Badge
                    key={keyword}
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

        {/* Google Search Console */}
        <div className="space-y-3">
          <h4 className="font-semibold">Google Search Console</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                적용 전
              </p>
              {seoResult.images.before.map((imgKey) => (
                <div
                  key={imgKey}
                  className="rounded-lg overflow-hidden border border-border"
                >
                  <CloudFrontImage
                    s3Key={imgKey}
                    alt="SEO 적용 전"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-400">적용 후</p>
              {seoResult.images.after.map((imgKey) => (
                <div
                  key={imgKey}
                  className="rounded-lg overflow-hidden border border-green-500/30"
                >
                  <CloudFrontImage
                    s3Key={imgKey}
                    alt="SEO 적용 후"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
