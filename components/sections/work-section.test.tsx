import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { WorkSection } from "./work-section";

afterEach(cleanup);

it("프로젝트를 시안 순서대로 한 줄씩, 줄마다 상세 링크와 대표 수치를 보여준다", () => {
  render(<WorkSection />);
  const rows = screen.getAllByRole("link");
  expect(rows.map((a) => a.getAttribute("href"))).toEqual([
    "/projects/phantom-file",
    "/projects/subhub",
    "/projects/cleanbreath",
  ]);
  expect(rows[0]).toHaveTextContent("$5 미만");
  expect(rows[1]).toHaveTextContent("97%");
  expect(rows[2]).toHaveTextContent("87%↓");
  expect(rows[2]).toHaveTextContent("6인 팀");
  expect(rows[0]).toHaveTextContent("개인");
});

it("줄마다 유형·지표 아이콘(svg)을 보여주고 장식이라 숨긴다", () => {
  render(<WorkSection />);
  for (const row of screen.getAllByRole("link")) {
    const svgs = row.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(3); // 유형 + 지표 + 화살표
    svgs.forEach((s) => expect(s).toHaveAttribute("aria-hidden", "true"));
  }
});
