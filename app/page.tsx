import HeroSection from '@/components/sections/HeroSection';
import AboutPreview from '@/components/sections/AboutPreview';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import StatsSection from '@/components/sections/StatsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CtaSection from '@/components/sections/CtaSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServicesSection />
      <WhyUsSection />
      <ProjectsSection />
      <StatsSection />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
