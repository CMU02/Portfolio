"use client";

// 로컬 전용 딥다이브 본문 편집기 (app/dev/** 에서만 import)
// 원자 블록·heading.id 등 텍스트가 아닌 attrs는 노드 뷰 대신 JSON 패널 하나로 편집한다
import { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import { NodeSelection } from "@tiptap/pm/state";
import { extensions } from "@/lib/tiptap/extensions";
import { Button } from "@/components/ui/button";

const ATOMS = [
  "comparison",
  "architectureImage",
  "mermaid",
  "metricGrid",
  "limitations",
  "gallery",
  "video",
];

// 편집 화면용 최소 스타일: preflight가 지운 블록 서식 복원 + 원자 블록은 data-type 라벨 박스로 표시
const EDITOR_CLASS = [
  "rounded-lg border border-border p-4",
  "[&_.ProseMirror]:min-h-[60vh] [&_.ProseMirror]:space-y-3 [&_.ProseMirror]:outline-none",
  "[&_h2]:text-xl [&_h2]:font-semibold [&_h3]:font-medium",
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:text-sm",
  "[&_a]:text-primary [&_a]:underline",
  "[&_p[data-type]]:text-primary",
  "[&_div[data-type]]:rounded-md [&_div[data-type]]:border [&_div[data-type]]:border-dashed [&_div[data-type]]:border-border [&_div[data-type]]:p-3",
  "[&_div[data-type]]:before:block [&_div[data-type]]:before:text-xs [&_div[data-type]]:before:text-muted-foreground [&_div[data-type]]:before:content-[attr(data-type)]",
  "[&_.ProseMirror-selectednode]:ring-2 [&_.ProseMirror-selectednode]:ring-ring",
].join(" ");

interface DeepDiveEditorProps {
  projectId: string;
  topicId: string;
  initialDoc: JSONContent;
}

export function DeepDiveEditor({
  projectId,
  topicId,
  initialDoc,
}: DeepDiveEditorProps) {
  const editor = useEditor({
    extensions,
    content: initialDoc,
    immediatelyRender: false,
  });
  const [status, setStatus] = useState("");
  const [attrsError, setAttrsError] = useState<string | null>(null);
  const attrsRef = useRef<HTMLTextAreaElement>(null);

  // 선택된 노드(NodeSelection) 또는 커서가 있는 최상위 블록
  const selected = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;
      const { selection } = editor.state;
      const isNode = selection instanceof NodeSelection;
      if (!isNode && selection.$from.depth < 1) return null;
      const node = isNode ? selection.node : selection.$from.node(1);
      return {
        isNode,
        pos: isNode ? selection.from : selection.$from.before(1),
        type: node.type.name,
        attrs: JSON.stringify(node.attrs, null, 2),
      };
    },
  });

  const save = useCallback(async () => {
    if (!editor) return;
    setStatus("저장 중…");
    try {
      const res = await fetch("/dev/editor/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, topicId, doc: editor.getJSON() }),
      });
      setStatus(
        res.ok ? "저장됨" : `저장 실패 (${res.status}) ${await res.text()}`,
      );
    } catch (error) {
      setStatus(`저장 실패 ${String(error)}`);
    }
  }, [editor, projectId, topicId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [save]);

  if (!editor) return null;

  const applyAttrs = () => {
    if (!selected || !attrsRef.current) return;
    let attrs: unknown;
    try {
      attrs = JSON.parse(attrsRef.current.value);
    } catch (error) {
      setAttrsError(String(error));
      return;
    }
    if (!attrs || typeof attrs !== "object" || Array.isArray(attrs)) {
      setAttrsError("attrs는 JSON 객체여야 합니다");
      return;
    }
    setAttrsError(null);
    editor
      .chain()
      .command(({ tr }) => {
        tr.setNodeMarkup(selected.pos, undefined, attrs);
        // 원자 노드는 교체되면서 선택이 풀리므로 다시 선택해 패널을 유지
        if (selected.isNode) {
          tr.setSelection(NodeSelection.create(tr.doc, selected.pos));
        }
        return true;
      })
      .run();
  };

  const link = () => {
    const href = window.prompt("링크 URL (비우면 제거)");
    if (href === null) return;
    const chain = editor.chain().focus().extendMarkRange("link");
    if (href) chain.setLink({ href }).run();
    else chain.unsetLink().run();
  };

  const tools: [string, () => void][] = [
    ["문단", () => editor.chain().focus().setParagraph().run()],
    ["H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run()],
    ["H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run()],
    ["굵게", () => editor.chain().focus().toggleBold().run()],
    ["기울임", () => editor.chain().focus().toggleItalic().run()],
    ["코드", () => editor.chain().focus().toggleCode().run()],
    ["링크", link],
    ["불릿", () => editor.chain().focus().toggleBulletList().run()],
    ["번호", () => editor.chain().focus().toggleOrderedList().run()],
    ["코드 블록", () => editor.chain().focus().toggleCodeBlock().run()],
    ["요약", () => editor.chain().focus().setNode("sectionSummary").run()],
    ["의사결정", () => editor.chain().focus().wrapIn("decision").run()],
    ...ATOMS.map((type): [string, () => void] => [
      `+ ${type}`,
      () => editor.chain().focus().insertContent({ type }).run(),
    ]),
  ];

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b border-border bg-background py-2">
        {tools.map(([label, run]) => (
          <Button
            key={label}
            type="button"
            variant="outline"
            size="sm"
            className="min-h-11"
            onClick={run}
          >
            {label}
          </Button>
        ))}
        <Button type="button" size="sm" className="min-h-11" onClick={save}>
          저장 (Ctrl+S)
        </Button>
        <span role="status" className="text-xs text-muted-foreground">
          {status}
        </span>
      </div>

      <EditorContent editor={editor} className={EDITOR_CLASS} />

      {selected && (
        <div className="space-y-2 rounded-lg border border-border p-4">
          <p className="text-sm font-medium">
            선택 블록: {selected.type} (pos {selected.pos})
          </p>
          <textarea
            key={`${selected.pos}:${selected.type}:${selected.attrs}`}
            ref={attrsRef}
            defaultValue={selected.attrs}
            aria-label="선택 블록 attrs (JSON)"
            spellCheck={false}
            className="h-64 w-full rounded-md border border-border bg-muted p-3 font-mono text-xs focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              className="min-h-11"
              onClick={applyAttrs}
            >
              적용
            </Button>
            {attrsError && (
              <span role="alert" className="text-xs text-destructive">
                {attrsError}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
