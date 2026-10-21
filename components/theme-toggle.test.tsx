import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ThemeToggle } from "./theme-toggle";

it("클릭할 때마다 dark 클래스를 바꾸고 선택을 저장한다", () => {
  render(<ThemeToggle />);
  const button = screen.getByRole("button", { name: "테마 전환" });

  fireEvent.click(button);
  expect(document.documentElement).toHaveClass("dark");
  expect(localStorage.getItem("theme")).toBe("dark");

  fireEvent.click(button);
  expect(document.documentElement).not.toHaveClass("dark");
  expect(localStorage.getItem("theme")).toBe("light");
});
