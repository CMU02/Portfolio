import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { GrowthSection } from "@/components/sections/growth-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SITE_CONFIG } from "@/lib/constants";

export default function Home() {
  // 홈페이지용 추가 구조화된 데이터
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: SITE_CONFIG.url,
      },
    ],
  };

  return (
    <main className="dark min-h-screen">
      {/* 홈페이지 전용 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Navigation />
      <HeroSection />
      <ExpertiseSection />
      <ProjectsSection />
      <GrowthSection />
      <ContactSection />
    </main>
  );
}
