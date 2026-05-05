"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Understand",
    description: "Deep dive into project goals, technical requirements, and user needs. We align on the 'Why' before the 'How'.",
  },
  {
    number: "02",
    title: "Design",
    description: "Architecting the technical foundation and visual language. We design for interaction, accessibility, and speed.",
  },
  {
    number: "03",
    title: "Build",
    description: "Clean, modular code implementation using modern stacks. This is where execution meets technical precision.",
  },
  {
    number: "04",
    title: "Optimize",
    description: "Refining every interaction, optimizing assets, and ensuring perfect Core Web Vitals for launch.",
  },
];

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="process" ref={ref} className="relative py-20 md:py-32 px-6 md:px-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-teal-400" />
            <span className="text-xs tracking-[0.3em] uppercase text-teal-400 font-bold">
              Execution
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.1]"
          >
            How we
            <br />
            <span className="text-white/40">build trust.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-px bg-white/5 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center mb-8 group hover:border-teal-400 transition-colors duration-500">
                <span className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
