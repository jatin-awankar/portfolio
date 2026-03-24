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
    <>
      <section id="home">
        <HeroSection />
        <ProofBar />
      </section>
      <Section id="services">
        <Services />
      </Section>
      <Section id="projects">
        <FeaturedProjects />
      </Section>
      <Section id="skills">
        <Skills />
      </Section>
      <Section id="about">
        <About />
      </Section>
      {/* <Section>
        <EngineeringMindset />
      </Section> */}
      {/* <Section>
        <Experience />
      </Section> */}
      <Section id="writing">
        <Writing />
      </Section>
      <Section id="contact">
        <Contact />
      </Section>
    </>
  );
}
