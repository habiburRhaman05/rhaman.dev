"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, Calendar, ExternalLink, GraduationCap, MapPin } from "lucide-react";

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

const experience = [
  {
    title: "Junior Software Engineer",
    organization: "Octopi Digital Limited",
    period: "July 2026 – Present",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Developing full-stack applications using React, Next.js, Node.js, TypeScript, FastAPI, Prisma, and PostgreSQL",
      "Building RESTful APIs, authentication and authorization systems, admin dashboards, workflow automation, and data-driven business applications",
      "Working as a Junior Software Engineer in the Marketing and Automation team, contributing to scalable web and automation products",
      "Developing cross-platform mobile applications with React Native and Expo, including authentication, protected routes, role-based access control, and API integration",
      "Designing and integrating backend services with FastAPI and Node.js, including database operations, validation, API architecture, and third-party service integrations",
      "Working with PostgreSQL, Prisma ORM, Redis, Docker, AWS, and CI/CD pipelines to build and deploy reliable production applications",
      "Implementing third-party integrations, webhooks, tracking systems, SEO infrastructure, analytics, and automation workflows across multiple platforms",
      "Developing reusable frontend components, responsive interfaces, state management solutions, and scalable application architecture",
      "Debugging production issues, optimizing application performance, improving code quality, and collaborating with the team to deliver production-ready features",
    ],
    badge: "Current Role",
  },
];

const courses = [
  {
    title: "AI-Driven Software Engineering Bootcamp",
    organization: "Programming Hero",
    period: "October 2025 – April 2026",
    location: "Online",
    highlights: [
      "Mastered TypeScript, Go (Golang), advanced Next.js App Router, Node.js, and PostgreSQL using Prisma ORM",
      "Studied Software Architecture and System Design fundamentals, focusing on clean architecture, database indexing, and SaaS application design",
      "Integrated AI capabilities including RAG architectures, Vector Databases, and LangChain AI agents",
      "Gained hands-on experience with Docker orchestration, AWS cloud environments, and CI/CD pipelines",
    ],
    certificate: "https://web.programming-hero.com/",
    badge: "Software Engineering",
    view: "https://drive.google.com/file/d/1P51hUDKBAtLPJ9dF9NuBXd9a18YXqId_/view?usp=sharing",
  },
];

type Tab = "experience" | "certificates" | "education"  ;

export default function Qualifications() {
  const [activeTab, setActiveTab] = useState<Tab>("experience");

  const items =
    activeTab === "education"
      ? education
      : activeTab === "experience"
      ? experience
      : courses;

  const Icon =
    activeTab === "education"
      ? GraduationCap
      : activeTab === "experience"
      ? Briefcase
      : Award;

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
            {/* Education */}
        

            {/* Experience */}
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
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <Briefcase className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Experience</span>
            </button>

            {/* Certificates */}
            <button
              onClick={() => setActiveTab("certificates")}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === "certificates"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "certificates" && (
                <motion.div
                  layoutId="qualTab"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <Award className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Courses & Certificates</span>
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
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
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
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                    }}
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

                      {/* Badge */}
                      {"badge" in item && item.badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium mb-3">
                          <Award className="w-3.5 h-3.5" />
                          {item.badge}
                        </div>
                      )}

                      {/* Highlights */}
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

                      {/* Certificate View Button */}
                      {"view" in item && item.view && (
                        <a
                          href={item.view}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Certificate
                        </a>
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