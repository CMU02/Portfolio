// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

// 선택자 블록 안의 `--name: #hex;`만 읽는다(oklch 등은 대상 아님)
const tokens = (selector: string) => {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`${selector} 블록 없음`);
  const body = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)].map((m) => [m[1], m[2]]));
};

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (selector: string, fg: string, bg: string) => {
  const t = tokens(selector);
  if (!t[fg] || !t[bg]) throw new Error(`${selector}에 ${fg} 또는 ${bg} hex 값 없음`);
  const [hi, lo] = [luminance(t[fg]), luminance(t[bg])].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
};

describe.each([":root", ".dark"])("%s 토큰 대비(WCAG AA)", (theme) => {
  it.each([
    ["--foreground", "--background"],
    ["--muted-foreground", "--background"],
    ["--primary-text", "--background"],
    ["--primary-foreground", "--primary"],
    ["--foreground", "--card"],
  ])("%s / %s ≥ 4.5", (fg, bg) => {
    expect(contrast(theme, fg, bg)).toBeGreaterThanOrEqual(4.5);
  });
});
