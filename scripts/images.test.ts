// @vitest-environment node
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { collectImageKeys, listMissing, makeVariants } from "./images";

describe("collectImageKeys", () => {
  it("상대 키만 중복 없이 정렬해 모은다", () => {
    expect(
      collectImageKeys([
        `{ s3Key: "a/b.png", x: "/og-image.png", y: "a/b.png", z: "c/d.w640.webp", w: "e.JPG" }`,
        `"f/g.jpeg"`,
      ]),
    ).toEqual(["a/b.png", "f/g.jpeg"]);
  });

  it("posterKey 값은 변형 대상에서 뺀다 (JSON, TS 표기 모두)", () => {
    expect(
      collectImageKeys([`{ "posterKey": "v/p.png", "src": "v/i.png" }`, `{ posterKey: "v/q.png" }`]),
    ).toEqual(["v/i.png"]);
  });
});

describe("makeVariants", () => {
  it("webp로 만들고 원본보다 커지지 않는다", async () => {
    const src = await sharp({ create: { width: 800, height: 400, channels: 3, background: "#888" } })
      .png()
      .toBuffer();
    const out = await makeVariants(src);
    for (const w of [640, 1280, 1920] as const) {
      const meta = await sharp(out[w]).metadata();
      expect(meta.format).toBe("webp");
      expect(meta.width).toBe(Math.min(w, 800));
    }
  });
});

describe("listMissing", () => {
  it("변형이 하나라도 없는 원본만 반환한다", () => {
    expect(listMissing(["a/b.png", "c/d.jpg"], (k) => k !== "c/d.w1280.webp")).toEqual(["c/d.jpg"]);
  });
});
