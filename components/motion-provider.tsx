"use client";

import { MotionConfig } from "motion/react";

// OS의 '동작 줄이기' 설정을 켠 사용자에게는 이동/무한 반복 애니메이션을 끈다
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
