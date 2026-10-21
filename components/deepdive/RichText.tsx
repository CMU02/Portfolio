// 딥다이브 본문 렌더러 (서버 컴포넌트)
// Tiptap JSON을 서버에서 React로 그려 공개 페이지에 편집기 JS가 실리지 않게 한다
import type { ReactNode } from "react";
import type { JSONContent } from "@tiptap/core";
import type { Node as PMNode } from "@tiptap/pm/model";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { CheckCircle2, Quote } from "lucide-react";
import { sectionIcons } from "./icons";
import { extensions } from "@/lib/tiptap/extensions";
import { CloudFrontImage } from "@/components/cloudfront-image";
import type { VideoAttrs } from "@/data/projects/types";
import { CodeBlock } from "./blocks/CodeBlock";
import { ComparisonBlock } from "./blocks/ComparisonBlock";
import { MetricGridBlock } from "./blocks/MetricGridBlock";
import { LimitationsBlock } from "./blocks/LimitationsBlock";
import { GalleryBlock } from "./blocks/GalleryBlock";
import { VideoBlock } from "./blocks/VideoBlock";
import { MermaidBlock } from "./blocks/MermaidBlock";

// node/parent는 ProseMirror 인스턴스라 클라이언트 블록에는 attrs 값만 넘긴다
type NodeProps = { node: PMNode; parent?: PMNode; children?: ReactNode };

// JSON h2 = 섹션(목차/앵커), 페이지 h1(토픽 제목) 아래 그대로 h2/h3로 렌더링
// sectionNo: 최상위 h2 id → "01", "02"… (목차 순서)
const heading =
  (sectionNo: Map<string, string>) =>
  ({ node, children }: NodeProps) => {
    const Icon = sectionIcons[node.attrs.id];
    return node.attrs.level === 2 ? (
      // space-y-4(1rem)와 합쳐 섹션 간격 4.5rem, scroll-mt: 고정 헤더 + 진행 바 아래로 앵커가 오게 한다
      <h2
        id={node.attrs.id ?? undefined}
        className="scroll-mt-24 mt-14 first:mt-0 text-2xl font-extrabold tracking-tight text-balance md:text-[1.75rem]"
      >
        {sectionNo.has(node.attrs.id) && (
          <span className="mr-3 text-primary-text tabular-nums">
            {sectionNo.get(node.attrs.id)}
          </span>
        )}
        {Icon && (
          <Icon
            aria-hidden
            className="mr-2 inline-block size-5 align-[-0.1em] text-muted-foreground"
          />
        )}
        {children}
      </h2>
    ) : (
      <h3
        id={node.attrs.id ?? undefined}
        className="pt-4 text-lg font-bold text-foreground text-balance"
      >
        {children}
      </h3>
    );
  };

const nodeMapping: Record<string, (props: NodeProps) => ReactNode> = {
  sectionSummary: ({ children }) => (
    <p className="text-sm font-medium text-primary-text">→ {children}</p>
  ),
  // 목록/콜아웃 안 문단은 부모 글자 스타일을 그대로 물려받는다
  paragraph: ({ parent, children }) =>
    parent?.type.name === "doc" ? (
      <p className="text-foreground/80 leading-[1.8] md:text-[1.0625rem]">{children}</p>
    ) : (
      <p>{children}</p>
    ),
  bulletList: ({ node, children }) => (
    <ul
      className={`space-y-2 text-foreground/80 leading-relaxed ${
        node.attrs.variant ? "" : "list-disc pl-5"
      }`}
    >
      {children}
    </ul>
  ),
  orderedList: ({ node, children }) => (
    <ol
      start={node.attrs.start}
      className="list-decimal pl-5 space-y-2 text-foreground/80 leading-relaxed marker:font-bold marker:text-primary-text"
    >
      {children}
    </ol>
  ),
  // pain(▸)/check 목록은 마커를 직접 그리고, 그 외는 브라우저 기본 마커
  listItem: ({ parent, children }) => {
    const variant =
      parent?.type.name === "bulletList" ? parent.attrs.variant : null;
    if (variant !== "pain" && variant !== "check") {
      return <li className="space-y-2">{children}</li>;
    }
    return (
      <li className="flex items-start gap-2">
        {variant === "pain" ? (
          <span aria-hidden className="text-destructive shrink-0">
            ▸
          </span>
        ) : (
          <CheckCircle2
            aria-hidden
            className="size-4 mt-1 text-primary shrink-0"
          />
        )}
        <div className="min-w-0 space-y-2">{children}</div>
      </li>
    );
  },
  codeBlock: ({ node }) => (
    <CodeBlock
      title={node.attrs.title}
      language={node.attrs.language}
      code={node.textContent}
    />
  ),
  decision: ({ node, children }) => (
    // 풀 인용: 왼쪽 accent 세로선 + 큰 글자
    <div className="my-10 border-l-[3px] border-primary pl-5 md:pl-6 space-y-3">
      <p className="flex items-center gap-1.5 text-xs font-bold tracking-[0.08em] text-primary-text">
        <Quote aria-hidden className="size-4" />
        의사결정
      </p>
      <div className="text-lg font-bold leading-snug tracking-tight text-foreground md:text-xl">
        {children}
      </div>
      {node.attrs.tradeOff && (
        <p className="text-sm text-muted-foreground">
          Trade-off: {node.attrs.tradeOff}
        </p>
      )}
    </div>
  ),
  comparison: ({ node }) => <ComparisonBlock options={node.attrs.options} />,
  metricGrid: ({ node }) => <MetricGridBlock items={node.attrs.items} />,
  limitations: ({ node }) => <LimitationsBlock items={node.attrs.items} />,
  architectureImage: ({ node }) => (
    <div className="border border-border overflow-hidden">
      <CloudFrontImage
        s3Key={node.attrs.s3Key}
        alt={node.attrs.alt}
        width={node.attrs.width}
        height={node.attrs.height}
        sizes="(max-width: 768px) 100vw, 700px"
      />
    </div>
  ),
  mermaid: ({ node }) => <MermaidBlock chart={node.attrs.chart} />,
  gallery: ({ node }) => <GalleryBlock items={node.attrs.items} />,
  video: ({ node }) => <VideoBlock {...(node.attrs as VideoAttrs)} />,
};

export function RichText({ doc }: { doc: JSONContent }) {
  const sectionNo = new Map(
    (doc.content ?? [])
      .filter((n) => n.type === "heading" && n.attrs?.level === 2 && n.attrs.id)
      .map((n, i) => [n.attrs!.id as string, String(i + 1).padStart(2, "0")]),
  );
  return (
    // 링크는 StarterKit 기본 <a>(href 검증 포함)를 쓰고 스타일만 입힌다
    <div className="space-y-4 [&_a]:text-primary-text [&_a]:underline [&_a]:underline-offset-4">
      {renderToReactElement({
        extensions,
        content: doc,
        options: { nodeMapping: { ...nodeMapping, heading: heading(sectionNo) } },
      })}
    </div>
  );
}
