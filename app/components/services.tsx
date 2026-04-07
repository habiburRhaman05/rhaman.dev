"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Server,
  Palette,
  Cloud,
  Smartphone,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Web Development",
    description:
      "Full-stack web applications built with Next.js, React, and Node.js. From landing pages to complex SaaS platforms.",
    highlights: ["Next.js & React", "SSR & SSG", "SEO Optimized"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "API & Backend",
    description:
      "Scalable RESTful and GraphQL APIs with Node.js, Express, and Go. Database design with PostgreSQL and MongoDB.",
    highlights: ["REST & GraphQL", "Microservices", "Database Design"],
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500",
  },

  
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud & DevOps",
    description:
      "Cloud deployment and CI/CD pipelines. Docker containerization and AWS infrastructure management.",
    highlights: ["AWS & Vercel", "Docker", "CI/CD Pipelines"],
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile-First Apps",
    description:
      "Progressive web apps and responsive applications optimized for mobile-first experiences and performance.",
    highlights: ["PWA", "Mobile Optimized", "Cross-Platform"],
    gradient: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-500",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Performance & Security",
    description:
      "Web performance optimization, security best practices, and accessibility compliance for production applications.",
    highlights: ["Core Web Vitals", "Security Audits", "A11y"],
    gradient: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20">
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
            What I Offer
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold section-heading">
            Services
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl">
            Comprehensive development services to bring your ideas to life with
            clean code and modern technologies
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 card-glow"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center ${service.iconColor}`}
                  >
                    {service.icon}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-muted text-muted-foreground font-medium border border-border"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
