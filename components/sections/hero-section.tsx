import { Cloud, Server } from "lucide-react";

// 첫 화면에 Work 목록까지 보이도록 높이를 강제하지 않는다 (min-h-screen 없음, 등장 모션 없음)
export function HeroSection() {
  return (
    <section className="container mx-auto px-6 pt-24 pb-8 md:pt-32 md:pb-8">
      <p className="text-sm font-semibold text-muted-foreground">최현준</p>
      <h1 className="mt-3 text-balance text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.045em] md:mt-5 md:text-7xl lg:text-8xl">
        Idea to Production, Never Let Go.
      </h1>
      <p className="mt-4 text-base text-muted-foreground md:mt-6 md:text-xl">
        만들고, 배포하고, 운영합니다.
        <span className="mt-1 flex flex-wrap gap-x-3">
          <span className="inline-flex items-center gap-1.5">
            <Server aria-hidden className="size-4 shrink-0 md:size-5" />
            백엔드
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Cloud aria-hidden className="size-4 shrink-0 md:size-5" />
            AWS
          </span>
        </span>
      </p>
    </section>
  );
}
