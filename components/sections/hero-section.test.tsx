import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { HeroSection } from "./hero-section";

afterEach(cleanup);

it("에디토리얼 Hero 문구를 그대로 보여준다", () => {
  render(<HeroSection />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Idea to Production, Never Let Go.",
  );
  expect(
    screen.getByText("만들고, 배포하고, 운영합니다. 백엔드 · AWS"),
  ).toBeInTheDocument();
});
