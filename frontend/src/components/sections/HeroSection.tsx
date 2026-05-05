"use client";

import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, AdaptiveDpr } from "@react-three/drei";
import { motion, type Variants } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { ParticleField } from "@/components/three/ParticleField";

const HeroMesh = lazy(() =>
  import("@/components/three/HeroMesh").then((m) => ({ default: m.HeroMesh }))
);

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.6 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function HeroSection() {
  const mouse = useMouseParallax(0.06);

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
          dpr={[1, 2]}
        >
          <AdaptiveDpr pixelated={false} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#0d9488" />
          <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} />

          <Suspense fallback={null}>
            <HeroMesh mouseX={mouse.x} mouseY={mouse.y} />
            <ParticleField count={500} spread={22} color="#ffffff" size={0.012} />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[1] bg-radial-gradient pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)"
        }}
      />

      {/* Hero text content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 20 },
            show: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15, delayChildren: 0.4 } }
          }}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8"
        >
          {/* Eyebrow tag / Logo fade in */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-white/50 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <span className="font-bold text-white">Kraftly</span> — Web Development Studio
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[1.05] text-white max-w-4xl drop-shadow-2xl"
          >
            We build fast, modern,
            <br />
            <span className="text-white/40">high-impact</span> web experiences.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-base md:text-xl text-white/50 max-w-xl leading-relaxed tracking-wide font-light"
          >
            Focused on performance, interaction, and clean design. We turn technical
            excellence into digital presence.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-6 mt-4">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-500 hover:scale-[1.02] active:scale-95 overflow-hidden"
            >
              {/* Soft glow behind CTA */}
              <div className="absolute inset-0 rounded-full bg-white blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
              
              <span className="relative z-10">View Live Work</span>
              <span className="relative z-10 w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 group-hover:translate-x-1 transition-all">
                →
              </span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm text-white/50 hover:text-white tracking-widest uppercase transition-colors border-b border-transparent hover:border-white pb-0.5"
            >
              Start a Project
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
