import About from "@/components/About";
import Contact from "@/components/Contact";
// import EngineeringMindset from "@/components/EngineeringMindset";
// import Experience from "@/components/Experience";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/HeroSection";
import Section from "@/components/MotionSectionWrapper";
import ProofBar from "@/components/ProofBar";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Writing from "@/components/Writing";

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
      {/* <Section>
        <EngineeringMindset />
      </Section> */}
      {/* <Section>
        <Experience />
      </Section> */}
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
