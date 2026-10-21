// 회고: 한계점과 보완 방향 쌍, 항목 사이는 구분선
import type { LimitationsAttrs } from "@/data/projects/types";

export function LimitationsBlock({ items }: LimitationsAttrs) {
  return (
    <div className="border-b border-border">
      {items.map((item, i) => (
        <div
          key={i}
          className="border-t border-border py-4 grid gap-3 md:grid-cols-2 md:gap-8"
        >
          <div>
            <p className="text-xs font-medium text-destructive mb-1">한계점</p>
            <p className="text-sm text-foreground/80">{item.limitation}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-primary-text mb-1">보완 방향</p>
            <p className="text-sm text-foreground/80">{item.improvement}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
