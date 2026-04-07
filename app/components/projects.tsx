"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Layers,
  Globe,
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Blitz Analyzer",
    subtitle: "AI-Powered Resume Intelligence SaaS",
    description:
      "A production-grade ATS analysis platform that transforms raw resumes into actionable insights. Features a complete user lifecycle from OTP authentication to Stripe-powered premium upgrades.",
    image: "/blitz-analyzer.png",
    tags: ["Next.js", "TypeScript", "Redux Toolkit", "shadcn/ui", "Stripe", "Zod"],
    demoUrl: "https://blitz-analyzer.vercel.app",
    githubUrl: "https://github.com/habiburRhaman05/Blitz-Analyzer",
    features: [
      "Secure Auth flow with OTP verification and role-based access control",
      "Dynamic Resume Analysis dashboard with history tracking and PDF reports",
      "Interactive Template Builder with a custom canvas for resume editing",
      "Full-stack payment integration using Stripe for premium feature gating",
      "Professional modular architecture (feature-based) for high maintainability",
    ],
    featured: true,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    status: "live", // ✅ added
  },
  {
    title: "SkillBridge",
    subtitle: "High-Performance Tutor Marketplace",
    description:
      "A comprehensive educational ecosystem featuring complex multi-role workflows. Built with Next.js 15, it bridges the gap between students and tutors with real-time scheduling and secure session management.",
    image: "/skill-bridge.png",
    tags: ["Next.js 15", "TanStack Query", "Tailwind v4", "Lucide", "Server Actions"],
    demoUrl: "https://skill-bridge-frontend-gamma.vercel.app",
    githubUrl: "https://github.com/habiburRhaman05/skill-bridge-frontend",
    features: [
      "Advanced RBAC with dedicated layouts and middleware-protected routes for Students, Tutors, and Admins",
      "Availability Engine for tutors to manage custom time slots and recurring schedules",
      "Hybrid Data Strategy using Server Components for SEO and TanStack Query for client-side caching",
      "Smooth UX with GSAP timelines, Framer Motion transitions, and Lenis inertia scrolling",
      "Interactive Analytics dashboard for tutors and admins built with Recharts",
    ],
    featured: false,
    gradient: "from-indigo-600 via-violet-600 to-purple-600",
    status: "live",
  },
  {
    title: "Opportune Hub",
    subtitle: "Full-Stack Job Portal",
    description:
      "A modern job portal platform with real-time listings, advanced search, and smooth UI/UX. Built with a focus on performance and user engagement.",
    image: "/opportune-hub.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Node.js", "MongoDB"],
    demoUrl: "https://opportune-hub.vercel.app/",
    githubUrl: "https://github.com/habiburRhaman05/OpportuneX",
    features: [
      "Animated homepage with engaging transitions using Framer Motion",
      "Responsive, mobile-first design with Tailwind CSS",
      "Contact form with Nodemailer for email handling",
      "Fast performance with Next.js SSR & optimized bundling",
    ],
    featured: false,
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    status: "running", // ✅ Running / Live
  },
{
  title: "Lumina Compliance AI",
  subtitle: "Enterprise Document Intelligence Engine",
  description:
    "A high-performance RAG-based platform designed to deconstruct complex legal frameworks and compliance documents into actionable risk-assessment reports.",
  image: "/lumina-ai.png", 
  tags: ["Next.js 15", "Golang", "PostgreSQL", "Vector DB", "Redis"],
  demoUrl: "#", // Architectural Design Phase
  githubUrl: "", // Private Enterprise Repository
  features: [
    "Neural Document Parsing: Advanced OCR and layout analysis to extract structured data from unstructured legal PDFs",
    "Contextual RAG Engine: High-speed semantic search across massive document sets using Vector embeddings and Redis caching",
    "Risk Score Synthesis: AI-driven analysis that identifies compliance gaps and generates automated mitigation strategies",
    "High-Concurrency Pipeline: A Go-powered backend engineered for parallel document processing and low-latency inference",
    "Audit-Ready Architecture: Complete versioning of AI responses with source-link citations for maximum transparency",
  ],
  featured: false,
  gradient: "from-slate-900 via-slate-800 to-slate-900", // "Dark Mode Premium" aesthetic
  status: "upcoming", // ✅ Engineering & Design Phase
}
];

// Helper to render status badge
function StatusBadge({ status }: { status: string }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[11px] font-semibold border border-green-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Live
      </span>
    );
  }
  if (status === "upcoming") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-semibold border border-amber-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Planning
      </span>
    );
  }
  if (status === "running") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-white-400 text-[11px] font-semibold border border-amber-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        Running
      </span>
    );
  }
  return null;
}

function FeaturedProject({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const isUpcoming = project.status === "upcoming";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-3xl border border-border bg-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-70 group-hover:opacity-100 transition-opacity`}
      />

      <div className="grid lg:grid-cols-12 gap-0">
        {/* Image Section */}
        <div className="lg:col-span-7 relative overflow-hidden bg-muted min-h-[280px] lg:min-h-[420px]">
          <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none lg:hidden" />

          {/* Featured badge (only if featured) */}
          {project.featured && (
            <div className="absolute top-5 left-5 z-10">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Featured Project
              </motion.span>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-5 left-5 z-10 lg:hidden"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card text-xs font-medium border border-border">
              <Layers className="w-3 h-3 text-primary" />
              {project.tags.length} Technologies
            </span>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-5 p-7 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-widest">
                <Globe className="w-3 h-3" />
                {project.subtitle}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {project.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="rounded-lg text-xs font-medium bg-muted hover:bg-primary/10 hover:text-primary border-0 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="space-y-2.5">
              <p className="text-sm font-semibold flex items-center gap-2">
                <span className="w-5 h-px bg-primary" />
                Key Highlights
              </p>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.08 }}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              {isUpcoming ? (
                <Button
                  size="default"
                  className="rounded-xl gap-2 opacity-80 cursor-not-allowed"
                  disabled
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview Soon
                </Button>
              ) : (
                <Link href={project.demoUrl} target="_blank">
                  <Button
                    size="default"
                    className="rounded-xl gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </Button>
                </Link>
              )}
              {project.githubUrl && !isUpcoming && (
                <Link href={project.githubUrl} target="_blank">
                  <Button
                    variant="outline"
                    size="default"
                    className="rounded-xl gap-2 hover:bg-muted"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const isUpcoming = project.status === "upcoming";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
    >
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.gradient} opacity-50 group-hover:opacity-100 group-hover:h-1 transition-all`}
      />

      <div className="relative overflow-hidden bg-muted h-[220px]">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-full object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick action buttons only for live projects */}
        {!isUpcoming && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Link href={project.demoUrl} target="_blank" className="flex-1">
              <Button
                size="sm"
                className="w-full rounded-lg gap-1.5 shadow-lg text-xs"
              >
                <ExternalLink className="w-3 h-3" />
                Live Demo
              </Button>
            </Link>
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg gap-1.5 bg-card border-border text-xs"
                >
                  <Github className="w-3 h-3" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">
              {project.subtitle}
            </span>
            <h3 className="text-lg font-bold mt-1">{project.title}</h3>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="rounded-md text-[10px] font-medium bg-muted hover:bg-primary/10 hover:text-primary border-0 transition-colors px-2 py-0.5"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge
              variant="secondary"
              className="rounded-md text-[10px] font-medium bg-muted border-0 px-2 py-0.5"
            >
              +{project.tags.length - 4}
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-primary uppercase tracking-wider mb-2"
          >
            Portfolio
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold section-heading">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl">
            A selection of projects that showcase my skills in building
            production-grade web applications.
          </p>
        </div>

        <div className="space-y-8 mb-10">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={index} project={project} index={index} />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-6 flex items-center gap-2"
            >
              <span className="w-6 h-px bg-primary/50" />
              More Projects
            </motion.h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}