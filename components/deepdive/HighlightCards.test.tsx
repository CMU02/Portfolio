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

it("아는 아이콘 이름이면 라벨 옆에 svg를 그리고, 모르는 이름이면 그리지 않는다", () => {
  const { container } = render(
    <HighlightCards
      items={[
        { label: "월 운영비", value: "$5 미만", icon: "DollarSign" },
        { label: "모름", value: "1", icon: "NoSuchIcon" },
      ]}
    />,
  );
  const [known, unknown] = container.querySelectorAll("dt");
  expect(known.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  expect(unknown.querySelector("svg")).toBeNull();
});
