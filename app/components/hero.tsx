
"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "../components/ui/button";
import { Github, Linkedin, Download, Mail, MapPin } from "lucide-react";
import { FaAws, FaNodeJs } from "react-icons/fa";
import { RiNextjsFill, RiReactjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiDocker, SiExpress, SiMongodb, SiPostgresql } from "react-icons/si";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // gentle parallax
  const rotateX = useSpring(useTransform(y, [-50, 50, 0], [10, -10, 0]), {
    stiffness: 50,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-50, 50, 0], [-10, 10, 0]), {
    stiffness: 50,
    damping: 15,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      x.set(offsetX / 10);
      y.set(offsetY / 10);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden ">
 
      <div className="relative z-10 grid md:grid-cols-3 gap-14 items-center max-w-6xl mx-auto px-6 md:px-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 md:col-span-2"
        >
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Habibur Rahman
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium">
              🚀 Full Stack Software Engineer | Frontend Expert
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-sky-500" />
              <a
                href="mailto:devhabib2005@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                devhabib2005@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky-500" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
            I’m <b>Habibur Rahman</b>, a passionate <b>Full Stack Developer</b>{" "}
            who crafts visually stunning, fast, and scalable applications. I
            combine{" "}
            <span className="text-sky-500 font-medium">frontend finesse</span>{" "}
            with{" "}
            <span className="text-purple-500 font-medium">backend power</span> —
            using <b>Next.js, React, TypeScript, Node.js</b>, and{" "}
            <b>AWS Cloud</b> — to build smooth, secure, and future-ready digital
            experiences.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Link href="" target="_blank" download>
              <Button
                size="sm"
                className="bg-gradient-to-r from-sky-500 to-purple-500 hover:from-purple-600 hover:to-sky-500 text-white font-semibold shadow-lg shadow-sky-400/30 transition-transform hover:scale-105"
              >
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </Link>

            <Link href="https://github.com/habiburRhaman05" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-sky-50 dark:hover:bg-sky-950 transition-colors"
              >
                <Github className="h-4 w-4 text-sky-600" />
              </Button>
            </Link>

            <Link href="https://www.linkedin.com/in/habiburRhaman05/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-sky-50 dark:hover:bg-sky-950 transition-colors"
              >
                <Linkedin className="h-4 w-4 text-sky-600" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side Tech Grid */}
        <motion.div
          ref={containerRef}
          style={{ rotateX, rotateY }}
          className="flex justify-center h-80 md:h-auto perspective-1000"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square"
          >
            {/* Glowing animated border */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-sky-400/30 shadow-lg shadow-sky-500/20"
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 3, -3, 0],
                boxShadow: [
                  "0 0 20px rgba(56,189,248,0.3)",
                  "0 0 40px rgba(147,51,234,0.3)",
                  "0 0 20px rgba(56,189,248,0.3)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Tech Icons Grid */}
            <div className="absolute inset-0 grid grid-cols-2 gap-6 p-4">
              <TechCard
                icon={<RiNextjsFill />}
                color="text-black dark:text-white"
                glow="sky"
              />
              <TechCard
                icon={<SiExpress />}
                color="text-green-600"
                glow="green"
              />
              <TechCard
                icon={<SiPostgresql />}
                color="text-emerald-600"
                glow="emerald"
              />
              <TechCard
                icon={<SiDocker />}
                color="text-yellow-500"
                glow="yellow"
              />
            </div>

            {/* Floating Tech Badges */}
            <FloatingBadge label="Next.js" pos="top-left" delay={0} />
            <FloatingBadge label="Docker" pos="bottom-right" delay={1} />
            <FloatingBadge label="Express.js" pos="top-right" delay={0.5} />
            <FloatingBadge label="PostgresQL" pos="bottom-left" delay={1.2} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground text-xs sm:text-sm"
      >
        ↓ Scroll to explore more
      </motion.div>
    </section>
  );
}

/* ============ Sub Components ============ */
function TechCard({
  icon,
  color,
  glow,
}: {
  icon: React.ReactNode;
  color?: string;
  glow?: "sky" | "green" | "emerald" | "yellow";
}) {
  const glowMap = {
    sky: "shadow-sky-400/30",
    green: "shadow-green-400/30",
    emerald: "shadow-emerald-400/30",
    yellow: "shadow-yellow-400/30",
  };
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      transition={{ type: "spring", stiffness: 300, damping: 12 }}
      className={`bg-muted/50 backdrop-blur-md border border-border/40 rounded-2xl flex items-center justify-center text-5xl shadow-inner hover:${
        glowMap[glow!]
      } hover:shadow-2xl transition-all ${color}`}
    >
      {icon}
    </motion.div>
  );
}

function FloatingBadge({
  label,
  pos,
  delay,
}: {
  label: string;
  pos: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  delay: number;
}) {
  const position = {
    "top-left": "absolute -top-5 -left-5",
    "top-right": "absolute -top-5 -right-5",
    "bottom-left": "absolute -bottom-5 -left-5",
    "bottom-right": "absolute -bottom-5 -right-5",
  }[pos];
  return (
    <motion.div
      className={`${position} bg-background/70 backdrop-blur-lg border border-border rounded-full px-3 py-1 text-xs sm:text-sm font-medium shadow-md`}
      animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {label}
    </motion.div>
  );
}
