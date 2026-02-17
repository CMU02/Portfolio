"use client";

import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-deep-blue/10 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* 인사말 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-lg"
          >
            {t("greeting")}
          </motion.p>

          {/* 메인 카피 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            {t("mainCopy")}
          </motion.h1>

          {/* 서브 카피 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t("subCopy")}
          </motion.p>

          {/* 핵심 정보 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {t("education")}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                용용SW 전공
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {t("techStack")}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Developer
              </div>
            </div>
          </motion.div>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            <Button size="lg" className="glow-blue" asChild>
              <a href="#work">
                {t("cta")}
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/CMU02"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
