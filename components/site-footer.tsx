import { Github, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto flex flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} 최현준</p>
        <div className="flex gap-4">
          <a
            href={SITE_CONFIG.githubUrl}
            className="inline-flex min-h-11 items-center gap-1.5 hover:text-foreground"
          >
            <Github aria-hidden className="size-4" />
            GitHub
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-flex min-h-11 items-center gap-1.5 hover:text-foreground"
          >
            <Mail aria-hidden className="size-4" />
            이메일
          </a>
        </div>
      </div>
    </footer>
  );
}
