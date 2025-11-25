"use client";

import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
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

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  database: Database,
  devops: Cloud,
};

const categoryColors = {
  frontend: "border-tech-cyan/50 hover:border-tech-cyan",
  backend: "border-tech-purple/50 hover:border-tech-purple",
  database: "border-tech-green/50 hover:border-tech-green",
  devops: "border-tech-yellow/50 hover:border-tech-yellow",
};

export function TechStackSection() {
  const t = useTranslations("TechStack");

  return (
    <section id="tech-stack" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        {/* Bento Grid */}
        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(
              Object.keys(techStackData) as Array<keyof typeof techStackData>
            ).map((category, index) => {
              const Icon = categoryIcons[category];
              const data = techStackData[category];
              const colorClass = categoryColors[category];

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
                        {t(`${category}.title`)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {t(`${category}.description`)}
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
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
