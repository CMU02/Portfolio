"use client";

import { useState, useEffect, type RefObject } from "react";
import type { TocItem } from "@/data/projects/types";

// 섹션 h2의 scroll-mt(모바일 최대 144px)보다 조금 아래까지를 "지나간" 것으로 본다
const ACTIVE_OFFSET = 152;

// 스크롤 위치에 따라 현재 활성 섹션 id를 감지하는 훅
// 본문에 섹션 래퍼가 없고 h2만 앵커이므로, 마지막으로 상단을 지난 h2를 활성으로 본다
// 사이드바/모바일 목차가 둘 다 마운트되므로 CSS로 숨겨진(display:none) 쪽은 계산을 건너뛴다
export function useActiveSection(
  sections: TocItem[],
  containerRef: RefObject<HTMLElement | null>,
): string | null {
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null,
  );

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!containerRef.current?.offsetParent) return;
      let current = sections[0]?.id ?? null;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
      }
      // 마지막 섹션은 짧아서 상단까지 못 올라오므로, 페이지 끝에 닿으면 마지막 섹션으로 본다
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = sections.at(-1)?.id ?? current;
      }
      setActiveId(current);
    };

    // rAF로 스크롤 이벤트를 프레임당 1회로 제한
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections, containerRef]);

  return activeId;
}
