import { AlertTriangle } from "lucide-react";
import { SectionCard, TroubleShootingItem } from "@/components/project-detail";
import { TroubleShooting } from "@/data/projects";

interface TroubleShootingSectionProps {
  troubleShooting: TroubleShooting[];
  delay?: number;
}

export function TroubleShootingSection({
  troubleShooting,
  delay = 0.7,
}: TroubleShootingSectionProps) {
  return (
    <SectionCard
      title="문제 해결 사례"
      icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
      borderColor="border-red-500/30"
      delay={delay}
    >
      <div className="space-y-6">
        {troubleShooting.map((item) => (
          <div key={item.title} className="space-y-4">
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
  );
}
