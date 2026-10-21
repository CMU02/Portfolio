// @vitest-environment node
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..");
// 에디토리얼 톤 유지: 팔레트 색, glow, 그라데이션이 본문 UI로 돌아오지 않게 막는다
const banned = [
  /\b(text|bg|border|from|to|via)-(red|green|blue|yellow|purple|pink|cyan|orange|emerald|sky|indigo)-\d{2,3}\b/,
  /\bglow-/,
  /bg-gradient|bg-linear-/,
];
const skip = (p: string) => /\.test\.tsx?$/.test(p) || /(^|\/)(components\/ui|components\/dev-editor)\//.test(p);

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? (e.name === "node_modules" ? [] : walk(join(dir, e.name))) : e.name.endsWith(".tsx") ? [join(dir, e.name)] : [],
  );

describe("스타일 가드", () => {
  it("본문 UI에 팔레트 색/glow/그라데이션이 없다", () => {
    const hits: string[] = [];
    for (const d of ["app", "components", "features"]) {
      for (const file of walk(join(root, d))) {
        const rel = relative(root, file).split(sep).join("/");
        if (skip(rel)) continue;
        const src = readFileSync(file, "utf8");
        for (const re of banned) {
          const m = src.match(new RegExp(re.source, "g"));
          if (m) hits.push(`${rel}: ${[...new Set(m)].join(", ")}`);
        }
      }
    }
    expect(hits, hits.join("\n")).toEqual([]);
  });
});
