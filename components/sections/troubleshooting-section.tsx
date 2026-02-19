"use client";

import * as motion from "motion/react-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { troubleShootingData } from "@/data/trouble-shooting";
import { AlertTriangle, Lightbulb, CheckCircle2, Search } from "lucide-react";

export function TroubleShootingSection() {
  return (
    <section id="troubleshooting" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trouble Shooting
          </h2>
          <p className="text-muted-foreground">실제 문제 해결 사례</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {troubleShootingData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={item.id}
                  className="border border-border rounded-lg px-4 bg-card"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <AlertTriangle className="w-5 h-5 text-tech-yellow shrink-0" />
                      <span className="font-medium">{item.problem}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div className="flex items-start gap-3">
                      <Search className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          원인 분석
                        </p>
                        <p className="text-sm">{item.cause}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-tech-cyan mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          해결 방법
                        </p>
                        <ul className="space-y-1">
                          {item.solution.map((sol, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-center gap-2"
                            >
                              <span className="text-tech-cyan">•</span>
                              {sol}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-tech-green mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          결과
                        </p>
                        <Badge className="bg-tech-green/20 text-tech-green border-tech-green/50">
                          {item.result}
                        </Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
