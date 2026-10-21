import { Loader2 } from "lucide-react";
import { PageLayout } from "@/components/common/page-layout";

export default function Loading() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          {/* 로딩 스피너 */}
          <Loader2 aria-hidden className="mx-auto mb-4 size-8 text-primary-text motion-safe:animate-spin" />
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    </PageLayout>
  );
}
