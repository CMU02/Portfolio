// 선택지 비교: 옵션별 장점/단점, 카드 대신 위쪽 구분선으로 나눈다
import { Check, X } from "lucide-react";
import type { ComparisonAttrs } from "@/data/projects/types";

export function ComparisonBlock({ options }: ComparisonAttrs) {
  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
      {options.map((option) => (
        <div
          key={option.name}
          className="border-t border-foreground pt-3 space-y-3"
        >
          <p className="font-semibold">{option.name}</p>
          <ProsCons label="장점" items={option.pros} positive />
          <ProsCons label="단점" items={option.cons} />
        </div>
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
  // 강조는 accent 하나, 단점은 보조 글자색
  const color = positive ? "text-primary-text" : "text-muted-foreground";
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
              className={`size-4 mt-0.5 shrink-0 ${color}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
