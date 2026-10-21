"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DeepDiveTopic, TocItem } from "@/data/projects/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useActiveSection } from "./use-active-section";

interface MobileTopicNavProps {
  topics: DeepDiveTopic[];
  currentTopicId: string;
  projectId: string;
  sections: TocItem[];
}

const focusRing =
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

// 모바일 전용 토픽/섹션 네비게이션 (드롭다운 형태, 터치 영역 최소 44px)
export function MobileTopicNav({
  topics,
  currentTopicId,
  projectId,
  sections,
}: MobileTopicNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSectionId = useActiveSection(sections, containerRef);
  const currentTopic = topics.find((t) => t.id === currentTopicId);
  const activeSection = sections.find((s) => s.id === activeSectionId);

  return (
    // 고정 헤더(링크·토글 44px)가 모든 너비에서 77px이라 그 아래에 붙인다
    <div
      ref={containerRef}
      className="lg:hidden sticky top-[77px] z-40 bg-background/95 backdrop-blur-sm border-b border-border -mx-6 px-6 py-1"
    >
      {/* 현재 토픽 + 현재 섹션 표시 + 토글 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-2 w-full min-h-11 text-sm rounded-md",
          focusRing,
        )}
        aria-expanded={isOpen}
        aria-controls="mobile-topic-nav"
      >
        <span className="min-w-0 truncate text-left">
          <span className="font-medium text-primary-text">
            {currentTopic?.title}
          </span>
          {activeSection && (
            <span className="text-muted-foreground">
              {" "}
              · {activeSection.label}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <div id="mobile-topic-nav" className="mt-2 space-y-3 pb-3">
          {/* 토픽 목록 */}
          <nav aria-label="토픽 목록" className="flex flex-wrap gap-x-4">
            {topics.map((topic) => {
              const isActive = topic.id === currentTopicId;
              return (
                <Link
                  key={topic.id}
                  href={`/projects/${projectId}/${topic.id}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center min-h-11 text-sm transition-colors",
                    focusRing,
                    isActive
                      ? "text-primary-text font-medium underline decoration-2 underline-offset-4"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {topic.title}
                </Link>
              );
            })}
          </nav>

          {/* 섹션 목록 */}
          <nav aria-label="섹션 목록" className="flex flex-wrap gap-x-4 border-t border-border pt-1">
            {sections.map(({ id, label }, index) => {
              const isActive = id === activeSectionId;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "inline-flex items-center min-h-11 text-xs transition-colors",
                    focusRing,
                    isActive
                      ? "text-primary-text font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {index + 1}. {label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
