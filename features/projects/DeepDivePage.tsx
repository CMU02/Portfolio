// 딥다이브 공통 템플릿 (서버 컴포넌트): 가운데 한 단 롱폼 아티클
// 본문은 Tiptap JSON을 서버에서 정적 렌더링하고, 읽기 진행 바만 클라이언트로 내린다.
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ExternalLink,
  FileText,
  Github,
  Store,
  User,
  Users,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import {
  HighlightCards,
  ProjectInfo,
  ReadingProgress,
  RichText,
} from "@/components/deepdive";
import { projectsData } from "@/data/projects";
import { findTopic, loadTopicContent } from "@/lib/deepdive-content";
import type { ProjectId } from "./types";

interface Props {
  projectId: ProjectId;
  topicId: string;
}

const no = (i: number) => String(i + 1).padStart(2, "0");

export async function DeepDivePage({ projectId, topicId }: Props) {
  const found = findTopic(projectId, topicId);
  const project = projectsData.find((p) => p.id === projectId);
  if (!found || !project) notFound();

  const { deepDive, topic } = found;
  const { doc, toc } = await loadTopicContent(projectId, topicId);
  const { topics } = deepDive;
  const index = topics.indexOf(topic);
  const prev = topics[index - 1];
  const next = topics[index + 1];
  const href = (id: string) => `/projects/${projectId}/${id}`;

  const links = [
    { url: project.githubUrl, label: "GitHub", Icon: Github },
    { url: project.demoUrl, label: "서비스", Icon: ExternalLink },
    { url: project.playStoreUrl, label: "Play Store", Icon: Store },
    { url: project.appStoreUrl, label: "App Store", Icon: Store },
  ].filter((l) => l.url);
  const TeamIcon = project.type === "team" ? Users : User;

  return (
    <main className="min-h-screen">
      <Navigation />
      <ReadingProgress />

      <article className="mx-auto max-w-[720px] px-6 pt-24 pb-24 md:pt-28">
        {/* 상단 줄: 홈 Work로 돌아가기 + 문서 위치 */}
        <div className="mb-8 flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link
            href="/#work"
            className="-ml-1 inline-flex min-h-11 items-center gap-1.5 px-1 transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Work
          </Link>
          <span className="tabular-nums">
            문서 {index + 1} / {topics.length}
          </span>
        </div>

        <header>
          <p className="flex items-center gap-1.5 text-xs font-bold tracking-[0.08em] text-primary-text uppercase md:text-sm">
            <TeamIcon aria-hidden className="size-4" />
            {project.title} ·{" "}
            {project.type === "team" ? `${project.teamSize}인 팀` : "개인"}
          </p>
          <h1 className="mt-3 text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-balance md:text-5xl">
            {topic.title}
          </h1>
          <p className="mt-4 text-lg text-foreground/80 text-balance md:text-xl">
            {topic.subtitle}
          </p>
          <div className="mt-4 space-y-1 text-sm text-muted-foreground">
            <p>
              {project.subtitle} · {project.techStack.join(" · ")}
            </p>
            <p className="flex items-center gap-1.5">
              <Calendar aria-hidden className="size-4 shrink-0" />
              {deepDive.period}
            </p>
          </div>
          {links.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-5 text-sm font-medium">
              {links.map(({ url, label, Icon }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 text-foreground underline-offset-4 hover:text-primary-text hover:underline"
                  >
                    <Icon aria-hidden className="size-4" />
                    {label}
                    <ArrowUpRight aria-hidden className="size-4 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="mt-10">
          <HighlightCards items={deepDive.highlights} />
        </div>

        {/* 이 프로젝트의 문서 + 이 문서의 장: 사이드바 대신 짧은 목록 */}
        <nav aria-labelledby="doc-list" className="mt-10">
          <h2
            id="doc-list"
            className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"
          >
            <FileText aria-hidden className="size-4" />
            이 프로젝트의 문서
          </h2>
          <ol className="mt-2">
            {topics.map((t, i) => {
              const current = t.id === topicId;
              return (
                <li key={t.id}>
                  <Link
                    href={href(t.id)}
                    aria-current={current ? "page" : undefined}
                    className={`flex min-h-11 items-baseline gap-3 py-2 transition-colors ${
                      current
                        ? "font-bold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`text-sm tabular-nums ${current ? "text-primary-text" : ""}`}
                    >
                      {no(i)}
                    </span>
                    {t.title}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
        {toc.length > 0 && (
          <nav aria-label="이 문서의 장" className="mt-3 border-t border-border pt-2">
            <ol className="flex flex-wrap gap-x-5 text-sm">
              {toc.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex min-h-11 items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="tabular-nums text-primary-text">{no(i)}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-16">
          <RichText doc={doc} />
        </div>

        {(prev || next) && (
          <nav
            aria-label="이전·다음 문서"
            className="mt-20 grid gap-6 border-t-2 border-foreground pt-6 md:grid-cols-2"
          >
            {prev && (
              <Link href={href(prev.id)} className="group flex min-h-11 flex-col gap-2">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ArrowLeft aria-hidden className="size-4" />
                  이전 문서
                </span>
                <span className="text-xl font-bold tracking-tight text-balance group-hover:text-primary-text md:text-2xl">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={href(next.id)}
                className="group flex min-h-11 flex-col gap-2 md:col-start-2 md:items-end md:text-right"
              >
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  다음 문서
                  <ArrowRight aria-hidden className="size-4" />
                </span>
                <span className="text-xl font-bold tracking-tight text-balance group-hover:text-primary-text md:text-2xl">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        <ProjectInfo sections={deepDive.sideInfo} />
      </article>
    </main>
  );
}
