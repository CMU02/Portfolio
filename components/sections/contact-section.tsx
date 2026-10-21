import { ArrowUpRight, Github, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const linkClass =
  "group inline-flex min-h-11 items-center gap-2 text-lg font-semibold underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground md:text-2xl";

export function ContactSection() {
  return (
    <section id="contact" className="container mx-auto scroll-mt-20 px-6">
      <div className="border-t border-foreground py-20 md:py-28">
        <h2 className="text-balance text-5xl font-extrabold tracking-[-0.04em] md:text-8xl">
          Let&apos;s Connect.
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          함께 성장하고 싶습니다
        </p>
        <div className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:gap-10">
          <a href={`mailto:${SITE_CONFIG.email}`} className={linkClass}>
            <Mail aria-hidden className="size-5 shrink-0" />
            {SITE_CONFIG.email}
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 text-muted-foreground group-hover:text-foreground"
            />
          </a>
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (새 탭에서 열림)"
            className={linkClass}
          >
            <Github aria-hidden className="size-5 shrink-0" />
            GitHub
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 text-muted-foreground group-hover:text-foreground"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
