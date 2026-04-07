"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../components/ui/badge";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  Award,
  MapPin,
} from "lucide-react";

const education = [
  {
    title: "Higher Secondary Certificate (HSC)",
    organization: "Begumgonj Gov.t Pailot Collage", 
    period: "2023 - 2024", 
    location: "Bangladesh",
    highlights: [
      "Group: Science",
      "Strong foundation in Physics, Chemistry & Mathematics",
      "Participated in academic and co-curricular activities",
    ],
    badge: "HSC",
  },
  {
    title: "Computer Science & Engineering",
    organization: "Shrestha Shahid Md. Ruhul Amin Degree College",
    period: "Oct 2025 - Running",
    location: "Noakhali, Bangladesh",
    highlights: [
      "CGPA: Running",
      "Specialized in Software Engineering & Data Structures",
      "Active member of the Computer Science Society",
    ],
    badge: "CGPA: Running",
  },
  
];

const experiences = [
  {
    title: "Frontend Developer Intern",
    organization: "Zas Apparels Pvt Ltd",
    period: "May 2023 - Present",
    location: "Remote",
    highlights: [
      "Building responsive user interfaces with React and TypeScript",
      "Collaborating with design and backend teams for seamless integration",
      "Implementing reusable component libraries following design system standards",
      "Optimizing web performance and improving Core Web Vitals scores",
    ],
    skills: ["React", "TypeScript", "Material UI", "SCSS"],
  },
];

type Tab = "experience" | "education";

export default function Qualifications() {
  const [activeTab, setActiveTab] = useState<Tab>("education");

  const items = activeTab === "education" ? education : experiences;
  const Icon = activeTab === "education" ? GraduationCap : Briefcase;

  return (
    <section id="qualifications" className="py-20">
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
            My Journey
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold section-heading">
            Qualifications
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl">
            A timeline of my professional experience and academic background
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl border border-border bg-muted">
            <button
              onClick={() => setActiveTab("experience")}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "experience"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "experience" && (
                <motion.div
                  layoutId="qualTab"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Briefcase className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Experience</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "education"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "education" && (
                <motion.div
                  layoutId="qualTab"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <GraduationCap className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Education</span>
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Vertical timeline line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

              <div className="space-y-8">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative pl-16 sm:pl-20"
                  >
                    {/* Timeline icon with dot */}
                    <div className="absolute left-0 sm:left-2 top-3 w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center z-10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 card-glow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-primary/80 font-medium mt-0.5">
                            {item.organization}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground sm:shrink-0">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.period}
                          </span>
                          {item.location && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {item.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {"badge" in item && item.badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium mb-3">
                          <Award className="w-3.5 h-3.5" />
                          {item.badge}
                        </div>
                      )}

                      <ul className="space-y-2 mb-4">
                        {item.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="mt-2 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {"skills" in item && item.skills && (
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="rounded-lg text-xs font-medium bg-muted/80 hover:bg-muted transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
