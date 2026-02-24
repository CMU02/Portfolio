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
  { label: "Projects", href: "#work" },
  { label: "Growth", href: "#growth" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // /projects 경로에서는 네비게이션 링크 숨김
  const isProjectsPage = pathname?.startsWith("/projects");

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
                  const isExternal = item.href.startsWith("#");
                  return isExternal ? (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
              const isExternal = item.href.startsWith("#");
              return isExternal ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMobileOpen(false)}
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
