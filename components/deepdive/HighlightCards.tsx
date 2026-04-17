"use client";

import { DollarSign, Zap, ShieldCheck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HighlightItem } from "@/data/projects/types";

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Zap,
  ShieldCheck,
  CheckCircle,
};

interface HighlightCardsProps {
  items: HighlightItem[];
}

// 첫 번째 KPI를 대표 지표로 강조, 나머지는 보조화
export function HighlightCards({ items }: HighlightCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {items.map((item, index) => {
        const Icon = item.icon ? iconMap[item.icon] : null;
        const isPrimary = index === 0;
        return (
          <div
            key={item.label}
            className={cn(
              "rounded-lg border p-4 text-center",
              isPrimary
                ? "border-tech-cyan/40 bg-tech-cyan/10"
                : "border-border bg-card/50",
            )}
          >
            {Icon && (
              <Icon
                className={cn(
                  "w-5 h-5 mx-auto mb-2",
                  isPrimary ? "text-tech-cyan" : "text-muted-foreground",
                )}
              />
            )}
            <p
              className={cn(
                "font-bold",
                isPrimary
                  ? "text-2xl text-tech-cyan"
                  : "text-lg text-foreground",
              )}
            >
              {item.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}
