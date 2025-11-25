"use client";

import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Github, FileText, Linkedin } from "lucide-react";

export function ContactSection() {
  const t = useTranslations("Contact");

  const contactLinks = [
    {
      icon: Mail,
      label: t("email"),
      href: "mailto:your-email@example.com",
      color: "hover:text-tech-cyan",
    },
    {
      icon: Github,
      label: t("github"),
      href: "https://github.com/yourusername",
      color: "hover:text-foreground",
    },
    {
      icon: FileText,
      label: t("resume"),
      href: "/resume.pdf",
      color: "hover:text-tech-green",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      color: "hover:text-tech-purple",
    },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <Card className="glow-blue">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                {contactLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full h-auto py-4 flex flex-col gap-2 ${link.color}`}
                      asChild
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <link.icon className="w-6 h-6" />
                        <span className="text-sm">{link.label}</span>
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 푸터 */}
        <Separator className="my-12" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>Built with Next.js, Tailwind CSS, and Motion</p>
          <p className="mt-1">© 2024 All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}
