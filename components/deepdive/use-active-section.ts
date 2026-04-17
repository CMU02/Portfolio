"use client";

import { useState, useEffect } from "react";
import { SECTION_LABELS, type SectionKey } from "@/data/projects/types";

const sectionKeys = Object.keys(SECTION_LABELS) as SectionKey[];

// 스크롤 위치에 따라 현재 활성 섹션을 감지하는 훅
export function useActiveSection(): SectionKey | null {
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 보이는 섹션 중 가장 위에 있는 것을 활성으로 설정
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.id.replace("section-", "") as SectionKey;
          setActiveSection(id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    // 각 섹션 요소를 관찰
    sectionKeys.forEach((key) => {
      const el = document.getElementById(`section-${key}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
