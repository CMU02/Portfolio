"use client";

import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Github } from "lucide-react";

export function ContactSection() {
  const t = useTranslations("Contact");

  const contactLinks = [
    {
      icon: Mail,
      label: t("email"),
      href: "mailto:your-email@example.com",
      primary: true,
    },
    {
      icon: Github,
      label: t("github"),
      href: "https://github.com/CMU02",
    },
    // {
    //   icon: FileText,
    //   label: t("resume"),
    //   href: "/resume.pdf",
    // },
    // {
    //   icon: BookOpen,
    //   label: t("blog"),
    //   href: "#",
    // },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {contactLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Button
                  size="lg"
                  variant={link.primary ? "default" : "outline"}
                  className={link.primary ? "glow-blue" : ""}
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="w-5 h-5 mr-2" />
                    {link.label}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 푸터 */}
        <Separator className="my-16" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground space-y-2"
        >
          <p>© 2024 최현준. All rights reserved.</p>
          <p className="text-xs">
            Built with Next.js 16, Tailwind CSS v4, and Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
