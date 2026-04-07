"use client";

import { motion } from "framer-motion";
import {
  FaBootstrap,
  FaCss3,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
} from "react-icons/fa";
import { TbBrandGolang } from "react-icons/tb";
import { BiLogoFlask, BiLogoPostgresql } from "react-icons/bi";
import { SiMongodb, SiExpress, SiRedis } from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import { IoLogoFigma, IoLogoVercel } from "react-icons/io5";
import { Code, Database, Cloud, Wrench, Layout } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="w-4 h-4" />,
    skills: [
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
      { name: "React.js", icon: <FaReact className="text-blue-500" /> },
      { name: "Next.js", icon: <RiNextjsFill className="text-foreground" /> },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS3", icon: <FaCss3 className="text-blue-500" /> },
      { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500" /> },
      { name: "Tailwind CSS", icon: <RiTailwindCssFill className="text-cyan-400" /> },
    ],
  },
  {
    title: "Backend",
    icon: <Code className="w-4 h-4" />,
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
      { name: "Express.js", icon: <SiExpress className="text-foreground" /> },
      { name: "Go", icon: <TbBrandGolang className="text-blue-500" /> },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="w-4 h-4" />,
    skills: [
      { name: "PostgreSQL", icon: <BiLogoPostgresql className="text-blue-600" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "Redis", icon: <SiRedis className="text-red-500" /> },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-4 h-4" />,
    skills: [
      { name: "AWS", icon: <FaAws className="text-amber-500" /> },
      { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
    ],
  },
  {
    title: "Tools",
    icon: <Wrench className="w-4 h-4" />,
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
      { name: "GitHub", icon: <FaGithub className="text-foreground" /> },
      { name: "VS Code", icon: <VscVscode className="text-blue-500" /> },
      { name: "Figma", icon: <IoLogoFigma className="text-purple-500" /> },
      { name: "Vercel", icon: <IoLogoVercel className="text-foreground" /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20">
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
            Tech Stack
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold section-heading">
            Skills & Tools
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl">
            Technologies and tools I use to build production-grade applications
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {category.icon}
                </div>
                <h3 className="text-base font-semibold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + idx * 0.03 }}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted border border-border hover:border-primary/20 hover:bg-muted/80 transition-all duration-200 group/skill"
                  >
                    <span className="text-lg group-hover/skill:scale-110 transition-transform">
                      {skill.icon}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground group-hover/skill:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
