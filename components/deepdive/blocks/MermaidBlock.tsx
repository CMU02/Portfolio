"use client";

// mermaid 블록: ssr:false 동적 import는 서버 컴포넌트에서 쓸 수 없어 이 클라이언트 파일에 둔다
import dynamic from "next/dynamic";
import type { MermaidAttrs } from "@/data/projects/types";

// mermaid 번들은 수백 KB라 mermaid 노드가 있는 토픽에서만 받는다
const MermaidDiagram = dynamic(
  () => import("../MermaidDiagram").then((m) => m.MermaidDiagram),
  // 청크 로딩 중에도 MermaidDiagram 초기 높이(200px)를 잡아 레이아웃 이동을 줄인다
  { ssr: false, loading: () => <div className="h-[200px]" /> },
);

export function MermaidBlock({ chart }: MermaidAttrs) {
  return (
    <div className="rounded-lg border border-border bg-muted/50 overflow-hidden">
      <MermaidDiagram chart={chart} />
    </div>
  );
}
