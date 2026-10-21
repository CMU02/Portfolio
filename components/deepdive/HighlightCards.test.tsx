import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { HighlightCards } from "./HighlightCards";

afterEach(cleanup);

it("핵심 지표를 dl의 라벨(dt)과 값(dd)으로 보여준다", () => {
  render(
    <HighlightCards
      items={[{ label: "월 운영비", value: "$5 미만", icon: "DollarSign" }]}
    />,
  );
  expect(screen.getByRole("term")).toHaveTextContent("월 운영비");
  expect(screen.getByRole("definition")).toHaveTextContent("$5 미만");
});
