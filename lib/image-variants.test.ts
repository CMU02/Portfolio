import { describe, expect, it } from "vitest";
import { pickWidth, variantKey, variantUrl } from "./image-variants";

describe("pickWidth", () => {
  it("요청 이상인 가장 작은 너비를 고르고, 없으면 1920", () => {
    expect(pickWidth(1)).toBe(640);
    expect(pickWidth(640)).toBe(640);
    expect(pickWidth(641)).toBe(1280);
    expect(pickWidth(3840)).toBe(1920);
  });
});

describe("variantKey", () => {
  it("마지막 확장자만 .w{width}.webp로 교체", () => {
    expect(variantKey("clean-breath/visit/smok-1-1.png", 640)).toBe("clean-breath/visit/smok-1-1.w640.webp");
    expect(variantKey("a/b.c.jpeg", 1280)).toBe("a/b.c.w1280.webp");
  });
});

describe("variantUrl", () => {
  it("원격 래스터 이미지는 변형 URL로", () => {
    expect(variantUrl("https://d.net/x/y.jpg", 828)).toBe("https://d.net/x/y.w1280.webp");
  });
  it("그 외는 src 그대로", () => {
    expect(variantUrl("/og-image.png", 640)).toBe("/og-image.png");
    expect(variantUrl("https://d.net/x/logo.svg", 640)).toBe("https://d.net/x/logo.svg");
    expect(variantUrl("https://d.net/x/y.w640.webp", 1920)).toBe("https://d.net/x/y.w640.webp");
  });
});
