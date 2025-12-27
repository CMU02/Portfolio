import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Home, ArrowLeft } from "lucide-react";

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
    <main className="dark min-h-screen">
      <Navigation />

      <section className="py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. 아래
              링크를 통해 다른 페이지로 이동해보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  홈으로 돌아가기
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  프로젝트 보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
