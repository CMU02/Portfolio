"use client";

import { useEffect, useRef } from "react";

// 읽기 진행 바: 고정 헤더 바로 아래 얇은 accent 바가 스크롤 비율만큼 찬다 (장식)
export function ReadingProgress() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (fill.current) fill.current.style.transform = `scaleX(${ratio})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    // shortcut: 77px = Navigation 헤더 높이(모든 너비 동일), 헤더 높이가 바뀌면 함께 수정
    <div aria-hidden className="fixed inset-x-0 top-[77px] z-40 h-[3px] bg-border">
      <div ref={fill} className="h-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
