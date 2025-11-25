"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { techKeywords } from "@/data/tech-stack";
import { ArrowDown, Mail } from "lucide-react";

// 타이핑 애니메이션 컴포넌트
function TypingText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// 키워드 롤링 컴포넌트
function KeywordRoller() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techKeywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 overflow-hidden">
      <motion.div
        key={currentIndex}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="text-tech-cyan font-mono text-lg"
      >
        {techKeywords[currentIndex]}
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-deep-blue/20 to-background" />

      {/* 그리드 패턴 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측: 텍스트 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground">{t("greeting")}</p>

            <h1 className="text-4xl md:text-6xl font-bold">
              <TypingText text={t("role")} />
            </h1>

            <KeywordRoller />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-foreground/90 leading-relaxed"
            >
              {t("mainCopy")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-muted-foreground italic"
            >
              {t("subCopy")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="flex gap-4 pt-4"
            >
              <Button size="lg" className="glow-blue" asChild>
                <a href="#projects">
                  {t("cta")}
                  <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  {t("contact")}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* 우측: 3D 시각 요소 (서버 노드 네트워크) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex justify-center"
          >
            <ServerNetwork />
          </motion.div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
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

// 서버 네트워크 시각화 컴포넌트
function ServerNetwork() {
  const nodes = [
    { x: 150, y: 100, label: "API", delay: 0 },
    { x: 50, y: 200, label: "DB", delay: 0.2 },
    { x: 250, y: 200, label: "Cache", delay: 0.4 },
    { x: 150, y: 300, label: "Client", delay: 0.6 },
  ];

  return (
    <div className="relative w-[300px] h-[400px]">
      {/* 연결선 */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.line
          x1="150"
          y1="100"
          x2="50"
          y2="200"
          stroke="oklch(0.7 0.15 220 / 0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.line
          x1="150"
          y1="100"
          x2="250"
          y2="200"
          stroke="oklch(0.7 0.15 220 / 0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.line
          x1="150"
          y1="300"
          x2="150"
          y2="100"
          stroke="oklch(0.7 0.15 220 / 0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </svg>

      {/* 노드들 */}
      {nodes.map((node) => (
        <motion.div
          key={node.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: node.delay, type: "spring" }}
          className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card border border-border flex items-center justify-center glow-blue"
          style={{ left: node.x, top: node.y }}
        >
          <span className="text-xs font-mono text-primary">{node.label}</span>
        </motion.div>
      ))}

      {/* 펄스 애니메이션 */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-tech-cyan"
        animate={{
          x: [150, 50, 150, 250, 150],
          y: [100, 200, 300, 200, 100],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ left: -8, top: -8 }}
      />
    </div>
  );
}
