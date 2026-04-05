import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import HeroSection from "@/components/sections/HeroSection";
import Section from "@/components/MotionSectionWrapper";
import ProofBar from "@/components/sections/ProofBar";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Writing from "@/components/sections/Writing";

export default function Home() {
  return (
    <div className="editorial-page">
      <section id="home" className="editorial-block-hero">
        <HeroSection />
        <ProofBar />
      </section>
      <div className="editorial-separator" aria-hidden="true" />
      <Section id="services" className="editorial-block editorial-block-main">
        <Services />
      </Section>
      <div className="editorial-separator" aria-hidden="true" />
      <Section id="projects" className="editorial-block editorial-block-main">
        <FeaturedProjects />
      </Section>
      <div className="editorial-separator" aria-hidden="true" />
      <Section id="skills" className="editorial-block editorial-block-main">
        <Skills />
      </Section>
      <div className="editorial-separator" aria-hidden="true" />
      <Section id="about" className="editorial-block editorial-block-main">
        <About />
      </Section>
      <div className="editorial-separator" aria-hidden="true" />
      <Section id="writing" className="editorial-block editorial-block-main">
        <Writing />
      </Section>
      <div className="editorial-separator" aria-hidden="true" />
      <Section id="contact" className="editorial-block editorial-block-end">
        <Contact />
      </Section>
    </div>
  );
}
