"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Web Development",
    description: "High-performance, scalable web applications built with modern frameworks like Next.js and React. Clean code, always.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "UI Implementation",
    description: "Turning pixel-perfect designs into interactive reality. We specialize in complex animations and seamless user journeys.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Performance Optimization",
    description: "Lightning-fast load times and optimized Core Web Vitals. We ensure your digital product is lean, fast, and accessible.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group p-10 bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden cursor-default"
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(13,148,136,0.1) 0%, transparent 70%)",
        }}
      />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="mb-8 text-teal-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
          {service.title}
        </h3>
        <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
          {service.description}
        </p>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-4xl font-black text-white">{service.id}</span>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-20 md:py-32 px-6 md:px-12 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-teal-400" />
            <span className="text-xs tracking-[0.3em] uppercase text-teal-400 font-bold">
              Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.1]"
          >
            What we do
            <br />
            <span className="text-white/40">best.</span>
          </motion.h2>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
