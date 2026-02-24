import { PageLayout } from "@/components/common/page-layout";

export default function Loading() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          {/* 로딩 스피너 */}
          <div className="w-12 h-12 border-4 border-tech-cyan/20 border-t-tech-cyan rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    </PageLayout>
  );
}
