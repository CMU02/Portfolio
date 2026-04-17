"use client";

import { cn } from "@/lib/utils";
import {
  SECTION_LABELS,
  type DeepDiveTopic,
  type SectionKey,
} from "@/data/projects/types";
import Link from "next/link";

interface TopicSidebarProps {
  topics: DeepDiveTopic[];
  currentTopicId: string;
  activeSectionId: SectionKey | null;
  projectId: string;
}

const sectionKeys = Object.keys(SECTION_LABELS) as SectionKey[];

// 좌측 이중 목차: 토픽 목차 + 현재 토픽의 섹션 목차
export function TopicSidebar({
  topics,
  currentTopicId,
  activeSectionId,
  projectId,
}: TopicSidebarProps) {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <nav
        className="sticky top-28 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
        aria-label="토픽 목차"
      >
        {/* 토픽 목차 */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Topics
          </h3>
          <ul className="space-y-1">
            {topics.map((topic) => {
              const isActive = topic.id === currentTopicId;
              return (
                <li key={topic.id}>
                  <Link
                    href={`/projects/${projectId}/${topic.id}`}
                    className={cn(
                      "block text-sm py-1.5 px-3 rounded-md transition-colors",
                      isActive
                        ? "bg-tech-cyan/10 text-tech-cyan font-medium border-l-2 border-tech-cyan"
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
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Sections
          </h3>
          <ul className="space-y-1">
            {sectionKeys.map((key, index) => {
              const isActive = activeSectionId === key;
              return (
                <li key={key}>
                  <a
                    href={`#section-${key}`}
                    className={cn(
                      "block text-sm py-1.5 px-3 rounded-md transition-colors",
                      isActive
                        ? "text-tech-cyan font-medium border-l-2 border-tech-cyan bg-tech-cyan/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    {index + 1}. {SECTION_LABELS[key]}
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
