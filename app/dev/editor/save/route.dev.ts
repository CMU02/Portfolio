// 로컬 전용 딥다이브 저장 API: POST /dev/editor/save
// 경로는 findTopic을 통과한 id로만 만든다 (요청 문자열로 경로 조립 금지)
import fs from "node:fs";
import { getSchema, type JSONContent } from "@tiptap/core";
import { extensions } from "@/lib/tiptap/extensions";
import { contentPath, findTopic } from "@/lib/deepdive-content";

const schema = getSchema(extensions);

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  // next dev는 0.0.0.0에 열리므로 같은 LAN 기기나 다른 사이트의 no-cors 요청이 파일을 덮어쓰지 못하게
  // localhost 호스트 + 같은 출처(편집기 페이지)에서 온 요청만 받는다
  const host = request.headers.get("host") ?? "";
  if (
    !/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host) ||
    request.headers.get("origin") !== `http://${host}`
  ) {
    return new Response(null, { status: 403 });
  }

  let body: { projectId?: unknown; topicId?: unknown; doc?: JSONContent };
  try {
    body = await request.json();
  } catch {
    return new Response("잘못된 JSON", { status: 400 });
  }

  const { projectId, topicId, doc } = body;
  if (
    typeof projectId !== "string" ||
    typeof topicId !== "string" ||
    !findTopic(projectId, topicId)
  ) {
    return new Response(null, { status: 404 });
  }

  // 루트가 doc이 아니면 스키마 검사는 통과해도 본문 파일로는 깨진다
  if (doc?.type !== "doc") {
    return new Response("루트 노드가 doc이 아님", { status: 400 });
  }
  try {
    schema.nodeFromJSON(doc).check();
  } catch (error) {
    return new Response(String(error), { status: 400 });
  }

  await fs.promises.writeFile(
    contentPath(projectId, topicId),
    JSON.stringify(doc, null, 2) + "\n",
    "utf8",
  );
  return Response.json({ ok: true });
}
