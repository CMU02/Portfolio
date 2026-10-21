"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/logo";

// 루트 기준 앵커라 홈이 아닌 페이지에서도 해당 섹션으로 이동한다
const navItems = [
  { label: "Projects", href: "/#work" },
  { label: "Growth", href: "/#growth" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "",
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {renderLinks("text-sm")}
          </div>

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

        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden pt-4 pb-2"
          >
            {renderLinks("block py-3")}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
