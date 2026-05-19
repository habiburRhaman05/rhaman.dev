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
    title: "Secondary School Certificate (SSC)",
    organization: "Mir Kashem Bhumuki High School",
    period: "2021 - 2022",
    location: "Bangladesh",
    highlights: [
      "Group: Science",
      "Strong foundation in Physics, Chemistry & Mathematics",
      "Participated in academic and co-curricular activities",
    ],
    badge: "SSC",
  },

];

const courses = [
  {
    title: "Full-Stack Web Development",
    organization: "Programming Hero",
    period: "October 2025 – April 2026",
    location: "Online",
    highlights: [
      "Mastered React.js, Next.js, Node.js, and PostgreSQL from scratch",
      "Built real-world full-stack projects with REST APIs and authentication",
      "Learned MongoDB, Express.js, JWT, and deployment best practices",
    ],
    certificate: "https://web.programming-hero.com/",
    badge: "Full-Stack",
  },
];



type Tab =   "education" | "cretificates"

export default function Qualifications() {
  const [activeTab, setActiveTab] = useState<Tab>("education");

  const items = activeTab === "education" ? education :  courses 
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
            <button
              onClick={() => setActiveTab("cretificates")}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "cretificates"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "cretificates" && (
                <motion.div
                  layoutId="qualTab"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <GraduationCap className="w-4 h-4 relative z-10" />
              <span className="relative z-10"> Courses & Cretificates</span>
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
