"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/logo";

const navItems = [
  { label: "Projects", href: "#work", isAnchor: true },
  { label: "Growth", href: "#growth", isAnchor: true },
  { label: "Certifications", href: "/certifications", isAnchor: false },
  { label: "Contact", href: "#contact", isAnchor: true },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // /projects 경로에서는 네비게이션 링크 숨김
  const isProjectsPage = pathname?.startsWith("/projects");
  // /certifications 페이지인지 확인
  const isCertificationsPage = pathname === "/certifications";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* 데스크톱 네비게이션 - projects 페이지에서는 숨김 */}
          {!isProjectsPage && (
            <>
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => {
                  // Certifications 페이지에서 앵커 링크는 비활성화
                  const isDisabled = isCertificationsPage && item.isAnchor;
                  // 현재 페이지 확인
                  const isActive = !item.isAnchor && pathname === item.href;

                  if (item.isAnchor) {
                    return (
                      <a
                        key={item.href}
                        href={isDisabled ? undefined : item.href}
                        className={cn(
                          "text-sm transition-colors",
                          isDisabled
                            ? "text-muted-foreground/50 cursor-not-allowed"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        onClick={(e) => {
                          if (isDisabled) {
                            e.preventDefault();
                          }
                        }}
                        aria-disabled={isDisabled}
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-sm transition-colors",
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* 모바일 메뉴 버튼 */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={isMobileOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={isMobileOpen}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? <X /> : <Menu />}
              </Button>
            </>
          )}
        </div>

        {/* 모바일 메뉴 - projects 페이지에서는 숨김 */}
        {!isProjectsPage && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden pt-4 pb-2"
          >
            {navItems.map((item) => {
              // Certifications 페이지에서 앵커 링크는 비활성화
              const isDisabled = isCertificationsPage && item.isAnchor;
              // 현재 페이지 확인
              const isActive = !item.isAnchor && pathname === item.href;

              if (item.isAnchor) {
                return (
                  <a
                    key={item.href}
                    href={isDisabled ? undefined : item.href}
                    className={cn(
                      "block py-2 transition-colors",
                      isDisabled
                        ? "text-muted-foreground/50 cursor-not-allowed"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={(e) => {
                      if (isDisabled) {
                        e.preventDefault();
                      } else {
                        setIsMobileOpen(false);
                      }
                    }}
                    aria-disabled={isDisabled}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block py-2 transition-colors",
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
            })}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
