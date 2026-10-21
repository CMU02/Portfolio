// 회고: 한계점과 보완 방향 쌍
import type { LimitationsAttrs } from "@/data/projects/types";

export function LimitationsBlock({ items }: LimitationsAttrs) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-card p-4 space-y-3"
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
