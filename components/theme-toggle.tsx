"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

// 아이콘은 dark: 변형으로만 바꿔 상태 없이 서버 HTML과 일치시킨다
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.classList.toggle("dark");
    root.style.colorScheme = dark ? "dark" : "light";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      // 저장 실패(사파리 프라이빗 등)는 이번 방문에만 적용
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="테마 전환"
      className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Sun className="size-5 dark:hidden" aria-hidden />
      <Moon className="hidden size-5 dark:block" aria-hidden />
    </button>
  );
}
