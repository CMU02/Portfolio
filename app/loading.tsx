import { Navigation } from "@/components/navigation";

export default function Loading() {
  return (
    <main className="dark min-h-screen">
      <Navigation />

      <section className="py-24 pt-32">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              {/* 로딩 스피너 */}
              <div className="w-12 h-12 border-4 border-tech-cyan/20 border-t-tech-cyan rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">로딩 중...</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
