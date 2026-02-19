"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "./animated-section";

interface SectionCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  borderColor?: string;
  delay?: number;
  children: ReactNode;
}

// 재사용 가능한 섹션 카드 컴포넌트
export function SectionCard({
  title,
  icon: Icon,
  iconColor = "text-muted-foreground",
  borderColor,
  delay = 0,
  children,
}: SectionCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <Card className={borderColor}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </AnimatedSection>
  );
}
