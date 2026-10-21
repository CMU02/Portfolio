import type { HighlightItem } from "@/data/projects/types";
import { highlightIcons } from "./icons";

interface HighlightCardsProps {
  items: HighlightItem[];
}

// 핵심 지표: 위 굵은 먹색 선과 아래 가는 선 사이에 큰 숫자를 가로로, 라벨(dt)은 숫자 아래에 보이도록 뒤집는다
export function HighlightCards({ items }: HighlightCardsProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t-2 border-b border-t-foreground border-b-border py-5 md:grid-cols-4 md:py-6">
      {items.map((item) => {
        const Icon = item.icon ? highlightIcons[item.icon] : undefined;
        return (
          <div key={item.label} className="flex flex-col-reverse gap-2">
            <dt className="flex items-start gap-1.5 text-xs text-muted-foreground md:text-sm">
              {Icon && <Icon aria-hidden className="size-4 shrink-0 md:mt-0.5" />}
              {item.label}
            </dt>
            <dd className="text-3xl leading-none font-extrabold tracking-tight text-primary-text tabular-nums md:text-4xl">
              {item.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
