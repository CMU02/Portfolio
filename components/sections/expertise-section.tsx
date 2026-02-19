"use client";

import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Zap, Lightbulb } from "lucide-react";

const expertiseItems = [
  {
    icon: Code2,
    color: "text-tech-cyan",
    title: "Full Stack Development",
    description:
      "React, Next.js로 사용자 인터페이스를 만들고, Spring Boot, NestJS로 백엔드 API를 구현합니다.",
  },
  {
    icon: Zap,
    color: "text-tech-yellow",
    title: "Fast Learner",
    description:
      "새로운 기술을 빠르게 학습하고 프로젝트에 적용합니다. 문서를 읽고 직접 구현하며 배웁니다.",
  },
  {
    icon: Lightbulb,
    color: "text-tech-purple",
    title: "Problem Solving",
    description:
      "에러를 만나면 포기하지 않고 해결책을 찾습니다. 디버깅과 문제 해결 과정을 즐깁니다.",
  },
];

export function ExpertiseSection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
          <p className="text-muted-foreground text-lg">
            프론트엔드부터 백엔드까지 직접 만들어봤습니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {expertiseItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Icon className={`h-10 w-10 ${item.color} mb-4`} />
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
