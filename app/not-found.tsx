import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Compass } from "lucide-react";
import { PageLayout } from "@/components/common/page-layout";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | CMU02 Portfolio",
  description:
    "요청하신 페이지를 찾을 수 없습니다. 홈페이지로 돌아가거나 프로젝트 목록을 확인해보세요.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <PageLayout>
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 글리프는 의도적으로 size-10 (아이콘 크기 규칙의 예외) */}
        <Compass aria-hidden className="mx-auto mb-4 size-10 text-muted-foreground" />
        <h1 className="text-6xl font-bold mb-4 text-balance">404</h1>
        <h2 className="text-2xl font-semibold mb-6">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. 아래 링크를
          통해 다른 페이지로 이동해보세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home aria-hidden className="size-4" />
              홈으로 돌아가기
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/#work">
              <ArrowLeft aria-hidden className="size-4" />
              프로젝트 보기
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
