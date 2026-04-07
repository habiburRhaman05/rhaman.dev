import Hero from "./components/hero";
import Qualifications from "./components/qualifications";
import Skills from "./components/skills";
import Services from "./components/services";
import Projects from "./components/projects";
import Strengths from "./components/strengths";
import Achievements from "./components/achievements";
import Contact from "./components/contact";
import GoTopButton from "./components/goTopButton";
import AboutMe from "./components/aboutMe";

function SectionDivider() {
  return (
    <div className="relative py-2" aria-hidden="true">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/80 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
        <span className="h-1 w-1 rounded-full bg-primary/40" />
        <span className="h-1 w-1 rounded-full bg-primary/60" />
        <span className="h-1 w-1 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative grid-bg">
      <div className="grid-glow" />

      <Hero />

      <div className="max-w-7xl mx-auto sm:px-4 px-6 space-y-0">
        <Services />
        <SectionDivider />
        <Qualifications />
        <SectionDivider />
        <AboutMe/>
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Strengths />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <Contact />
      </div>

      <GoTopButton />
    </div>
  );
}
