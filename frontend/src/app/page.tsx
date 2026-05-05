import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhySection } from "@/components/sections/WhySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <ServicesSection />
      <ProjectsSection />
      <WhySection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
