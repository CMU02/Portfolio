import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { GrowthSection } from "@/components/sections/growth-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="dark min-h-screen">
      <Navigation />
      <HeroSection />
      <ExpertiseSection />
      <ProjectsSection />
      <GrowthSection />
      <ContactSection />
    </main>
  );
}
