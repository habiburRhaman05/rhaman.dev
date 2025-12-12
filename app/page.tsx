import Hero from "./components/hero";
import Experience from "./components/experience";
import Education from "./components/education";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Contact from "./components/contact";
import GoTopButton from "./components/goTopButton";
import AdHeader from "./components/ad-header";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 py-10">
      <Hero />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <GoTopButton />
    </div>
  );
}
