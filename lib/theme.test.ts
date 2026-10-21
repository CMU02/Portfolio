import { afterEach, describe, expect, it, vi } from "vitest";
import { themeInitScript } from "./theme";

// 인라인 스크립트를 jsdom에서 그대로 실행해 <html>의 dark 클래스를 본다
const run = (stored: string | null | "throw", prefersDark: boolean) => {
  document.documentElement.className = "";
  vi.stubGlobal("matchMedia", () => ({ matches: prefersDark }));
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    if (stored === "throw") throw new Error();
    return stored;
  });
  new Function(themeInitScript)();
  return document.documentElement.classList.contains("dark");
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("themeInitScript", () => {
  it("저장값이 있으면 그대로, 없으면 OS 설정을 따른다", () => {
    expect(run("light", true)).toBe(false);
    expect(run("dark", false)).toBe(true);
    expect(run(null, true)).toBe(true);
    expect(run(null, false)).toBe(false);
  });

  it("localStorage 읽기가 실패해도 OS 설정으로 정한다", () => {
    expect(run("throw", true)).toBe(true);
  });

  it("colorScheme도 함께 맞춘다", () => {
    run("dark", false);
    expect(document.documentElement.style.colorScheme).toBe("dark");
    run("light", true);
    expect(document.documentElement.style.colorScheme).toBe("light");
  });
});
