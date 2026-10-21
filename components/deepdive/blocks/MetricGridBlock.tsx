// 검증 수치 카드 그리드
import type { MetricGridAttrs } from "@/data/projects/types";

export function MetricGridBlock({ items }: MetricGridAttrs) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((metric) => (
        <div
          key={metric.label}
          className="rounded-lg border border-border bg-card p-3"
        >
          <p className="text-lg font-bold text-primary-text">{metric.value}</p>
          <p className="text-xs text-muted-foreground">{metric.label}</p>
          {metric.description && (
            <p className="text-xs text-muted-foreground mt-1">
              {metric.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
