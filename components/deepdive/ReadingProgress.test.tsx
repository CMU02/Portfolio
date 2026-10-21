import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ReadingProgress } from "./ReadingProgress";

afterEach(cleanup);

it("스크롤 비율만큼 transform 하나로 채운다 (scale 속성과 곱해지지 않음)", () => {
  const { container } = render(<ReadingProgress />);
  const fill = container.firstElementChild!.firstElementChild as HTMLElement;
  expect(fill.className).not.toMatch(/scale-x/);
  expect(fill.style.transform).toBe("scaleX(0)");

  Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 2000 });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });
  Object.defineProperty(window, "scrollY", { configurable: true, value: 400 });
  window.dispatchEvent(new Event("scroll"));
  expect(fill.style.transform).toBe("scaleX(0.4)");
});
