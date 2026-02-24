import { Navigation } from "@/components/navigation";

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "full";
}

/**
 * 페이지 공통 레이아웃 컴포넌트
 * 모든 페이지에서 반복되는 레이아웃 구조를 중앙화합니다.
 */
export function PageLayout({ children, maxWidth = "full" }: PageLayoutProps) {
  const maxWidthClass = maxWidth !== "full" ? `max-w-${maxWidth}` : "";

  return (
    <main className="dark min-h-screen">
      <Navigation />
      <section className="py-24 pt-32">
        <div className={`container mx-auto px-6 ${maxWidthClass}`}>
          {children}
        </div>
      </section>
    </main>
  );
}
