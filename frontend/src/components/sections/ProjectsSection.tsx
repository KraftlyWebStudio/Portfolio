"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "Nexora Platform",
    category: "Full-Stack Build",
    description: "A high-performance fintech dashboard with real-time data visualization and complex state management.",
    image: "/projects/project-1.png",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "#",
    type: "Real Project"
  },
  {
    id: "02",
    title: "Aura Experience",
    category: "Interactive UI",
    description: "WebGL-powered product landing page with immersive scroll interactions and 3D assets.",
    image: "/projects/project-2.png",
    tags: ["Three.js", "GSAP", "React"],
    link: "#",
    type: "Real Project"
  },
  {
    id: "03",
    title: "Anti-Gravity UI",
    category: "Technical Experiment",
    description: "An exploration of physics-based UI elements and anti-gravity motion patterns in the browser.",
    image: "/projects/project-3.png",
    tags: ["Framer Motion", "Physics"],
    link: "#",
    type: "Lab Experiment"
  },
  {
    id: "04",
    title: "Fluid Shaders",
    category: "WebGL Demo",
    description: "Custom GLSL shader implementation for fluid organic backgrounds and mouse-responsive meshes.",
    image: "/projects/project-4.png",
    tags: ["GLSL", "WebGL"],
    link: "#",
    type: "Lab Experiment"
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative flex flex-col gap-6"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-white/[0.03] border border-white/[0.08] cursor-pointer">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
        />
        
        {/* Project Type Badge */}
        <div className="absolute top-6 left-6">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/60">
            {project.type}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold tracking-widest"
          >
            LIVE
          </motion.div>
        </div>
      </div>

      <div className="px-2">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-teal-400 font-bold">
            {project.category}
          </span>
          <div className="h-px w-8 bg-white/10" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="work"
      ref={ref}
      className="relative py-20 md:py-32 px-6 md:px-12 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-teal-400" />
              <span className="text-xs tracking-[0.3em] uppercase text-teal-400 font-bold">
                Selected Work
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.1]"
            >
              Selected builds &
              <br />
              <span className="text-white/40">technical experiments.</span>
            </motion.h2>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <a
            href="#contact"
            className="inline-flex flex-col items-center gap-6 group"
          >
            <span className="text-white/50 group-hover:text-white transition-colors tracking-[0.4em] uppercase text-xs">
              Need a custom build?
            </span>
            <div className="text-4xl md:text-6xl font-black text-white group-hover:text-teal-400 transition-colors tracking-tighter">
              Let's talk →
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
