"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "./animated-section";

interface SectionCardProps {
  title: string;
  icon: ReactNode; // 이미 렌더링된 아이콘 노드를 받음
  borderColor?: string;
  delay?: number;
  children: ReactNode;
}

// 재사용 가능한 섹션 카드 컴포넌트
export function SectionCard({
  title,
  icon,
  borderColor,
  delay = 0,
  children,
}: SectionCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <Card className={borderColor}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </AnimatedSection>
  );
}
