"use client";

import * as motion from "motion/react-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { impactStoriesData } from "@/data/impact-stories";
import { AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";

export function ImpactSection() {
  return (
    <section id="impact" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Impact Stories
          </h2>
          <p className="text-muted-foreground text-lg">
            실제로 만들어낸 변화들
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {impactStoriesData.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={story.id}
                  className="border border-border rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="text-left">
                      <div className="font-semibold text-lg mb-1">
                        {story.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {story.context}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pt-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-tech-yellow shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-2">Challenge</p>
                        <p className="text-sm text-muted-foreground">
                          {story.challenge}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-tech-cyan shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-2">Action</p>
                        <ul className="space-y-2">
                          {story.action.map((action, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex gap-2"
                            >
                              <span className="text-tech-cyan">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-tech-green shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-2">Result</p>
                        <div className="space-y-2">
                          <Badge className="bg-tech-green/20 text-tech-green border-tech-green/50">
                            {story.result.metric}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            {story.result.impact}
                          </p>
                        </div>
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
