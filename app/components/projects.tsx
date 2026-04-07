"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Lock,
  X,
  Zap,
  Rocket,
  Maximize2,
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: "blitz",
    title: "Blitz Analyzer",
    subtitle: "AI-Powered Resume Intelligence SaaS",
    description: "A production-grade ATS analysis platform that transforms raw resumes into actionable insights.",
    image: "/blitz-analyzer.png",
    tags: ["Next.js", "TypeScript", "Postgresql", "Express.js", "Redis", "Stripe"],
    demoUrl: "https://blitz-analyzer.vercel.app",
    githubUrl: "https://github.com/habiburRhaman05/Blitz-Analyzer",
    features: [
      "Secure Auth flow with OTP verification and RBAC",
      "Dynamic Resume Analysis with PDF reports",
      "Interactive Template Builder with custom canvas",
      "Full-stack payment integration using Stripe",
    ],
    challenges: [
      "Optimizing PDF parsing to handle non-standard resume layouts without data loss.",
      "Managing high-concurrency Redis sessions during peak traffic hours.",
      "Ensuring Stripe webhook reliability for real-time subscription gating."
    ],
    futurePlans: [
      "Implement AI-generated mock interview questions based on analyzed resumes.",
      "Add team/enterprise accounts for recruitment agencies.",
      "Introduce browser-based resume preview with direct annotation tools."
    ],
    featured: true,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    status: "live",
  },
  {
    id: "skillbridge",
    title: "SkillBridge",
    subtitle: "High-Performance Tutor Marketplace",
    description: "A comprehensive educational ecosystem featuring complex multi-role workflows and scheduling.",
    image: "/skill-bridge.png",
    tags: ["Next.js 15", "TanStack Query", "Typescript", "Postgresql", "Express.js"],
    demoUrl: "https://skill-bridge-frontend-gamma.vercel.app",
    githubUrl: "https://github.com/habiburRhaman05/skill-bridge-frontend",
    features: [
      "Advanced RBAC for Students, Tutors, and Admins",
      "Custom Availability Engine for recurring schedules",
      "Hybrid Data Strategy using Server Components and TanStack Query",
    ],
    challenges: [
      "Building a performant availability engine that handles timezone conversions for global users.",
      "Designing a complex database schema to prevent overlapping session bookings.",
      "Implementing smooth page transitions without breaking Lenis inertia scrolling."
    ],
    futurePlans: [
      "Integrate WebRTC for direct in-platform video tutoring sessions.",
      "AI-driven tutor matching based on student learning speed and history.",
      "Develop a mobile-first Progressive Web App (PWA) for on-the-go scheduling."
    ],
    featured: false,
    gradient: "from-indigo-600 via-violet-600 to-purple-600",
    status: "live",
  },
  {
    id: "opportune",
    title: "Opportune Hub",
    subtitle: "Full-Stack Job Portal",
    description: "A modern job portal platform with real-time listings, advanced search, and smooth UI/UX.",
    image: "/opportune-hub.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Node.js", "MongoDB"],
    demoUrl: "https://opportune-hub.vercel.app/",
    githubUrl: "https://github.com/habiburRhaman05/OpportuneX",
    features: [
      "Animated homepage transitions using Framer Motion",
      "Responsive, mobile-first design with Tailwind CSS",
      "Contact form with Nodemailer handling",
    ],
    challenges: [
      "Achieving sub-second search results using MongoDB full-text search indexing.",
      "Ensuring form security and preventing spam using Nodemailer with rate-limiting.",
      "Managing complex state across nested filter components."
    ],
    futurePlans: [
      "Add a one-click apply feature that auto-generates cover letters.",
      "Integrate LinkedIn API for easier profile importing.",
      "Implement real-time notification system for job alerts using Socket.io."
    ],
    featured: false,
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    status: "running",
  },
  {
    id: "lumina",
    title: "Lumina Compliance AI",
    subtitle: "Enterprise Document Intelligence Engine",
    description: "A RAG-based platform designed to deconstruct legal frameworks into actionable risk reports.",
    image: "/upcomming.avif",
    tags: ["Next.js 15", "Golang", "PostgreSQL", "Vector DB", "Redis"],
    demoUrl: "#",
    githubUrl: "",
    features: [
      "Neural Document Parsing: Extracting structured data from legal PDFs",
      "Contextual RAG Engine: High-speed semantic search using Vector embeddings",
      "Risk Score Synthesis: AI-driven compliance gap analysis",
    ],
    challenges: [
      "Architecting a low-latency Go-to-Python bridge for AI inference tasks.",
      "Ensuring 99% accuracy in source-citation from multi-page legal documents.",
      "Handling massive vector embedding updates without system downtime."
    ],
    futurePlans: [
      "Automated legal drafting for mitigation strategy documents.",
      "Multi-language support for international compliance standards.",
      "On-premise deployment options for highly sensitive government data."
    ],
    featured: false,
    gradient: "from-slate-900 via-slate-800 to-slate-900",
    status: "upcoming",
  }
];

// --- Sub-Components ---

function StatusBadge({ status }: { status: string }) {
  const isUpcoming = status === "upcoming";
  const isRunning = status === "running";

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${isUpcoming ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"}`}>
      <span className="relative flex h-2 w-2">
        {isRunning && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${isUpcoming ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
      </span>
      {status}
    </div>
  );
}

// Fullscreen Image Lightbox Component
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-30"
      >
        <X className="w-6 h-6" />
      </motion.button>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image 
          src={src} 
          alt="Fullscreen view" 
          fill 
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

function ProjectDetailsModal({ project, isOpen, onClose, onImageClick }: { project: any, isOpen: boolean, onClose: () => void, onImageClick: (src: string) => void }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl shadow-2xl scrollbar-hide"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-10">
              <X className="w-5 h-5" />
            </button>

            <div className="grid lg:grid-cols-2 gap-0">
              <div 
                className="relative h-[300px] lg:h-full bg-muted cursor-zoom-in group"
                onClick={() => onImageClick(project.image)}
              >
                <Image src={project.image} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <Badge variant="outline" className="mb-3 text-primary border-primary/20">{project.subtitle}</Badge>
                  <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                 <div className="flex flex-wrap gap-2 pt-2">
       <h1>Tech Stack</h1>

                  <div className="flex flex-wrap gap-2 pt-2">
                     {project.tags.map((tag, i) => <span key={i} className="text-[13px] bg-zinc-800 text-white dark:bg-zinc-300 dark:text-zinc-800 p-3 rounded-md font-bold text-muted-foreground uppercase">{tag}</span>)}
                  </div>
                </div>


                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-primary" /> Challenges Faced
                  </h4>
                  <ul className="space-y-2">
                    {project.challenges.map((c: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                    <Rocket className="w-4 h-4 text-primary" /> Future Plans
                  </h4>
                  <ul className="space-y-2">
                    {project.futurePlans.map((p: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary">→</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t">
                  {project.status !== "upcoming" && (
                    <>
                      <Link href={project.demoUrl} target="_blank" className="flex-1">
                        <Button className="w-full gap-2 rounded-xl"> <ExternalLink className="w-4 h-4" /> Live Demo</Button>
                      </Link>
                      <Link href={project.githubUrl} target="_blank">
                        <Button variant="outline" className="gap-2 rounded-xl"> <Github className="w-4 h-4" /> Code</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
       
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- Main Page Component ---

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <div className="mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold section-heading">Featured Projects</h2>
          <p className="text-muted-foreground mt-6 max-w-2xl">Excellence in engineering, performance, and user-centric design.</p>
        </div>

       
{/* Featured Project Row */}
<div className="space-y-8 mb-16">
  {projects.filter(p => p.featured).map((project, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-3xl border border-border bg-card overflow-hidden transition-all duration-500 hover:border-primary/30"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-70`} />
      <div className="grid lg:grid-cols-12 gap-0">
        <div 
          className="lg:col-span-7 relative h-[350px] lg:h-[500px] bg-muted overflow-hidden cursor-zoom-in"
          onClick={() => setFullscreenImage(project.image)}
        >
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
           
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>
        
        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-center space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{project.subtitle}</span>
            <StatusBadge status={project.status} />
          </div>
          <h3 className="text-3xl font-bold">{project.title}</h3>
          <p className="text-muted-foreground italic">"{project.description}"</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => <Badge key={i} variant="secondary" className="bg-muted/50">{tag}</Badge>)}
          </div>
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button onClick={() => setSelectedProject(project)} className="rounded-xl gap-2 shadow-lg shadow-primary/20">
              View Details <ArrowUpRight className="w-4 h-4" />
            </Button>
            {project.status !== "upcoming" && (
              <Link href={project.githubUrl} target="_blank">
                <Button variant="outline" className="rounded-xl gap-2"> <Github className="w-4 h-4" /> Source </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
        {/* Grid Projects */}
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="w-6 h-px bg-primary/50" /> More Projects
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-500"
            >
              <div className="relative h-[200px] bg-muted overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                   <Button onClick={() => setSelectedProject(project)} variant="secondary" className="rounded-full gap-2">
                     View Details <ArrowUpRight className="w-4 h-4" />
                   </Button>
                   <button 
                    onClick={() => setFullscreenImage(project.image)}
                    className="text-white/70 hover:text-white text-xs flex items-center gap-1 transition-colors"
                   >
                     <Maximize2 className="w-3 h-3" /> Full Screen
                   </button>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                   <h3 className="text-xl font-bold">{project.title}</h3>
                   <StatusBadge status={project.status} />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                   {project.tags.slice(0, 3).map((tag, i) => <span key={i} className="text-[10px] font-bold text-muted-foreground uppercase">{tag}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Global Project Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onImageClick={(src) => setFullscreenImage(src)}
      />

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <Lightbox src={fullscreenImage} onClose={() => setFullscreenImage(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}