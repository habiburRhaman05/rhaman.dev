"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Laptop,
  Sparkles,
  LayoutGrid,
  Rocket,
  Github,
  Linkedin,
  Mail,
  Coffee,
  Brain,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AboutMe() {
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MERN Stack",
    "DSA",
    "System Thinking",
    "Clean Architecture",
  ];

  const milestones = [
    {
      title: "Curiosity turned into obsession",
      description:
        "From a young age, I was deeply curious about smartphones, apps, and how digital products actually work behind the scenes.",
    },
    {
      title: "First hands-on creation",
      description:
        "I started building simple apps using drag-and-drop tools, but quickly realized I needed more control to create real, scalable features.",
    },
    {
      title: "Shift into real programming",
      description:
        "That limitation pushed me into coding. I began with JavaScript and gradually moved into React, Node.js, and backend fundamentals.",
    },
    {
      title: "Real-world learning mindset",
      description:
        "Over the years, I focused on building practical projects, solving real problems, and developing a strong foundation in clean, maintainable code.",
    },
  ];

  const hobbies = [
    {
      icon: Coffee,
      title: "Deep Focus Sessions",
      text: "I enjoy working in quiet environments where I can think deeply and build without distractions.",
    },
    {
      icon: Brain,
      title: "Learning & Self Growth",
      text: "I spend time improving my mindset, problem-solving skills, and understanding complex systems.",
    },
    {
      icon: Target,
      title: "Goal-Oriented Lifestyle",
      text: "I like setting clear goals and working consistently toward long-term growth in both life and career.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative w-full overflow-hidden py-16 px-4 sm:px-6 md:px-8 lg:px-10"
      id="about"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-primary uppercase tracking-wider mb-2"
          >
            About Me
          </motion.p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold section-heading">
            Hi, I’m Habibur Rahman
          </h2>

          <p className="text-muted-foreground mt-4 sm:mt-6 max-w-2xl leading-relaxed mx-auto lg:mx-0">
            I am a Full Stack Developer focused on building production-ready
            applications with clean architecture, strong fundamentals, and
            modern user experience. My journey is built on curiosity,
            consistency, and a deep desire to create meaningful digital
            products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* Journey */}
          <div className="lg:col-span-7 rounded-3xl border border-border/60 bg-card p-4 sm:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                <Code2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                  My Coding Journey
                </h3>
                <p className="text-sm text-muted-foreground">
                  From curiosity to building real-world systems
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {milestones.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4  sm:flex-row flex-col rounded-2xl border border-border/50 bg-muted/20 p-2 sm:p-4 transition-all hover:border-indigo-500/30 hover:bg-muted/30"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-semibold text-indigo-600">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Focus */}
            <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Focus</p>
                  <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-foreground">
                    Full Stack Development
                  </h3>
                </div>
                <div className="rounded-2xl bg-cyan-500/10 p-2 sm:p-3 text-cyan-600">
                  <Laptop className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                I focus on building end-to-end applications using modern
                technologies. My goal is to create scalable, high-performance,
                and user-friendly products that are ready for real-world usage.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border/50 bg-background p-4 text-center sm:text-left">
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="text-lg font-semibold">3–4 Years</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background p-4 text-center sm:text-left">
                  <p className="text-xs text-muted-foreground">Focus</p>
                  <p className="text-lg font-semibold">Production Ready Apps</p>
                </div>
              </div>
            </div>

            {/* Stack */}
            <div className="rounded-3xl border border-border/60 bg-card p-4 sm:p-6 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Core Stack
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border/60 bg-muted/30 px-2 sm:px-3 py-1 text-xs sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Hobbies */}
           
          </div>
        </div>
 <div className="rounded-3xl mt-5 border border-border/60 bg-card p-4 sm:p-6 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Hobbies & Interests
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {hobbies.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3"
                    >
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-foreground">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
        {/* CTA */}
        <div className="mt-10 relative overflow-hidden rounded-3xl border border-border/60 p-6 sm:p-8 md:p-10 backdrop-blur-xl bg-card">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">

            <div className="max-w-xl text-center lg:text-left">
              <span className="text-xs px-3 py-1 bg-green-600/50 w-full sm:w-[220px] flex items-center justify-center lg:justify-start rounded-full border mb-3 sm:mb-4">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Open to Opportunities
              </span>

              <h3 className="text-xl sm:text-2xl font-semibold">
                Let’s build something impactful together.
              </h3>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
                I’m actively looking for opportunities to contribute, learn, and
                build real-world scalable applications.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
             <Button asChild variant={"ghost"}>
                 <Link href={"https://github.com/habiburRhaman05"} className="px-4 sm:px-5 py-2 rounded-xl border flex items-center gap-2">
                <Github /> GitHub
              </Link>
             </Button>
           <Button asChild variant={"secondary"}>
               <Link href={'#contact'} className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white flex items-center gap-2">
                <Mail /> Contact
              </Link>
           </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}