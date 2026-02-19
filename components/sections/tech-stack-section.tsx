"use client";

import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { techStackData } from "@/data/tech-stack";
import { Code2, Server, Database, Cloud } from "lucide-react";

type CategoryKey = keyof typeof techStackData;

const categoryIcons: Record<CategoryKey, typeof Code2> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  devops: Cloud,
};

const categoryColors: Record<CategoryKey, string> = {
  frontend: "border-tech-cyan/50 hover:border-tech-cyan",
  backend: "border-tech-purple/50 hover:border-tech-purple",
  database: "border-tech-green/50 hover:border-tech-green",
  devops: "border-tech-yellow/50 hover:border-tech-yellow",
};

const categoryLabels: Record<
  CategoryKey,
  { title: string; description: string }
> = {
  frontend: {
    title: "Frontend",
    description: "앱 수준의 상태 관리, 이미지 최적화, 애니메이션 설계",
  },
  backend: {
    title: "Backend",
    description: "도메인 설계, 트랜잭션, Redis Cache Layer, RAG 아키텍처",
  },
  database: {
    title: "Database",
    description: "ERD 설계 & 정규화 / 성능 인덱싱 / 캐시 정책",
  },
  devops: {
    title: "DevOps",
    description: "무중단 배포, SSL 인증, CDN 설정",
  },
};

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-muted-foreground">균형 잡힌 풀스택 역량</p>
        </motion.div>

        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.keys(techStackData) as CategoryKey[]).map(
              (category, index) => {
                const Icon = categoryIcons[category];
                const data = techStackData[category];
                const colorClass = categoryColors[category];
                const label = categoryLabels[category];

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`h-full transition-colors ${colorClass}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          {label.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {label.description}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {data.items.map((item) => (
                            <Tooltip key={item.name}>
                              <TooltipTrigger>
                                <Badge
                                  variant="secondary"
                                  className="cursor-default"
                                >
                                  {item.name}
                                </Badge>
                              </TooltipTrigger>
                              {item.tooltip && (
                                <TooltipContent>
                                  <p>{item.tooltip}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              },
            )}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
