import { Target } from "lucide-react";
import { CloudFrontImage } from "@/components/cloudfront-image";
import { SectionCard } from "@/components/project-detail";
import { ProblemSection as ProblemSectionType } from "@/data/projects";

interface ProblemSectionProps {
  problems: ProblemSectionType[];
  delay?: number;
}

export function ProblemSection({
  problems,
  delay = 0.25,
}: ProblemSectionProps) {
  return (
    <SectionCard
      title="해결한 문제"
      icon={<Target className="w-5 h-5 text-red-400" />}
      delay={delay}
    >
      <div className="grid gap-6">
        {problems.map((item) => (
          <div key={item.title} className="space-y-3">
            <h4 className="font-semibold text-base">{item.title}</h4>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {item.description}
            </p>
            {item.images && item.images.length > 0 && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {item.images.slice(0, 3).map((imgKey) => (
                    <div
                      key={imgKey}
                      className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30"
                    >
                      <CloudFrontImage
                        s3Key={imgKey}
                        alt={`${item.title} 사례`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
                {item.images[3] && (
                  <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
                    <CloudFrontImage
                      s3Key={item.images[3]}
                      alt={`${item.title} 추가 사례`}
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
  );
}
