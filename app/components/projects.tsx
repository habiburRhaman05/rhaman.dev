"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { useState } from "react";

const projects = [

  {
    logo: "/humanitycarefoundationLogo.svg",
    title: "Opportune Hub , A Full stack Job Portal App",
    description:
      "A modern website for a charitable organization, highlighting their mission, donation options, and community impact with a smooth UI/UX experience.",
    image: "/opportune-hub.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Figma", "Nodemailer"],
    demoUrl: "https://opportune-hub.vercel.app/",
    githubUrl: "https://github.com",

    features: [
      "Animated homepage using Framer Motion for engaging transitions",
      "Clean and responsive design built with Tailwind CSS",
      "Contact form with Nodemailer for email handling",
      "Sections like About, Mission, Services, Gallery, and Contact",
      "Designed in Figma and implemented using Next.js for fast performance",
    ],
  },
  {
    logo: "/exceedroboticsLogo.png",
    title: "Exceed Robotics",
    description:
      "Program enrollment camps and blog pages for Exceed Robotics, focusing on intuitive user experience.",
    image: "/exceedrobotics.webp",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery"],
    demoUrl: "https://exceedrobotics.com/",
    githubUrl: "https://github.com",

    features: [
      "Responsive program enrollment pages",
      "Interactive blog section",
      "Optimized for speed and accessibility",
      "Cross-browser compatible design",
      "Collaborative development with team members",
    ],
  },
];

const projectsCategories = ["all"];

export default function Projects() {
  const [selectedCategory, setSelectCategory] = useState("all");
  const [selectBoxOpen, setSelectBoxOpen] = useState(false);
  return (
    <section id="projects" className="py-10">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold mb-10">Projects</h2>

          <Select
            onValueChange={(value) => {
              setSelectCategory(value);
            }}
            onOpenChange={() => {
              setSelectBoxOpen(!selectBoxOpen);
            }}
            open={selectBoxOpen}
          >
            <SelectTrigger
              className=" w-[250px] capitalize"
              value={selectedCategory}
            >
              <span> {selectedCategory} projects</span>
            </SelectTrigger>
            <SelectContent>
              {projectsCategories.map((category, index) => {
                return (
                  <SelectItem
                    className="capitalize"
                    value={category}
                    key={index}
                  >
                    <span>{category}</span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className=" col-span-6 flex flex-col   border rounded-xl overflow-hidden group"
            >
              <div className="overflow-hidden relative h-[300px]  border-b md:border-b-0 md:border-r">
                <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={1200}
                    className="w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button size="sm">
                    <Link
                      href={project.demoUrl}
                      className="flex items-center"
                      target="_blank"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </Link>
                  </Button>
                  {project.githubUrl && (
                    <Button size="sm" variant="outline">
                      <Link
                        href={project.githubUrl}
                        className="flex items-center"
                        target="_blank"
                      >
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
