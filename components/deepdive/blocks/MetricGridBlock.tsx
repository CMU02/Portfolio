// 검증 수치: 카드 대신 위쪽 구분선 + 큰 값
import type { MetricGridAttrs } from "@/data/projects/types";

export function MetricGridBlock({ items }: MetricGridAttrs) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
      {items.map((metric) => (
        <div
          key={metric.label}
          className="border-t border-border pt-3"
        >
          <p className="text-2xl font-extrabold tracking-tight text-primary-text tabular-nums">
            {metric.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
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
