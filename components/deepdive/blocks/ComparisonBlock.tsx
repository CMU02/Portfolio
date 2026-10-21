// 선택지 비교: 옵션별 장점/단점 카드 그리드
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ComparisonAttrs } from "@/data/projects/types";

export function ComparisonBlock({ options }: ComparisonAttrs) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {options.map((option) => (
        <Card key={option.name} className="bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{option.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ProsCons label="장점" items={option.pros} positive />
            <ProsCons label="단점" items={option.cons} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProsCons({
  label,
  items,
  positive = false,
}: {
  label: string;
  items: string[];
  positive?: boolean;
}) {
  const Icon = positive ? Check : X;
  const color = positive ? "text-primary-text" : "text-destructive";
  return (
    <div>
      <p className={`text-xs font-medium mb-1.5 ${color}`}>{label}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-1.5 text-sm text-foreground/80"
          >
            <Icon
              aria-hidden
              className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${color}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
