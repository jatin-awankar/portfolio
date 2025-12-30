import About from "@/components/About";
import Contact from "@/components/Contact";
import EngineeringMindset from "@/components/EngineeringMindset";
import Experience from "@/components/Experience";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/HeroSection";
import Section from "@/components/MotionSectionWrapper";
import ProofBar from "@/components/ProofBar";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Section>
        <ProofBar />
      </Section>

      <Section id="about">
        <About />
      </Section>
      <Section id="projects">
        <FeaturedProjects />
      </Section>
      <Section id="skills">
        <Skills />
      </Section>
      <Section>
        <EngineeringMindset />
      </Section>
      <Section>
        <Experience />
      </Section>

      <Section id="contact">
        <Contact />
      </Section>
    </>
  );
}
