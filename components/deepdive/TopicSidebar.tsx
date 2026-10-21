"use client";

import { cn } from "@/lib/utils";
import type { DeepDiveTopic, TocItem } from "@/data/projects/types";
import Link from "next/link";
import { useRef } from "react";
import { useActiveSection } from "./use-active-section";

interface TopicSidebarProps {
  topics: DeepDiveTopic[];
  currentTopicId: string;
  projectId: string;
  sections: TocItem[];
}

// 좌측 이중 목차: 토픽 목차 + 현재 토픽의 섹션 목차 (본문 h2에서 추출)
export function TopicSidebar({
  topics,
  currentTopicId,
  projectId,
  sections,
}: TopicSidebarProps) {
  const asideRef = useRef<HTMLElement>(null);
  const activeSectionId = useActiveSection(sections, asideRef);

  return (
    <aside ref={asideRef} className="hidden lg:block w-56 shrink-0">
      <nav
        className="sticky top-28 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
        aria-label="토픽 목차"
      >
        {/* 토픽 목차 */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Topics
          </p>
          <ul className="space-y-1">
            {topics.map((topic) => {
              const isActive = topic.id === currentTopicId;
              return (
                <li key={topic.id}>
                  <Link
                    href={`/projects/${projectId}/${topic.id}`}
                    className={cn(
                      "block text-sm py-1.5 px-3 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring focus-visible:outline-none",
                      isActive
                        ? "bg-tech-cyan/10 text-primary-text font-medium border-l-2 border-tech-cyan"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {topic.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 현재 토픽의 섹션 목차 */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Sections
          </p>
          <ul className="space-y-1">
            {sections.map(({ id, label }, index) => {
              const isActive = activeSectionId === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={cn(
                      "block text-sm py-1.5 px-3 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring focus-visible:outline-none",
                      isActive
                        ? "text-primary-text font-medium border-l-2 border-tech-cyan bg-tech-cyan/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {index + 1}. {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
