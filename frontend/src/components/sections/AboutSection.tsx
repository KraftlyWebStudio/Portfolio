"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { gsap } from "@/lib/gsap";

const stats = [
  { value: "02", label: "Focused Projects" },
  { value: "100%", label: "Founder Led" },
  { value: "01", label: "Relentless Vision" },
  { value: "Px", label: "Pixel Perfection" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  useEffect(() => {
    if (!lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-12 bg-black overflow-hidden"
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.svg')] pointer-events-none" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <div ref={lineRef} className="h-px w-12 bg-teal-400 origin-left" />
          <span className="text-xs tracking-[0.3em] uppercase text-teal-400">
            About Kraftly
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-black leading-tight tracking-tighter text-white"
            >
              Quality over
              <br />
              quantity.
              <br />
              <span className="text-white/25">Always.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base text-white/40 leading-relaxed max-w-md"
            >
              Kraftly is a boutique web development studio where technical expertise
              meets craft. We don't chase volume; we chase perfection. By partnering
              with only a few select clients at a time, we ensure that every line of
              code and every interaction gets the attention it deserves.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base text-white/40 leading-relaxed max-w-md"
            >
              We are a focused team of developers who believe that the best digital
              products are built with clean code, modern tech stacks, and a relentless
              pursuit of performance.
            </motion.p>

            <motion.a
              variants={itemVariants}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-sm text-white border-b border-white/30 hover:border-white pb-0.5 tracking-widest uppercase transition-all cursor-pointer"
            >
              Start a project →
            </motion.a>
          </motion.div>

          {/* Right — stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group p-6 border border-white/[0.06] rounded-2xl hover:border-teal-400/30 transition-all duration-500 hover:bg-white/[0.02]"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xs text-white/35 tracking-widest uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
