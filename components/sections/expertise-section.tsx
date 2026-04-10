"use client";

import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Zap, Lightbulb } from "lucide-react";

const expertiseItems = [
  {
    icon: Code2,
    color: "text-tech-cyan",
    title: "Java/Spring & AWS",
    description:
      "Java/Spring Boot 백엔드와 AWS 인프라 중심으로 프로젝트를 구축합니다. Lambda, DynamoDB, S3 등 클라우드 서비스를 직접 설계하고 운영합니다.",
  },
  {
    icon: Zap,
    color: "text-tech-yellow",
    title: "아이디어를 끝까지",
    description:
      "한번 떠올린 서비스 아이디어는 실제로 굴러갈 때까지 놓지 않습니다. 기획부터 배포·운영까지 혼자 밀어붙이는 프로젝트를 경험했습니다.",
  },
  {
    icon: Lightbulb,
    color: "text-tech-purple",
    title: "집요한 개선",
    description:
      "성능 수치와 장애 로그를 보면서 집요하게 개선합니다. 멋진 기술보다 끝까지 살아남는 프로젝트를 우선순위에 둡니다.",
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
            일상의 불편을 서비스로 전환하고, 직접 운영하며 배웁니다
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
