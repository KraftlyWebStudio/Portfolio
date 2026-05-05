"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    title: "Clean Code",
    description: "Maintainable, modular, and well-documented codebases that grow with your product.",
  },
  {
    title: "Performance",
    description: "Obsessive focus on Core Web Vitals, payload size, and rendering speed.",
  },
  {
    title: "Modern UI",
    description: "Cutting-edge interface patterns that provide immersive and intuitive user journeys.",
  },
  {
    title: "Detail Focused",
    description: "Every interaction is considered. Every pixel is intentional. No cutting corners.",
  },
];

export function WhySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="why" ref={ref} className="relative py-20 md:py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-teal-400" />
              <span className="text-xs tracking-[0.3em] uppercase text-teal-400 font-bold">
                Philosophy
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.1] mb-8"
            >
              Why
              <br />
              <span className="text-white/40">Kraftly.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-lg leading-relaxed max-w-md"
            >
              We don't rely on history; we rely on our next build. We are a team of technicians obsessed with the craft of web development.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            {values.map((value) => (
              <div key={value.title} className="p-8 bg-black hover:bg-white/[0.02] transition-colors duration-500">
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
