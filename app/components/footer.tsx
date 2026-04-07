"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";

const quickLinks = [
  { name: "About", href: "#" },
  { name: "Services", href: "#services" },
  { name: "Qualifications", href: "#qualifications" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  {
    icon: <Github className="w-4 h-4" />,
    href: "https://github.com/habiburRhaman05",
    label: "GitHub",
  },
  {
    icon: <Linkedin className="w-4 h-4" />,
    href: "https://linkedin.com/in/cdxhabib",
    label: "LinkedIn",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    href: "mailto:devhabib2005@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="relative sm:mt-20">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="space-y-3">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight inline-block"
            >
              <span className="gradient-text">Habib</span>
              <span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-Stack Developer building scalable web applications
              with modern technologies.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <div className="flex gap-2">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl h-9 w-9 border-border hover:bg-muted hover:border-primary/20 transition-all"
                  >
                    {social.icon}
                  </Button>
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              devhabib2005@gmail.com
            </p>
          </div>
        </motion.div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Habibur Rhaman. Built with
            <Heart className="w-3 h-3 text-red-400 inline" />
           
          </p>
        </div>
      </div>
    </footer>
  );
}
