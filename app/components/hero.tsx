"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "../components/ui/button";
import { Github, Linkedin, Download, Mail, ArrowDown, Sparkles, Contact2, Rocket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const ROLES = [
  "Full-Stack Developer",
  "MERN Stack Expert",
  "Frontend Developer",
];

function TypingText({ words }: { words: string[] }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(word.substring(0, currentText.length + 1));
          if (currentText.length === word.length) {
            pauseTimer = setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(word.substring(0, currentText.length - 1));
          if (currentText.length === 0) {
            setIsDeleting(false);
            setCurrentWord((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => {
      clearTimeout(timeout);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [currentText, isDeleting, currentWord, words]);

  return (
    <span className="gradient-text">
      {currentText}
      <span className="border-r-2 border-primary animate-typing-cursor ml-0.5">
        &nbsp;
      </span>
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 30 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const bgX = useTransform(dx, [-300, 300], [15, -15]);
  const bgY = useTransform(dy, [-300, 300], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-400/5 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto sm:mt-0  mt-10 px-6 sm:px-8 w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-green-600/50 text-white text-sm font-medium"
              >
                <Rocket className="w-3.5 h-3.5" />
                    
                Available for Opportunities
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
              >
                Hi, I&apos;m{" "}
                <span className="gradient-text">Habibur Rahman</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-muted-foreground h-10"
              >
                <TypingText words={ROLES} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                I build{" "}
                <span className="text-foreground font-medium">
                  scalable, high-performance
                </span>{" "}
                web applications with modern technologies. Specializing in the MERN stack,
                Next.js, and cloud infrastructure to deliver production-grade solutions.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/habib-resume.pdf" target="_blank" download>
                <Button
                  size="lg"
                  className="rounded-xl px-6 gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </Button>
              </Link>
              <Link href="#contact" >
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-5 gap-2 hover:bg-muted"
                >
                  <Contact2 className="w-4 h-4" />
                  Reach Me
                </Button>
              </Link>

              <Link href="https://github.com/habiburRhaman05" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl h-11 w-11 hover:bg-muted"
                >
                  <Github className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-8 pt-6 border-t border-border"
            >
              <div>
                <p className="text-2xl font-bold">4+</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">
                  Projects
                </p>
              </div>
             
              <div>
                <p className="text-2xl font-bold">3+</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">
                  Years Exp
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image - Modern Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-2 relative  lg:flex items-center justify-center"
          >
            <div className="relative ">
              {/* <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/30 blur-2xl animate-pulse-glow" /> */}

              <div className="absolute hidden sm:flex -inset-1 rounded-3xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 opacity-20 animate-accordion-up" style={{ animationDuration: '8s' }} />

              <div className="relative mx-auto sm:w-[400px] w-[70%] sm:h-[500px] h-[300px] rounded-3xl overflow-hidden border-2 border-border/30 shadow-2xl shadow-primary/10">
                {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 z-10 pointer-events-none" /> */}
                <Image
                  src="https://res.cloudinary.com/drngnsgwy/image/upload/v1775490683/Gemini_Generated_Image__jzxcpb.png"
                  alt="Habibur Rahman"
                  fill
                  className="object-cover"
                  priority
                />
              </div>


            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link href="#qualifications">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 border border-border"
              >
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
