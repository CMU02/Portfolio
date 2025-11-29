"use client";

import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Zap, Lightbulb } from "lucide-react";

const expertiseItems = [
  {
    key: "fullstack",
    icon: Code2,
    color: "text-tech-cyan",
  },
  {
    key: "learning",
    icon: Zap,
    color: "text-tech-yellow",
  },
  {
    key: "problem",
    icon: Lightbulb,
    color: "text-tech-purple",
  },
];

export function ExpertiseSection() {
  const t = useTranslations("Expertise");

  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </motion.div>

        {/* 전문성 카드 */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {expertiseItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Icon className={`h-10 w-10 ${item.color} mb-4`} />
                    <CardTitle className="text-xl">
                      {t(`${item.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${item.key}.description`)}
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
