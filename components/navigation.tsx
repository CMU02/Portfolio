"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

// 루트 기준 앵커라 홈이 아닌 페이지에서도 해당 섹션으로 이동한다
const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLinks = (itemClassName: string) =>
    navItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            itemClassName,
            "transition-colors",
            isActive
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setIsMobileOpen(false)}
          aria-current={isActive ? "page" : undefined}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b",
        isScrolled || isMobileOpen
          ? "bg-background/90 backdrop-blur border-border"
          : "border-transparent",
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-semibold"
          >
            최현준
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              {renderLinks("inline-flex min-h-11 items-center px-3 text-sm")}
            </div>
            <ThemeToggle />

            {/* 모바일 메뉴 버튼 */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden size-11"
              aria-label={isMobileOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMobileOpen && (
          <div className="md:hidden pt-2 pb-2">
            {renderLinks("flex min-h-11 items-center")}
          </div>
        )}
      </nav>
    </header>
  );
}
