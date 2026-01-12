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
        <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-sky-500/30 via-violet-500/20 to-purple-400/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2 animate-pulse" />
      </div>
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
