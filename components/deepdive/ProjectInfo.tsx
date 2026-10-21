import { ExternalLink } from "lucide-react";
import type { SideInfoSection } from "@/data/projects/types";
import { infoIcons } from "./icons";

// 프로젝트 정보: 역할·기술 스택·AI 도구·인증·추가 자료(sideInfo)를 본문 끝 정의 목록으로 (2열, 모바일 1열)
export function ProjectInfo({ sections }: { sections: SideInfoSection[] }) {
  return (
    <section aria-labelledby="project-info" className="mt-20">
      <h2
        id="project-info"
        className="border-t-2 border-foreground pt-4 text-2xl font-extrabold tracking-tight"
      >
        프로젝트 정보
      </h2>
      <dl className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = infoIcons[section.title];
          return (
            <div key={section.title} className="border-t border-border pt-3">
              <dt className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                {Icon && <Icon aria-hidden className="size-4 shrink-0" />}
                {section.title}
              </dt>
              <dd className="mt-2">
                <ul className="space-y-1.5 text-foreground/80 leading-relaxed">
                  {section.items.map((item) => {
                    const external = item.url?.startsWith("http");
                    return (
                      <li key={item.label}>
                        {item.url ? (
                          <a
                            href={item.url}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            className="inline-flex min-h-11 items-center gap-1.5 font-medium text-primary-text underline underline-offset-4 hover:text-foreground"
                          >
                            {item.label}
                            <ExternalLink aria-hidden className="size-4 shrink-0" />
                          </a>
                        ) : (
                          item.label
                        )}
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
