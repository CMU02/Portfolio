import { describe, expect, it } from "vitest";
import cloudFrontLoader from "./image-loader";

describe("cloudFrontLoader", () => {
  it("CDN 이미지는 요청 너비에 맞는 WebP 변형 URL을 반환한다", () => {
    expect(
      cloudFrontLoader({ src: "https://d.net/a/b.png", width: 750, quality: 85 }),
    ).toBe("https://d.net/a/b.w1280.webp");
  });
  it("로컬 정적 경로는 그대로 반환한다", () => {
    expect(cloudFrontLoader({ src: "/og-image.png", width: 640 })).toBe(
      "/og-image.png",
    );
  });
});
