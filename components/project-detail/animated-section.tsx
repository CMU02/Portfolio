"use client";

import * as motion from "motion/react-client";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// 재사용 가능한 애니메이션 섹션 컴포넌트
export function AnimatedSection({
  children,
  delay = 0,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
