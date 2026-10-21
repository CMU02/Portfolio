import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { deepDives } from "@/lib/deepdive-content";
import { DeepDivePage } from "./DeepDivePage";
import type { ProjectId } from "./types";

// 헤더(usePathname)와 본문 렌더러는 이 테스트 범위 밖이다
vi.mock("@/components/navigation", () => ({ Navigation: () => null }));
vi.mock("@/components/deepdive/RichText", () => ({ RichText: () => null }));

afterEach(cleanup);

const renderPage = async (projectId: ProjectId, topicId: string) =>
  render(await DeepDivePage({ projectId, topicId }));

describe("딥다이브 롱폼 아티클", () => {
  it("토픽 제목이 페이지의 유일한 h1이고 상단에 문서 위치를 보여준다", async () => {
    await renderPage("cleanbreath", "query-optimization");
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("쿼리 최적화 - 문서");
    expect(screen.getByText("문서 2 / 3")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Work/ })).toHaveAttribute("href", "/#work");
  });

  it("첫 문서는 이전 링크 없이 다음 문서로만 이어진다", async () => {
    await renderPage("cleanbreath", "field-survey-data-collection");
    expect(screen.queryByRole("link", { name: /이전 문서/ })).toBeNull();
    expect(screen.getByRole("link", { name: /다음 문서/ })).toHaveAttribute(
      "href",
      "/projects/cleanbreath/query-optimization",
    );
  });

  it("마지막 문서는 다음 링크 없이 이전 문서로만 이어진다", async () => {
    await renderPage("phantom-file", "auth-troubleshooting");
    expect(screen.getByText("문서 5 / 5")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /다음 문서/ })).toBeNull();
    expect(screen.getByRole("link", { name: /이전 문서/ })).toHaveAttribute(
      "href",
      "/projects/phantom-file/terraform-iac",
    );
  });

  it("이 프로젝트의 문서 목록에 번호와 현재 문서 표시가 있다", async () => {
    await renderPage("phantom-file", "event-pipeline");
    const nav = screen.getByRole("navigation", { name: "이 프로젝트의 문서" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      deepDives["phantom-file"].topics.map((t) => `/projects/phantom-file/${t.id}`),
    );
    expect(links[0]).toHaveTextContent("01");
    expect(links[1]).toHaveAttribute("aria-current", "page");
    expect(links[0]).not.toHaveAttribute("aria-current");
  });

  it.each(Object.keys(deepDives) as ProjectId[])(
    "%s: sideInfo 항목이 모두 프로젝트 정보 절에 있다",
    async (projectId) => {
      const deepDive = deepDives[projectId];
      await renderPage(projectId, deepDive.topics[0].id);
      const info = screen.getByRole("region", { name: "프로젝트 정보" });
      for (const section of deepDive.sideInfo) {
        expect(within(info).getByText(section.title)).toBeInTheDocument();
        for (const item of section.items) {
          const el = within(info).getByText(item.label);
          if (item.url) expect(el.closest("a")).toHaveAttribute("href", item.url);
        }
      }
    },
  );
});
