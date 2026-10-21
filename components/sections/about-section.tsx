import Link from "next/link";
import { ArrowRight, Award, Cloud, Database, Monitor, Server, TrendingUp, type LucideIcon } from "lucide-react";
import { techStackData } from "@/data/tech-stack";
import { growthStoriesData } from "@/data/growth-stories";

// 백엔드 포지셔닝에 맞춰 백엔드부터 나열한다
const techRows = [
  ["Backend", "backend", Server],
  ["Database", "database", Database],
  ["DevOps", "devops", Cloud],
  ["Frontend", "frontend", Monitor],
] as const satisfies readonly (readonly [string, string, LucideIcon])[];

const dtClass = "flex items-center gap-2 font-semibold";
const iconClass = "size-4 shrink-0 text-muted-foreground";
const rowClass =
  "grid gap-1 border-t border-border py-4 sm:grid-cols-[8rem_1fr] sm:gap-6";

export function AboutSection() {
  return (
    <section
      id="about"
      className="container mx-auto scroll-mt-20 px-6 pb-20 md:grid md:grid-cols-[1fr_2fr] md:gap-12"
    >
      <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
        About
      </h2>
      <div className="mt-6 max-w-[70ch] md:mt-0">
        <p className="text-lg leading-relaxed md:text-xl">
          Java/Spring Boot 백엔드와 AWS 인프라 중심으로 서비스를 만듭니다. 한번
          떠올린 아이디어는 실제로 굴러갈 때까지 놓지 않고, 기획부터
          배포·운영까지 끝까지 밀어붙입니다. 성능 수치와 장애 로그를 보며
          집요하게 개선하고, 멋진 기술보다 끝까지 살아남는 프로젝트를
          우선합니다.
        </p>

        <dl className="mt-10 border-b border-border text-sm md:text-base">
          {techRows.map(([label, id, Icon]) => (
            <div key={id} className={rowClass}>
              <dt className={dtClass}>
                <Icon aria-hidden className={iconClass} />
                {label}
              </dt>
              <dd className="text-muted-foreground">
                {techStackData[id].items.map((item) => item.name).join(" · ")}
              </dd>
            </div>
          ))}
          <div className={rowClass}>
            <dt className={dtClass}>
              <Award aria-hidden className={iconClass} />
              자격증
            </dt>
            <dd>
              <Link
                href="/certifications"
                className="inline-flex min-h-11 items-center gap-1.5 text-primary-text underline underline-offset-4 hover:no-underline"
              >
                AWS Certified Solutions Architect – Associate
                <ArrowRight aria-hidden className="size-4 shrink-0" />
              </Link>
            </dd>
          </div>
          <div className={rowClass}>
            <dt className={dtClass}>
              <TrendingUp aria-hidden className={iconClass} />
              성장
            </dt>
            <dd>
              <ul className="space-y-1">
                {growthStoriesData.map((story) => (
                  <li key={story.id}>
                    {story.title}
                    <span className="text-muted-foreground">
                      {" "}
                      · {story.project}
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
