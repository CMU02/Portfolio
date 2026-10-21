import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Navigation } from "./navigation";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

afterEach(cleanup);

it("Work/About/Contact 앵커 링크와 테마 토글을 보여준다", () => {
  render(<Navigation />);
  for (const [name, href] of [
    ["Work", "/#work"],
    ["About", "/#about"],
    ["Contact", "/#contact"],
  ]) {
    expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
  }
  expect(screen.getByRole("button", { name: "테마 전환" })).toBeInTheDocument();
});

it("모바일 메뉴를 열면 최상단에서도 헤더 배경이 깔린다", () => {
  const { container } = render(<Navigation />);
  const header = container.querySelector("header")!;
  expect(header).toHaveClass("border-transparent");
  fireEvent.click(screen.getByRole("button", { name: "메뉴 열기" }));
  expect(header).toHaveClass("bg-background/90");
});
