"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, CalendarDays } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Root-relative hashes so the nav also works from sub-routes such as /projects/[id].
const navItems = [
  { name: "Home", href: "/" },
  // { name: "Services", href: "/#services" },
  { name: "Qualifications", href: "/#qualifications" },
  // { name: "About Me", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  // { name: "Achievements ", href: "/#achievements" },
  { name: "Contact", href: "/#contact" },
];

function sectionIdFor(href: string) {
  return href.split("#")[1] || "hero";
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems
        .map((item) => document.getElementById(sectionIdFor(item.href)))
        .filter(Boolean);

      let current = "hero";
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled ? "py-2 px-4" : "py-4 px-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-7xl rounded-2xl transition-all duration-300",
          isScrolled
            ? "glass border border-border shadow-lg shadow-black/5 dark:shadow-black/20 px-6 py-2.5"
            : "bg-transparent px-4 py-3"
        )}
      >
        <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          <Link
            href="/"
            className="group justify-self-start flex items-center gap-0.5 text-2xl font-bold tracking-tight"
          >
            <span className="gradient-text transition-transform group-hover:-rotate-6 inline-block">
              H
            </span>
            <span className="transition-all group-hover:tracking-normal">
              abib
            </span>
            <span className="text-primary">.</span>
          </Link>

          <div className="hidden lg:flex items-center justify-center">
            <div className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const sectionId = sectionIdFor(item.href);
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

          </div>

          <div className="hidden lg:flex items-center justify-self-end gap-3">

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle color theme"
              className="rounded-lg h-8 w-8"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <motion.div
                initial={false}
                animate={{ rotate: resolvedTheme === "dark" ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </motion.div>
            </Button>
            <Button asChild className="gap-2 rounded-xl px-4 shadow-sm">
              <Link href="/book-call">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Book a Call
              </Link>
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-1.5">
            <Button asChild size="sm" className="rounded-xl px-3">
              <Link href="/book-call" onClick={() => setMobileMenuOpen(false)}>Book a Call</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle color theme"
              className="hidden sm:inline-flex rounded-lg h-9 w-9"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg h-9 w-9"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md lg:hidden z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 inset-x-4 lg:hidden z-50"
            >
              <div className="rounded-2xl border border-border bg-card backdrop-blur-xl p-5 shadow-2xl">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center py-3 px-3 text-base font-medium rounded-xl hover:bg-muted/50 hover:text-primary transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
