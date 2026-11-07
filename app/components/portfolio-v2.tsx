"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, BookOpen, Briefcase, CheckCircle2,
  Cloud, Code2, Database, Download, ExternalLink, Github,
  GraduationCap, Linkedin, Mail, Menu, Moon, Play, Send, Smartphone,
  Sparkles, Sun, Workflow, X, Bot, Layers3, Video, Globe,
  type LucideIcon,
} from "lucide-react";
import clientProjectData from "../data/client-projects.json";

type ClientProject = (typeof clientProjectData)[number];
const sections = [
  { name: "Home", href: "#hero" },
  { name: "Qualifications", href: "#qualifications" },
  { name: "Skills", href: "#skills" },
  { name: "Personal Work", href: "#personal-projects" },
  { name: "Client Work", href: "#client-projects" },
  { name: "Contact", href: "#contact" },
];

const personalProjects = [
  {
    title: "Blitz Analyzer",
    category: "AI / SaaS platform",
    summary: "AI-powered resume analysis, matching insights, reports, and payment-enabled features.",
    image: "/blitz-analyzer.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Stripe"],
    live: "https://blitz-analyzer.vercel.app",
    source: "https://github.com/habiburRhaman05/Blitz-Analyzer",
  },
  {
    title: "EduSpark Academy",
    category: "EdTech / Full-stack",
    summary: "An online learning platform combining courses, sessions, scheduling, and instructor workflows.",
    image: "/eduspark.png",
    technologies: ["Next.js", "Express", "Socket.io", "PostgreSQL", "BullMQ"],
    live: "https://edu-spark-zone.vercel.app",
    source: "https://github.com/habiburRhaman05/EduSpark-modern-learning-platfrom",
  },
  {
    title: "SkillBridge",
    category: "Marketplace / Booking",
    summary: "A tutoring marketplace with role-based experiences and scheduling-oriented workflows.",
    image: "/skill-bridge.png",
    technologies: ["Next.js", "TypeScript", "TanStack Query", "PostgreSQL"],
    live: "https://skill-bridge-frontend-gamma.vercel.app",
    source: "https://github.com/habiburRhaman05/skill-bridge-frontend",
  },
  {
    title: "Opportune Hub",
    category: "Job platform / Web app",
    summary: "A job-discovery web application with responsive browsing and a modern interface.",
    image: "/opportune-hub.png",
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    live: "https://opportune-hub.vercel.app/",
    source: "https://github.com/habiburRhaman05/OpportuneX",
  },
];

const skillGroups: { label: string; icon: LucideIcon; skills: string[] }[] = [
  { label: "Frontend", icon: Code2, skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "Backend & APIs", icon: Layers3, skills: ["Node.js", "Express", "Python", "FastAPI", "REST APIs"] },
  { label: "Mobile", icon: Smartphone, skills: ["React Native", "Expo", "Mobile API integration"] },
  { label: "Databases", icon: Database, skills: ["PostgreSQL", "Prisma", "MongoDB", "Redis"] },
  { label: "Cloud & DevOps", icon: Cloud, skills: ["AWS", "Docker", "VPS", "CI/CD", "Vercel"] },
  { label: "Automation", icon: Workflow, skills: ["GoHighLevel", "n8n", "Make", "Zapier", "Webhooks"] },
  { label: "AI Integrations", icon: Bot, skills: ["Retell AI", "AI Voice Agents", "LLM APIs", "RAG concepts"] },
  { label: "Engineering Tools", icon: Github, skills: ["Git", "GitHub", "Postman", "Figma", "Claude Code"] },
];

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-9 md:mb-12 max-w-2xl">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.21em] text-blue-600 dark:text-blue-400">
        <span className="h-[2px] w-6 rounded-full bg-current" /> {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-[-0.045em] text-slate-950 dark:text-white sm:text-4xl md:text-[42px]">{title}</h2>
      <p className="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-400 md:text-base">{subtitle}</p>
    </div>
  );
}

function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>{children}</section>;
}

function TopNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setReady(true);
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#090d17]/90" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8" aria-label="Main navigation">
        <a href="#hero" className="group text-[23px] font-bold tracking-[-0.075em] text-slate-950 dark:text-white" onClick={() => setOpen(false)}>
          Habib<span className="text-blue-600 dark:text-blue-400">.</span>
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {sections.map((item) => <a key={item.href} className="text-[13px] font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" href={item.href}>{item.name}</a>)}
        </div>
        <div className="flex items-center gap-2">
          {ready && <button type="button" className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10" aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>{resolvedTheme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>}
          <a href="#contact" className="hidden items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-blue-700/10 transition hover:bg-blue-500 sm:inline-flex">Let's talk <ArrowUpRight size={15} /></a>
          <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 dark:border-white/10 lg:hidden" onClick={() => setOpen((value) => !value)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-slate-200 bg-white px-5 dark:border-white/10 dark:bg-[#090d17] lg:hidden"><div className="mx-auto grid max-w-6xl gap-1 py-3">{sections.map((item) => <a key={item.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10" href={item.href} onClick={() => setOpen(false)}>{item.name}</a>)}</div></motion.div>}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative scroll-mt-20 overflow-hidden border-b border-slate-200/70 pb-20 pt-36 dark:border-white/[0.07] md:pb-28 md:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-[550px] w-[550px] rounded-full bg-blue-500/[0.09] blur-[120px] dark:bg-blue-500/[0.11]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-44 -left-52 h-[500px] w-[500px] rounded-full bg-cyan-400/[0.06] blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.22fr_0.78fr] lg:gap-20">
        <div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-emerald-50 px-3.5 py-1.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/[0.07] dark:text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Available for freelance & remote projects</span>
            <p className="mt-8 text-sm font-semibold tracking-[0.14em] text-blue-600 dark:text-blue-400">HELLO, I'M HABIBUR RAHMAN</p>
            <h1 className="mt-4 max-w-3xl text-[43px] font-semibold leading-[1.08] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-[58px] lg:text-[66px]">
              I build software that <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">works for your business.</span>
            </h1>
            <p className="mt-6 max-w-[570px] text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-[17px]">Full-stack developer working across web, mobile, cloud infrastructure, GoHighLevel automation, and AI voice integrations. From an idea to a working product, I focus on practical solutions and clean execution.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-500" href="#client-projects">Explore my work <ArrowRight size={17} /></a>
              <a className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-400 dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:border-blue-400/50" href="#contact">Start a conversation <ArrowUpRight size={16} /></a>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-slate-200 pt-6 dark:border-white/10">
              <span className="text-xs text-slate-500 dark:text-slate-400">Based in Bangladesh · Working worldwide</span>
              <div className="flex items-center gap-4">
                <a href="https://github.com/habiburRhaman05" target="_blank" rel="noopener noreferrer" className="text-slate-500 transition hover:text-blue-600 dark:hover:text-blue-400" aria-label="GitHub"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/habiburrhaman05/" target="_blank" rel="noopener noreferrer" className="text-slate-500 transition hover:text-blue-600 dark:hover:text-blue-400" aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="/Resume of Habibur Rahman (Full Stack Web Developer).pdf" download className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-blue-600 dark:hover:text-blue-400"><Download size={15} /> Resume</a>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.65 }} className="relative mx-auto w-full max-w-[390px] lg:justify-self-end">
          <div className="absolute -inset-3 rounded-[32px] border border-blue-500/15 dark:border-blue-400/15" />
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-[27px] bg-slate-200 shadow-2xl shadow-blue-950/20 dark:bg-slate-800">
            <Image src="https://res.cloudinary.com/drngnsgwy/image/upload/v1775490683/Gemini_Generated_Image__jzxcpb.png" alt="Portrait of Habibur Rahman" fill priority sizes="(max-width: 1024px) 80vw, 390px" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050b1c]/85 via-[#050b1c]/20 to-transparent px-6 pb-6 pt-20 text-white"><p className="text-[13px] font-semibold">Full-Stack · Automation · AI</p><p className="mt-1 text-[11px] text-white/70">Engineering useful solutions, end to end</p></div>
          </div>
          <div className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-white/15 dark:bg-[#151c2b]"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400"><Code2 size={18} /></span><div><p className="text-[11px] font-semibold text-slate-900 dark:text-white">Build. Integrate. Ship.</p><p className="text-[10px] text-slate-500 dark:text-slate-400">From product to production</p></div></div>
        </motion.div>
      </div>
      <a href="#qualifications" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-1 text-[11px] text-slate-400 hover:text-blue-500 md:inline-flex">Scroll to explore <ArrowDown size={13} /></a>
    </section>
  );
}

function Qualifications() {
  const cards = [
    { icon: Briefcase, label: "Professional experience", title: "Junior Software Engineer", org: "Octopi Digital Limited", date: "July 2026 – Present", detail: "Full-stack development, automation workflows, API integrations, and production troubleshooting across client-facing projects." },
    { icon: Award, label: "Training", title: "AI-Driven Software Engineering Bootcamp", org: "Programming Hero", date: "October 2025 – April 2026", detail: "Practical work across modern web development, databases, software architecture, AI integrations, and deployment." },
    { icon: GraduationCap, label: "Education", title: "Secondary School Certificate (Science)", org: "Mir Kashem Bhumuki High School", date: "2021 – 2022", detail: "Academic foundation in science and mathematics." },
  ];
  return (
    <Section id="qualifications">
      <SectionTitle eyebrow="Background" title="Qualifications & experience" subtitle="A practical engineering foundation, continued learning, and hands-on work with business applications." />
      <div className="grid gap-4 md:grid-cols-3">{cards.map((item) => <article key={item.title} className="group rounded-[22px] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-lg dark:border-white/[0.08] dark:bg-white/[0.035] dark:hover:border-blue-400/25"><div className="mb-6 flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400"><item.icon size={21} /></span><span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{item.date}</span></div><p className="text-[11px] font-bold uppercase tracking-[0.13em] text-blue-600 dark:text-blue-400">{item.label}</p><h3 className="mt-3 text-[18px] font-semibold leading-snug text-slate-950 dark:text-white">{item.title}</h3><p className="mt-2 text-[13px] font-medium text-slate-600 dark:text-slate-300">{item.org}</p><p className="mt-5 text-[13px] leading-6 text-slate-600 dark:text-slate-400">{item.detail}</p></article>)}</div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <SectionTitle eyebrow="Toolbox" title="Skills & technologies" subtitle="My day-to-day toolkit spans product development, system integration, infrastructure, and automation." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{skillGroups.map((group) => <div key={group.label} className="rounded-[20px] border border-slate-200 bg-white p-5 dark:border-white/[0.08] dark:bg-[#0e1420]"><div className="mb-5 flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400"><group.icon size={17} /></span><h3 className="text-sm font-semibold text-slate-950 dark:text-white">{group.label}</h3></div><div className="flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.035] dark:text-slate-300">{skill}</span>)}</div></div>)}</div>
      <div className="mt-5 flex flex-col gap-4 rounded-[20px] border border-dashed border-blue-300/70 bg-blue-50/50 p-5 dark:border-blue-400/20 dark:bg-blue-400/[0.035] sm:flex-row sm:items-center sm:gap-7"><div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"><BookOpen size={18} className="text-blue-600 dark:text-blue-400" /> On my learning roadmap</div><p className="text-[13px] leading-6 text-slate-600 dark:text-slate-400">Advanced distributed systems · Kubernetes · LLM evaluation · deeper cloud architecture</p></div>
    </Section>
  );
}

function PersonalProjects() {
  return (
    <Section id="personal-projects">
      <SectionTitle eyebrow="Independent builds" title="Personal projects" subtitle="Products and experiments where I explore architecture, interfaces, and real-world engineering challenges." />
      <div className="grid gap-5 md:grid-cols-2">{personalProjects.map((project) => <article key={project.title} className="group overflow-hidden rounded-[23px] border border-slate-200 bg-white transition hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/5 dark:border-white/[0.08] dark:bg-[#0e1420] dark:hover:border-blue-400/30"><div className="relative aspect-[16/9] overflow-hidden border-b border-slate-200 bg-[#0d1422] dark:border-white/[0.07]"><Image src={project.image} alt={`${project.title} project screenshot`} fill sizes="(max-width: 768px) 100vw, 550px" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.045]" /><div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" /></div><div className="p-6"><p className="text-[11px] font-bold uppercase tracking-[0.13em] text-blue-600 dark:text-blue-400">{project.category}</p><div className="mt-2 flex items-center justify-between gap-3"><h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{project.title}</h3><ArrowUpRight size={19} className="shrink-0 text-slate-400 transition group-hover:text-blue-500" /></div><p className="mt-3 min-h-[48px] text-[13px] leading-6 text-slate-600 dark:text-slate-400">{project.summary}</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">{tech}</span>)}</div><div className="mt-6 flex items-center gap-5 border-t border-slate-100 pt-5 text-[13px] font-semibold dark:border-white/[0.08]"><a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-500 dark:text-blue-400">Live demo <ExternalLink size={13} /></a><a href={project.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"><Github size={15} /> Source code</a></div></div></article>)}</div>
    </Section>
  );
}

const coverIcons: Record<string, LucideIcon> = { automation: Workflow, voice: Bot, dashboard: Layers3 };
function ClientCover({ project }: { project: ClientProject }) {
  const Icon = coverIcons[project.kind] || Workflow;
  if (project.coverImage) return <img src={project.coverImage} alt={`${project.title} project preview`} loading="lazy" className="h-full w-full object-cover object-center" />;
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d1427] text-white">
      <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[65px]" />
      <div className="absolute -bottom-36 -right-16 h-80 w-80 rounded-full bg-cyan-400/15 blur-[75px]" />
      <div className="relative flex w-[83%] max-w-[420px] items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.045] p-4 shadow-2xl backdrop-blur-sm">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-blue-400/30 bg-blue-400/10 text-blue-300"><Icon size={28} /></span>
        <span className="min-w-0 flex-1"><span className="block text-xs font-semibold">{project.category}</span><span className="mt-1 block text-[10px] text-slate-400">System design · Integration · Delivery</span><span className="mt-3 block h-1.5 w-[85%] rounded-full bg-white/15" /><span className="mt-1.5 block h-1.5 w-[62%] rounded-full bg-white/10" /></span>
        <CheckCircle2 size={19} className="shrink-0 text-emerald-400" />
      </div>
      <div className="pointer-events-none absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-wider text-white/40">{project.isPlaceholder ? "Sample project preview" : "Project overview"}</div>
    </div>
  );
}

function ClientProjects() {
  const [videoProject, setVideoProject] = useState<ClientProject | null>(null);
  useEffect(() => {
    if (!videoProject) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setVideoProject(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [videoProject]);
  return (
    <Section id="client-projects">
      <SectionTitle eyebrow="Solutions for businesses" title="Client projects" subtitle="A place for selected real-world implementations, the problems behind them, and what I built to solve them." />
      {clientProjectData.some((project) => project.isPlaceholder) && <div className="mb-6 flex items-start gap-2 rounded-xl border border-amber-300/60 bg-amber-50 p-3 text-[12px] leading-5 text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/[0.065] dark:text-amber-100"><Sparkles size={16} className="mt-0.5 shrink-0" /><span><strong>Preview data:</strong> These cards are clearly labeled examples. Replace <code className="font-mono">app/data/client-projects.json</code> with your authorized client details, real screenshots, and demos before promoting them as completed work.</span></div>}
      <div className="grid gap-5 lg:grid-cols-3">{clientProjectData.map((project) => <article key={project.id} className="flex flex-col overflow-hidden rounded-[23px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-white/[0.08] dark:bg-[#0e1420] dark:hover:border-blue-400/30"><div className="relative aspect-[16/10] overflow-hidden"><ClientCover project={project} />{project.isPlaceholder && <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">Sample data</span>}</div><div className="flex flex-1 flex-col p-5"><p className="text-[11px] font-bold uppercase tracking-[0.11em] text-blue-600 dark:text-blue-400">{project.industry}</p><h3 className="mt-2 text-lg font-semibold leading-snug text-slate-950 dark:text-white">{project.title}</h3><p className="mt-3 text-[13px] leading-6 text-slate-600 dark:text-slate-400">{project.summary}</p>{!project.isPlaceholder && <p className="mt-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">Client: {project.client}</p>}<div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-[12px] leading-5 dark:border-white/[0.08]"><p className="text-slate-600 dark:text-slate-400"><span className="font-semibold text-slate-900 dark:text-slate-200">Challenge:</span> {project.challenge}</p><p className="text-slate-600 dark:text-slate-400"><span className="font-semibold text-slate-900 dark:text-slate-200">Solution:</span> {project.solution}</p><p className="text-slate-600 dark:text-slate-400"><span className="font-semibold text-slate-900 dark:text-slate-200">Outcome:</span> {project.outcome}</p></div><div className="mt-4 flex flex-wrap gap-1.5">{project.technologies.map((tech) => <span key={tech} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">{tech}</span>)}</div><div className="mt-auto flex flex-wrap gap-3 pt-6">{project.demoVideoUrl && <button type="button" onClick={() => setVideoProject(project)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"><Play size={13} fill="currentColor" /> {project.isPlaceholder ? "Watch sample video" : "Watch project demo"}</button>}{project.liveUrl && <a target="_blank" rel="noopener noreferrer" href={project.liveUrl} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-semibold hover:border-blue-400 dark:border-white/15">View project <ArrowUpRight size={14} /></a>}{!project.demoVideoUrl && !project.liveUrl && <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400"><Video size={15} /> Add demo video in JSON</span>}</div></div></article>)}</div>
      <AnimatePresence>{videoProject && <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setVideoProject(null); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div role="dialog" aria-modal="true" aria-labelledby="client-video-title" initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="w-full max-w-3xl rounded-[20px] border border-white/15 bg-[#111827] p-4 text-white shadow-2xl sm:p-5"><div className="mb-4 flex items-start justify-between gap-3"><div><h3 id="client-video-title" className="text-sm font-semibold sm:text-base">{videoProject.title}</h3><p className="mt-1 text-xs text-slate-400">{videoProject.demoVideoLabel || "Project walkthrough"}</p></div><button type="button" aria-label="Close video" onClick={() => setVideoProject(null)} className="rounded-lg bg-white/10 p-2 hover:bg-white/20"><X size={18} /></button></div><video key={videoProject.demoVideoUrl} src={videoProject.demoVideoUrl} className="aspect-video w-full rounded-xl bg-black object-contain" controls playsInline preload="metadata">Your browser does not support this video. <a href={videoProject.demoVideoUrl}>Open video</a>.</video>{videoProject.isPlaceholder && <p className="mt-3 text-[11px] text-amber-200">This free stock sample is not a demonstration of the project. Replace it with an approved, real walkthrough.</p>}</motion.div></motion.div>}</AnimatePresence>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", projectType: "Full-stack development", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending"); setErrorMessage("");
    try {
      const response = await fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(json.error || "Unable to send the message.");
      setStatus("success");
      setForm({ name: "", email: "", projectType: "Full-stack development", message: "", website: "" });
    } catch (error) { setStatus("error"); setErrorMessage(error instanceof Error ? error.message : "Unable to send the message."); }
  }
  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.035] dark:text-white dark:placeholder:text-slate-500";
  return (
    <Section id="contact">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div><SectionTitle eyebrow="Get in touch" title="Let's build something useful." subtitle="Have a product idea, an integration problem, or an automation that needs attention? Tell me what you're working on." /><div className="space-y-4"><a className="group flex items-center gap-3 text-[14px] font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400" href="mailto:devhabib2005@gmail.com"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400"><Mail size={17} /></span> devhabib2005@gmail.com <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" /></a><a className="group flex items-center gap-3 text-[14px] font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400" href="https://www.linkedin.com/in/habiburrhaman05/" target="_blank" rel="noopener noreferrer"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400"><Linkedin size={17} /></span> Connect on LinkedIn <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" /></a></div><p className="mt-8 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Globe size={15} /> Based in Bangladesh, available for remote work</p></div>
        <form onSubmit={submit} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.035] dark:border-white/10 dark:bg-[#101725] dark:shadow-none sm:p-7"><div className="mb-6"><h3 className="text-lg font-semibold text-slate-950 dark:text-white">Tell me about your project</h3><p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400">Share the essentials and I'll get back to you by email.</p></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your name<input required minLength={2} maxLength={120} className={`${inputClass} mt-2`} value={form.name} autoComplete="name" placeholder="Your name" onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email address<input required type="email" maxLength={254} className={`${inputClass} mt-2`} value={form.email} autoComplete="email" placeholder="you@company.com" onChange={(event) => setForm({ ...form, email: event.target.value })} /></label></div><label className="mt-4 block text-xs font-semibold text-slate-700 dark:text-slate-300">What do you need help with?<select className={`${inputClass} mt-2`} value={form.projectType} onChange={(event) => setForm({ ...form, projectType: event.target.value })}><option>Full-stack development</option><option>GHL / n8n automation</option><option>AI voice agents & integrations</option><option>Mobile application</option><option>Cloud / deployment</option><option>Something else</option></select></label><label className="mt-4 block text-xs font-semibold text-slate-700 dark:text-slate-300">Project details<textarea required minLength={10} maxLength={4000} rows={5} className={`${inputClass} mt-2 resize-y`} value={form.message} placeholder="What's the problem, goal, or scope?" onChange={(event) => setForm({ ...form, message: event.target.value })} /></label><div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input autoComplete="off" tabIndex={-1} value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></label></div><button type="submit" disabled={status === "sending"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Sending…" : "Send project inquiry"}<Send size={16} /></button><div aria-live="polite" className="mt-3 min-h-[18px] text-center text-xs">{status === "success" && <p className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><CheckCircle2 size={14} /> Message sent successfully.</p>}{status === "error" && <p className="text-rose-600 dark:text-rose-400">{errorMessage} <a className="underline" href="mailto:devhabib2005@gmail.com">Email directly</a>.</p>}</div></form>
      </div>
    </Section>
  );
}

function Footer() {
  return <footer className="border-t border-slate-200/80 dark:border-white/[0.08]"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8"><p className="text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Habibur Rahman. Built with care.</p><div className="flex items-center gap-5"><a className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400" href="https://github.com/habiburRhaman05" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a><a className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400" href="https://www.linkedin.com/in/habiburrhaman05/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400" href="mailto:devhabib2005@gmail.com" aria-label="Email"><Mail size={18} /></a></div></div></footer>;
}

export default function Portfolio() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-900 selection:bg-blue-500/20 dark:bg-[#090d17] dark:text-slate-100">
      <TopNav />
      <main>
        <Hero />
        <div className="mx-auto max-w-6xl px-5 sm:px-8"><Qualifications /></div>
        <div className="border-y border-slate-200/70 bg-slate-50/80 px-5 dark:border-white/[0.07] dark:bg-white/[0.012] sm:px-8"><div className="mx-auto max-w-6xl"><Skills /></div></div>
        <div className="mx-auto max-w-6xl px-5 sm:px-8"><PersonalProjects /></div>
        <div className="border-y border-slate-200/70 bg-slate-50/80 px-5 dark:border-white/[0.07] dark:bg-white/[0.012] sm:px-8"><div className="mx-auto max-w-6xl"><ClientProjects /></div></div>
        <div className="mx-auto max-w-6xl px-5 sm:px-8"><Contact /></div>
      </main>
      <Footer />
    </div>
  );
}