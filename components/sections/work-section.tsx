import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { deepDives } from "@/lib/deepdive-content";
import type { ProjectId } from "@/features/projects/types";

// 프로젝트를 표처럼 한 줄씩: 왼쪽 이름·설명·유형, 오른쪽 딥다이브 첫 지표 하나
export function WorkSection() {
  return (
    <section id="work" className="container mx-auto scroll-mt-20 px-6 pb-20">
      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
        Work
      </h2>
      <ul className="border-t border-foreground">
        {projectsData.map((project) => {
          const metric = deepDives[project.id as ProjectId].highlights[0];
          return (
            <li key={project.id} className="border-b border-border">
              <Link
                href={`/projects/${project.id}`}
                className="group -mx-3 grid grid-cols-[1fr_auto] items-center gap-x-4 px-3 py-4 transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:-outline-offset-2 md:grid-cols-[1fr_auto_auto] md:gap-x-8 md:py-6"
              >
                <span className="min-w-0">
                  <span className="text-xl font-bold tracking-tight md:text-3xl">
                    {project.title}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground md:text-sm">
                    {project.type === "team"
                      ? `${project.teamSize}인 팀`
                      : "개인"}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground md:text-base">
                    {project.subtitle}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-2xl leading-none font-extrabold tracking-tight text-primary-text tabular-nums md:text-5xl">
                    {metric.value}
                  </span>
                  <span className="mt-1.5 block text-xs text-muted-foreground md:text-sm">
                    {metric.label}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="hidden size-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground motion-reduce:transition-none md:block"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
