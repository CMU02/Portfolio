import type { HighlightItem } from "@/data/projects/types";

interface HighlightCardsProps {
  items: HighlightItem[];
}

// 핵심 지표: 카드 대신 라벨(dt) + 큰 값(dd)을 구분선으로 나열, 값은 홈 Work 수치와 같은 글자 스타일
export function HighlightCards({ items }: HighlightCardsProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 border-t border-foreground md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-2 border-b border-border py-4 md:border-b-0 md:not-first:border-l md:not-first:pl-6 md:py-5"
        >
          <dt className="text-xs text-muted-foreground md:text-sm">
            {item.label}
          </dt>
          <dd className="text-2xl leading-none font-extrabold tracking-tight text-primary-text tabular-nums md:text-4xl">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
