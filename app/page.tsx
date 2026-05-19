import { Fragment } from "react";
import dynamic from "next/dynamic";
import GoTopButton from "./components/goTopButton";
const Skeleton = () => <div className="h-96 w-full animate-pulse rounded-2xl bg-muted/10" />;
const Hero = dynamic(() => import("./components/hero"), { loading: Skeleton });
const Services = dynamic(() => import("./components/services"), { loading: Skeleton });
const Qualifications = dynamic(() => import("./components/qualifications"), { loading: Skeleton });
const AboutMe = dynamic(() => import("./components/aboutMe"), { loading: Skeleton });
const Skills = dynamic(() => import("./components/skills"), { loading: Skeleton });
const Strengths = dynamic(() => import("./components/strengths"), { loading: Skeleton });
const Projects = dynamic(() => import("./components/projects"), { loading: Skeleton });
const Achievements = dynamic(() => import("./components/achievements"), { loading: Skeleton });
const Contact = dynamic(() => import("./components/contact"), { loading: Skeleton });

function SectionDivider() {
  return (
    <div className="relative py-2" aria-hidden="true">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/80 to-transparent" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1">
        <span className="h-1 w-1 rounded-full bg-primary/40" />
        <span className="h-1 w-1 rounded-full bg-primary/60" />
        <span className="h-1 w-1 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}

export default function Home() {
  const sections = [
    <Services key="services" />,
    <Qualifications key="qualifications" />,
    <AboutMe key="about-me" />,
    <Skills key="skills" />,
    <Strengths key="strengths" />,
    <Projects key="projects" />,
    <Achievements key="achievements" />,
    <Contact key="contact" />,
  ];

  return (
    <main className="relative min-h-screen grid-bg">
      <div className="grid-glow" aria-hidden="true" />

      <Hero />

      <div className="mx-auto max-w-7xl px-6 sm:px-4 space-y-0">
        {sections.map((section, index) => (
          <Fragment key={section.key}>
            {section}
            {index < sections.length - 1 && <SectionDivider />}
          </Fragment>
        ))}
      </div>

      <GoTopButton />
    </main>
  );
}
