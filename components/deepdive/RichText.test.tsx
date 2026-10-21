import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import type { JSONContent } from "@tiptap/core";
import { RichText } from "./RichText";

afterEach(cleanup);

const h = (level: number, id: string, text: string): JSONContent => ({
  type: "heading",
  attrs: { level, id },
  content: [{ type: "text", text }],
});

it("최상위 h2 앞에 목차 순서대로 01, 02 번호를 붙이고 h3에는 붙이지 않는다", () => {
  render(
    <RichText
      doc={{
        type: "doc",
        content: [
          h(2, "problem", "문제"),
          { type: "paragraph", content: [{ type: "text", text: "본문" }] },
          h(3, "detail", "세부"),
          h(2, "tradeoff", "선택과 트레이드오프"),
        ],
      }}
    />,
  );
  const h2s = screen.getAllByRole("heading", { level: 2 });
  expect(h2s.map((el) => el.textContent)).toEqual(["01문제", "02선택과 트레이드오프"]);
  expect(h2s[0]).toHaveAttribute("id", "problem");
  expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(/^세부$/);
});

it("표준 섹션 id에는 장식 아이콘을 붙이고 모르는 id에는 붙이지 않는다", () => {
  render(
    <RichText
      doc={{
        type: "doc",
        content: [h(2, "section-background", "Problem"), h(2, "custom", "기타")],
      }}
    />,
  );
  const [known, unknown] = screen.getAllByRole("heading", { level: 2 });
  expect(known.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  expect(known).toHaveTextContent(/^01Problem$/);
  expect(unknown.querySelector("svg")).toBeNull();
});
