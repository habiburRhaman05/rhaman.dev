// "use client";

// import { motion } from "framer-motion";
// import { Button } from "../components/ui/button";
// import { Github, Linkedin, Download, Mail, MapPin } from "lucide-react";
// import { FaAws, FaNode, FaNodeJs } from "react-icons/fa";
// import {
//   RiNextjsFill,
//   RiReactjsFill,
//   RiTailwindCssFill,
//   RiTwitterXLine,
// } from "react-icons/ri";
// import { SiMongodb } from "react-icons/si";
// import Link from "next/link";

// export default function Hero() {
//   return (
//     <section className="py-6 md:py-10">
//       <div className="grid md:grid-cols-3 gap-10 items-center max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="space-y-6 md:col-span-2"
//         >
//           <div className="space-y-2">
//             <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
//               Habibur Rhaman
//             </h1>
//             <p className="text-lg sm:text-xl text-muted-foreground">
//               Full Stack Software Engineer | FrontEnd Specialist
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
//             <div className="flex items-center gap-1">
//               <Mail className="h-4 w-4" />
//               <a href="mailto:haquedot@gmail.com">devhabib2005@gmail.com</a>
//             </div>
//             <div className="flex items-center gap-1">
//               <MapPin className="h-4 w-4" />
//               <span>Dhaka, BanglaDesh</span>
//             </div>
//           </div>

//           <p className="text-muted-foreground text-sm sm:text-base capitalize">
//             I’m <b>Habibur Rahman</b>, a <b>Full Stack Software Developer</b>{" "}
//             <br /> Who builds scalable, high-performance, and visually stunning
//             applications. With expertise in frontend, backend, cloud, and
//             DevOps, I deliver end-to-end solutions that are fast, secure, and
//             future-ready. I work with Next.js, React, TypeScript, and
//             TailwindCSS on the front, and Node.js, Go, and PostgreSQL
//           </p>

//           <div className="flex flex-wrap gap-2 sm:gap-3">
//             <Link href="/MerajResumeFR.pdf" target="_blank" download>
//               <Button size="sm" className="text-xs sm:text-sm">
//                 <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Resume
//               </Button>
//             </Link>
//             <Link href="https://github.com/haquedot" target="_blank">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="text-xs sm:text-sm"
//               >
//                 <Github className="h-3 w-3 sm:h-4 sm:w-4" />
//               </Button>
//             </Link>

//             <Link href="https://www.linkedin.com/in/haquedot/" target="_blank">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="text-xs sm:text-sm"
//               >
//                 <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
//               </Button>
//             </Link>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="flex justify-center h-48 md:h-auto"
//         >
//           <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square">
//             {/* Animated border */}
//             <motion.div
//               className="absolute inset-0 rounded-lg"
//               animate={{
//                 rotate: [0, 5, -5, 0],
//                 scale: [1, 1.02, 1.02, 1],
//               }}
//               transition={{
//                 duration: 8,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />

//             {/* Grid with floating tech stacks */}
//             <div className="absolute inset-0 grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4">
//               {/* Top Left - React Logo */}
//               <motion.div
//                 className="bg-muted rounded-lg p-2 sm:p-4 flex items-center justify-center"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 10 }}
//               >
//                 <motion.div
//                   transition={{
//                     duration: 10,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                   className="text-4xl text-[#087ea4]"
//                 >
//                   <RiNextjsFill />
//                 </motion.div>
//               </motion.div>

//               {/* Top Right - Node.js */}
//               <motion.div
//                 className="bg-muted rounded-lg p-2 sm:p-4 flex items-center justify-center"
//                 initial={{ y: -20 }}
//                 animate={{ y: 0 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                   ease: "easeInOut",
//                 }}
//               >
//                 <div className="text-4xl">
//                   {" "}
//                   <FaNodeJs />
//                 </div>
//               </motion.div>

//               {/* Bottom Left - Database */}
//               <motion.div
//                 className="bg-muted rounded-lg p-2 sm:p-4 flex items-center justify-center"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <motion.div
//                   animate={{ y: [0, -5, 0] }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                   className="text-4xl text-green-600"
//                 >
//                   <SiMongodb />
//                 </motion.div>
//               </motion.div>

//               {/* Bottom Right - TypeScript */}
//               <motion.div
//                 className="bg-muted rounded-lg p-2 sm:p-4 flex items-center justify-center"
//                 animate={{
//                   boxShadow: [
//                     "0 0 0 0px rgba(49, 130, 206, 0.1)",
//                     "0 0 0 10px rgba(49, 130, 206, 0.1)",
//                     "0 0 0 0px rgba(49, 130, 206, 0.1)",
//                   ],
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Infinity,
//                 }}
//               >
//                 <div className="text-4xl text-sky-500">
//                   <FaAws />
//                 </div>
//               </motion.div>
//             </div>

//             {/* Floating tech badges around the grid */}
//             <motion.div
//               className="absolute -top-3 sm:-top-5 -left-3 sm:-left-5 bg-background px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm shadow-md border"
//               animate={{
//                 y: [0, -5, 0],
//                 rotate: [0, 5, -5, 0],
//               }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               ReactJs
//             </motion.div>

//             <motion.div
//               className="absolute -bottom-3 sm:-bottom-5 -right-3 sm:-right-5 bg-background px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm shadow-md border"
//               animate={{
//                 y: [0, 5, 0],
//                 rotate: [0, -5, 5, 0],
//               }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: 1,
//               }}
//             >
//               Tailwind CSS
//             </motion.div>

//             <motion.div
//               className="absolute -top-3 sm:-top-5 -right-3 sm:-right-5 bg-background px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm shadow-md border"
//               animate={{
//                 x: [0, 5, 0],
//                 rotate: [0, 5, -5, 0],
//               }}
//               transition={{
//                 duration: 5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: 0.5,
//               }}
//             >
//               Next.js
//             </motion.div>

//             <motion.div
//               className="absolute -bottom-3 sm:-bottom-5 -left-3 sm:-left-5 bg-background px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm shadow-md border"
//               animate={{
//                 x: [0, -5, 0],
//                 rotate: [0, -5, 5, 0],
//               }}
//               transition={{
//                 duration: 5,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: 1.5,
//               }}
//             >
//               MongoDB
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// 2nd version
// "use client";

// import { motion } from "framer-motion";
// import { Button } from "../components/ui/button";
// import { Github, Linkedin, Download, Mail, MapPin } from "lucide-react";
// import { FaAws, FaNodeJs } from "react-icons/fa";
// import { RiNextjsFill, RiReactjsFill, RiTailwindCssFill } from "react-icons/ri";
// import { SiMongodb } from "react-icons/si";
// import Link from "next/link";

// export default function Hero() {
//   return (
//     <section className="relative py-10 md:py-20 overflow-hidden">
//       {/* Soft gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-400/20 via-purple-400/10 to-transparent rounded-full blur-3xl opacity-40 animate-pulse" />

//       <div className="relative z-10 grid md:grid-cols-3 gap-10 items-center max-w-6xl mx-auto px-4 sm:px-6">
//         {/* ===== Left Content ===== */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="space-y-6 md:col-span-2"
//         >
//           <div className="space-y-3">
//             <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
//               Habibur Rahman
//             </h1>
//             <p className="text-lg sm:text-xl text-muted-foreground font-medium">
//               Full Stack Software Engineer • Frontend Specialist
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
//             <div className="flex items-center gap-1">
//               <Mail className="h-4 w-4 text-sky-500" />
//               <a
//                 href="mailto:devhabib2005@gmail.com"
//                 className="hover:text-foreground transition-colors"
//               >
//                 devhabib2005@gmail.com
//               </a>
//             </div>
//             <div className="flex items-center gap-1">
//               <MapPin className="h-4 w-4 text-sky-500" />
//               <span>Dhaka, Bangladesh</span>
//             </div>
//           </div>

//           <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
//             I’m <b>Habibur Rahman</b>, a passionate{" "}
//             <b>Full Stack Software Developer</b> crafting fast, secure, and
//             scalable web applications. With expertise in{" "}
//             <b>Next.js, React, TypeScript, Node.js</b>, and modern cloud
//             platforms like <b>AWS</b>, I build products that are
//             <span className="text-sky-500 font-medium">
//               {" "}
//               performant, reliable, and delightful
//             </span>{" "}
//             to use.
//           </p>

//           <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
//             <Link href="/MerajResumeFR.pdf" target="_blank" download>
//               <Button
//                 size="sm"
//                 className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white shadow-md"
//               >
//                 <Download className="mr-2 h-4 w-4" /> Download Resume
//               </Button>
//             </Link>

//             <Link href="https://github.com/haquedot" target="_blank">
//               <Button variant="outline" size="sm" className="hover:bg-sky-50">
//                 <Github className="h-4 w-4 text-sky-600" />
//               </Button>
//             </Link>

//             <Link href="https://www.linkedin.com/in/haquedot/" target="_blank">
//               <Button variant="outline" size="sm" className="hover:bg-sky-50">
//                 <Linkedin className="h-4 w-4 text-sky-600" />
//               </Button>
//             </Link>
//           </div>
//         </motion.div>

//         {/* ===== Right Side Animation / Tech Grid ===== */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//           className="flex justify-center h-64 md:h-auto"
//         >
//           <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square">
//             {/* Animated Glow Border */}
//             <motion.div
//               className="absolute inset-0 rounded-3xl border border-sky-200 shadow-xl shadow-sky-200/30"
//               animate={{
//                 scale: [1, 1.03, 1],
//                 rotate: [0, 4, -4, 0],
//               }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />

//             {/* Grid with Tech Icons */}
//             <div className="absolute inset-0 grid grid-cols-2 gap-3 sm:gap-5 p-4">
//               <TechCard
//                 icon={<RiNextjsFill />}
//                 color="text-black dark:text-white"
//               />
//               <TechCard icon={<FaNodeJs />} color="text-green-600" />
//               <TechCard icon={<SiMongodb />} color="text-emerald-600" />
//               <TechCard icon={<FaAws />} color="text-yellow-500" />
//             </div>

//             {/* Floating Labels */}
//             <FloatingBadge label="React.js" position="top-left" delay={0} />
//             <FloatingBadge
//               label="TailwindCSS"
//               position="bottom-right"
//               delay={1}
//             />
//             <FloatingBadge label="Next.js" position="top-right" delay={0.5} />
//             <FloatingBadge label="MongoDB" position="bottom-left" delay={1.2} />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ===== Sub Components ===== */

// function TechCard({ icon, color }: { icon: React.ReactNode; color?: string }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.07 }}
//       transition={{ type: "spring", stiffness: 300, damping: 12 }}
//       className={`bg-muted/60 backdrop-blur-sm border border-border rounded-2xl flex items-center justify-center text-5xl shadow-inner hover:shadow-lg transition-all ${color}`}
//     >
//       {icon}
//     </motion.div>
//   );
// }

// function FloatingBadge({
//   label,
//   position,
//   delay,
// }: {
//   label: string;
//   position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
//   delay: number;
// }) {
//   const pos = {
//     "top-left": "absolute -top-4 -left-4",
//     "top-right": "absolute -top-4 -right-4",
//     "bottom-left": "absolute -bottom-4 -left-4",
//     "bottom-right": "absolute -bottom-4 -right-4",
//   }[position];

//   return (
//     <motion.div
//       className={`${pos} bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs sm:text-sm shadow-md border border-border font-medium`}
//       animate={{
//         y: [0, -5, 0],
//         rotate: [0, 5, -5, 0],
//       }}
//       transition={{
//         duration: 5,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay,
//       }}
//     >
//       {label}
//     </motion.div>
//   );
// }

// 3rd version
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
      {/* soft glowing background */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-sky-500/30 via-violet-500/20 to-purple-400/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2 animate-pulse" />
      </div> */}

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
            <Link href="/MerajResumeFR.pdf" target="_blank" download>
              <Button
                size="sm"
                className="bg-gradient-to-r from-sky-500 to-purple-500 hover:from-purple-600 hover:to-sky-500 text-white font-semibold shadow-lg shadow-sky-400/30 transition-transform hover:scale-105"
              >
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </Link>

            <Link href="https://github.com/haquedot" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-sky-50 dark:hover:bg-sky-950 transition-colors"
              >
                <Github className="h-4 w-4 text-sky-600" />
              </Button>
            </Link>

            <Link href="https://www.linkedin.com/in/haquedot/" target="_blank">
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
