"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Target,
  Users,
  Lightbulb,
  Clock,
  Code2,
  Layers,
  TrendingUp,
} from "lucide-react";

const strengths = [
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Clean Code",
    description: "Writing maintainable, well-documented, and testable code following industry best practices.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Performance",
    description: "Obsessed with web performance — optimizing load times, Core Web Vitals, and runtime efficiency.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Problem Solving",
    description: "Strong analytical mindset with experience in DSA, system design, and debugging complex issues.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "System Design",
    description: "Designing scalable architectures, microservices, and database schemas for production systems.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Team Collaboration",
    description: "Effective communicator and team player, experienced with Agile workflows and code reviews.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Quick Learner",
    description: "Rapidly adopting new technologies and frameworks, always staying current with industry trends.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Deadline Driven",
    description: "Delivering projects on time with consistent quality, effective prioritization and planning skills.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Growth Mindset",
    description: "Continuously improving through open-source contributions, courses, and hands-on projects.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export default function Strengths() {
  return (
    <section id="strengths" className="py-20">
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
            Core Competencies
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold section-heading">
            Strengths
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl">
            Key qualities and competencies that I bring to every project
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div
                className={`w-10 h-10 rounded-xl ${strength.bg} flex items-center justify-center ${strength.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {strength.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{strength.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
