import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navigation } from "@/components/navigation";

// Next.js 라우터 모킹
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("Navigation Component", () => {
  const { usePathname } = require("next/navigation");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("메인 페이지 (/) 네비게이션", () => {
    beforeEach(() => {
      usePathname.mockReturnValue("/");
    });

    it("모든 네비게이션 항목이 렌더링되어야 함", () => {
      render(<Navigation />);

      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Growth")).toBeInTheDocument();
      expect(screen.getByText("Certifications")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("앵커 링크(Projects, Growth, Contact)가 정상 작동해야 함", () => {
      render(<Navigation />);

      const projectsLink = screen
        .getAllByText("Projects")[0]
        .closest("a") as HTMLAnchorElement;
      const growthLink = screen
        .getAllByText("Growth")[0]
        .closest("a") as HTMLAnchorElement;
      const contactLink = screen
        .getAllByText("Contact")[0]
        .closest("a") as HTMLAnchorElement;

      expect(projectsLink).toHaveAttribute("href", "#work");
      expect(growthLink).toHaveAttribute("href", "#growth");
      expect(contactLink).toHaveAttribute("href", "#contact");

      // 비활성화되지 않아야 함
      expect(projectsLink).not.toHaveAttribute("aria-disabled", "true");
      expect(growthLink).not.toHaveAttribute("aria-disabled", "true");
      expect(contactLink).not.toHaveAttribute("aria-disabled", "true");
    });

    it("Certifications 링크가 활성 상태가 아니어야 함", () => {
      render(<Navigation />);

      const certificationsLink = screen
        .getAllByText("Certifications")[0]
        .closest("a") as HTMLAnchorElement;

      expect(certificationsLink).not.toHaveAttribute("aria-current", "page");
      expect(certificationsLink).not.toHaveClass("font-semibold");
    });
  });

  describe("Certifications 페이지 (/certifications) 네비게이션", () => {
    beforeEach(() => {
      usePathname.mockReturnValue("/certifications");
    });

    it("모든 네비게이션 항목이 렌더링되어야 함", () => {
      render(<Navigation />);

      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Growth")).toBeInTheDocument();
      expect(screen.getByText("Certifications")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("앵커 링크(Projects, Growth, Contact)가 비활성화되어야 함", () => {
      render(<Navigation />);

      const projectsLink = screen
        .getAllByText("Projects")[0]
        .closest("a") as HTMLAnchorElement;
      const growthLink = screen
        .getAllByText("Growth")[0]
        .closest("a") as HTMLAnchorElement;
      const contactLink = screen
        .getAllByText("Contact")[0]
        .closest("a") as HTMLAnchorElement;

      // href가 없거나 비활성화 상태여야 함
      expect(projectsLink).toHaveAttribute("aria-disabled", "true");
      expect(growthLink).toHaveAttribute("aria-disabled", "true");
      expect(contactLink).toHaveAttribute("aria-disabled", "true");

      // 비활성화 스타일이 적용되어야 함
      expect(projectsLink).toHaveClass("cursor-not-allowed");
      expect(growthLink).toHaveClass("cursor-not-allowed");
      expect(contactLink).toHaveClass("cursor-not-allowed");
    });

    it("Certifications 링크가 현재 페이지로 표시되어야 함", () => {
      render(<Navigation />);

      const certificationsLink = screen
        .getAllByText("Certifications")[0]
        .closest("a") as HTMLAnchorElement;

      expect(certificationsLink).toHaveAttribute("aria-current", "page");
      expect(certificationsLink).toHaveClass("font-semibold");
    });

    it("앵커 링크 클릭 시 기본 동작이 방지되어야 함", () => {
      render(<Navigation />);

      const projectsLink = screen
        .getAllByText("Projects")[0]
        .closest("a") as HTMLAnchorElement;

      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(clickEvent, "preventDefault");
      projectsLink.dispatchEvent(clickEvent);

      // preventDefault가 호출되었는지 확인
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("Projects 페이지 (/projects/*) 네비게이션", () => {
    beforeEach(() => {
      usePathname.mockReturnValue("/projects/cleanbreath");
    });

    it("네비게이션 링크가 숨겨져야 함", () => {
      render(<Navigation />);

      // 데스크톱 네비게이션이 렌더링되지 않아야 함
      const navLinks = screen.queryAllByText("Projects");
      expect(navLinks.length).toBe(0);
    });
  });
});
