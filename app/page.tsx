import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { PlaygroundSection } from "@/components/sections/playground-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TroubleShootingSection } from "@/components/sections/troubleshooting-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="dark min-h-screen">
      <Navigation />
      <HeroSection />
      <TechStackSection />
      <PlaygroundSection />
      <ProjectsSection />
      <TroubleShootingSection />
      <ContactSection />
    </main>
  );
}
