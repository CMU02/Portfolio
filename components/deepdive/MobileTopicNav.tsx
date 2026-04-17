"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  SECTION_LABELS,
  type DeepDiveTopic,
  type SectionKey,
} from "@/data/projects/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface MobileTopicNavProps {
  topics: DeepDiveTopic[];
  currentTopicId: string;
  projectId: string;
}

const sectionKeys = Object.keys(SECTION_LABELS) as SectionKey[];

// 모바일 전용 토픽/섹션 네비게이션 (드롭다운 형태)
export function MobileTopicNav({
  topics,
  currentTopicId,
  projectId,
}: MobileTopicNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentTopic = topics.find((t) => t.id === currentTopicId);

  return (
    <div className="lg:hidden sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border -mx-6 px-6 py-3">
      {/* 현재 토픽 표시 + 토글 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-tech-cyan truncate">
          {currentTopic?.title}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <div className="mt-3 space-y-4 pb-2">
          {/* 토픽 목록 */}
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/projects/${projectId}/${topic.id}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-full border transition-colors",
                  topic.id === currentTopicId
                    ? "border-tech-cyan text-tech-cyan bg-tech-cyan/10"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {topic.title}
              </Link>
            ))}
          </div>

          {/* 섹션 목록 */}
          <div className="flex flex-wrap gap-2">
            {sectionKeys.map((key, index) => (
              <a
                key={key}
                href={`#section-${key}`}
                onClick={() => setIsOpen(false)}
                className="text-xs px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {index + 1}. {SECTION_LABELS[key]}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
