import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SideInfoSection } from "@/data/projects/types";

interface SubInfoPanelProps {
  sections: SideInfoSection[];
}

// 우측 서브 정보 패널: 인증/자격, AI 도구, 추가 자료
export function SubInfoPanel({ sections }: SubInfoPanelProps) {
  return (
    <aside className="hidden xl:block w-52 shrink-0">
      <div className="sticky top-28 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pl-2">
        {sections.map((section) => (
          <div key={section.title} className="border-t border-border pt-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {section.title}
            </p>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.label}>
                  {item.url ? (
                    <Link
                      href={item.url}
                      target={
                        item.url.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary-text transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
