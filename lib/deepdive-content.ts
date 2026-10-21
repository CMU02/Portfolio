// 딥다이브 레지스트리 + 본문(Tiptap JSON) 로더 (서버 전용, node:fs 사용)
// 본문은 content/deepdive/<projectId>/<topicId>.json, 메타데이터는 data/projects/*-data.ts
import fs from "node:fs";
import path from "node:path";
import type { JSONContent } from "@tiptap/core";
import type { ProjectId } from "@/features/projects/types";
import type {
  DeepDiveTopic,
  ProjectDeepDive,
  TocItem,
} from "@/data/projects/types";
import { subhubDeepDive } from "@/data/projects/subhub-data";
import { phantomFileDeepDive } from "@/data/projects/phantomfile-data";
import { cleanbreathDeepDive } from "@/data/projects/cleanbreath-data";

export const deepDives: Record<ProjectId, ProjectDeepDive> = {
  subhub: subhubDeepDive,
  "phantom-file": phantomFileDeepDive,
  cleanbreath: cleanbreathDeepDive,
};

// 레지스트리에 있는 id만 통과시키므로 파일 경로 화이트리스트 역할도 한다
export function findTopic(
  projectId: string,
  topicId: string,
): { deepDive: ProjectDeepDive; topic: DeepDiveTopic } | null {
  if (!Object.hasOwn(deepDives, projectId)) return null;
  const deepDive = deepDives[projectId as ProjectId];
  const topic = deepDive.topics.find((t) => t.id === topicId);
  return topic ? { deepDive, topic } : null;
}

// 호출 전에 findTopic으로 id를 검증할 것
export function contentPath(projectId: string, topicId: string): string {
  return path.join(
    process.cwd(),
    "content",
    "deepdive",
    projectId,
    `${topicId}.json`,
  );
}

const isSectionHeading = (node: JSONContent) =>
  node.type === "heading" && node.attrs?.level === 2;

// 목차: 최상위 h2만 대상
export function extractToc(doc: JSONContent): TocItem[] {
  return (doc.content ?? []).filter(isSectionHeading).map((h) => ({
    id: h.attrs!.id as string,
    label: (h.content ?? []).map((n) => n.text ?? "").join(""),
  }));
}

// 빌드 시 fs로 읽어 편집기 저장분이 코드 수정 없이 다음 새로고침에 반영되게 한다
export async function loadTopicContent(
  projectId: string,
  topicId: string,
): Promise<{ doc: JSONContent; toc: TocItem[] }> {
  if (!findTopic(projectId, topicId)) {
    throw new Error(`Unknown deep-dive topic: ${projectId}/${topicId}`);
  }
  const doc: JSONContent = JSON.parse(
    await fs.promises.readFile(contentPath(projectId, topicId), "utf8"),
  );

  // 편집기에서 새로 만든 h2는 id가 없으므로 순번 id를 부여해 앵커/목차가 끊기지 않게 한다
  let n = 0;
  for (const node of doc.content ?? []) {
    if (!isSectionHeading(node)) continue;
    n++;
    if (!node.attrs!.id) node.attrs!.id = `section-${n}`;
  }

  return { doc, toc: extractToc(doc) };
}
