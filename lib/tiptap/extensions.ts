// 딥다이브 본문 Tiptap 스키마
// 서버 정적 렌더러(RichText)와 로컬 편집기가 함께 쓰므로 노드 스키마만 둔다 (React 금지).
import { Extension, Node } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import type {
  ArchitectureImageAttrs,
  ComparisonAttrs,
  GalleryAttrs,
  LimitationsAttrs,
  MermaidAttrs,
  MetricGridAttrs,
  VideoAttrs,
} from "@/data/projects/types";

// JSON attrs만 갖는 원자 블록: 렌더링은 RichText의 nodeMapping, 편집은 편집기의 attrs 패널이 담당
// shortcut: parseHTML이 없어 HTML 붙여넣기로는 복원되지 않음, 편집기에서 복사/붙여넣기가 필요해지면 data-attrs 직렬화 추가
function atomBlock<T extends object>(name: string, defaults: T) {
  return Node.create({
    name,
    group: "block",
    atom: true,
    draggable: true,
    addAttributes() {
      return Object.fromEntries(
        Object.entries(defaults).map(([key, value]) => [
          key,
          { default: value, rendered: false },
        ]),
      );
    },
    renderHTML() {
      return ["div", { "data-type": name }];
    },
  });
}

const Comparison = atomBlock<ComparisonAttrs>("comparison", {
  options: [],
});
const ArchitectureImage = atomBlock<ArchitectureImageAttrs>(
  "architectureImage",
  { s3Key: "", alt: "", width: 1200, height: 800 },
);
const Mermaid = atomBlock<MermaidAttrs>("mermaid", { chart: "" });
const MetricGrid = atomBlock<MetricGridAttrs>("metricGrid", {
  items: [],
});
const Limitations = atomBlock<LimitationsAttrs>("limitations", {
  items: [],
});
const Gallery = atomBlock<GalleryAttrs>("gallery", { items: [] });
const Video = atomBlock<VideoAttrs>("video", {
  webmKey: "",
  mp4Key: "",
  posterKey: "",
  caption: "",
});

// 섹션 결론 한 줄 요약 (h2 바로 아래)
const SectionSummary = Node.create({
  name: "sectionSummary",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: 'p[data-type="sectionSummary"]' }];
  },
  renderHTML() {
    return ["p", { "data-type": "sectionSummary" }, 0];
  },
});

// 의사결정 콜아웃: 본문은 문단, 감수한 트레이드오프는 attrs
const Decision = Node.create({
  name: "decision",
  group: "block",
  content: "paragraph+",
  addAttributes() {
    return { tradeOff: { default: null, rendered: false } };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="decision"]' }];
  },
  renderHTML() {
    return ["div", { "data-type": "decision" }, 0];
  },
});

// StarterKit 노드에 붙는 추가 attrs
// heading.id: 목차/앵커용 고정 id, bulletList.variant: 불릿 스타일, codeBlock.title: 코드 제목
const DeepDiveAttrs = Extension.create({
  name: "deepDiveAttrs",
  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        // 제목 중간에서 Enter로 나눌 때 id가 복제되지 않게 한다
        attributes: { id: { default: null, rendered: false, keepOnSplit: false } },
      },
      {
        types: ["bulletList"],
        attributes: { variant: { default: null, rendered: false } },
      },
      {
        types: ["codeBlock"],
        attributes: { title: { default: null, rendered: false } },
      },
    ];
  },
});

export const extensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    link: { openOnClick: false },
  }),
  DeepDiveAttrs,
  SectionSummary,
  Decision,
  Comparison,
  ArchitectureImage,
  Mermaid,
  MetricGrid,
  Limitations,
  Gallery,
  Video,
];
