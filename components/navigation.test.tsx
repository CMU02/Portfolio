import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Navigation } from "./navigation";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

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
