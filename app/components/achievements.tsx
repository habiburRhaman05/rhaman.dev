"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  GitBranch,
  Star,
  BookOpen,
  Award,
  Code2,
  Users,
  Rocket,
  Cpu,
} from "lucide-react";
import Link from "next/link";

const achievements = [
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "4+ Projects Completed",
    description: "Successfully delivered 20+ web applications ranging from landing pages to full-stack SaaS platforms.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "DSA Problem Solver",
    description: "Solved 20+ problems on LeetCode and other competitive programming platforms.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "Production Deployments",
    description: "Deployed multiple production applications on Vercel and AWS with zero-downtime strategies.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
  icon: <Cpu className="w-5 h-5" />, // Use Cpu or Server from lucide-react
  title: "Backend Architect",
  description: "Migrated legacy services to high-performance Golang backends with 40% faster execution speeds.",
  color: "text-emerald-500",
  bg: "bg-emerald-500/10",
},
];

const contributions = [
  {
    icon: <GitBranch className="w-4 h-4" />,
    label: "Open Source PRs",
    value: "10+",
  },
  {
    icon: <Star className="w-4 h-4" />,
    label: "GitHub Stars",
    value: "50+",
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    label: "Tech Articles",
    value: "5+",
  },
  {
    icon: <Users className="w-4 h-4" />,
    label: "Community",
    value: "Active",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20">
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
            Milestones
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold section-heading">
            Achievements & Contributions
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl">
            Key milestones and community contributions that mark my journey
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Achievements Grid */}
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 card-glow"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contributions Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6 h-fit"
          >
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-primary" />
              Contributions
            </h3>

            <div className="space-y-5">
              {contributions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-bold">{item.value}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-border">
              <Link
                href="https://github.com/habiburRhaman05"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                View GitHub Profile
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
