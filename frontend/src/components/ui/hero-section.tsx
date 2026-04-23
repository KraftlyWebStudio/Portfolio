'use client'
import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function HeroSection() {
  return (
    <main className="h-screen w-full bg-black relative overflow-hidden">
      <Card className="w-full h-full bg-black/[0.96] relative overflow-hidden border-none rounded-none">
        <Spotlight
          className="z-0"
          size={500}
        />

        <div className="flex flex-col md:flex-row h-full">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-12 lg:p-24 relative z-10 flex flex-col justify-center">
            {/* Availability Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 inline-flex w-fit items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-2.5 text-xs font-bold tracking-[0.2em] uppercase text-emerald-300 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Selective Availability — Q4 '24
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter text-white leading-[0.95]"
            >
              Digital Products.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-white to-neutral-500">
                Engineered to Win.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 text-neutral-400 max-w-2xl text-xl md:text-2xl leading-relaxed font-medium"
            >
              We engineer high-performance digital products that define the <span className="text-white font-bold underline underline-offset-8 decoration-neutral-800">future of your brand</span>.
            </motion.p>

            {/* Conversion CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <button className="group relative rounded-full bg-white px-14 py-8 text-base font-black uppercase tracking-[0.15em] text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95">
                Initiate Project
              </button>
              <button className="group relative rounded-full border border-white/20 bg-transparent px-14 py-8 text-base font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white/5 hover:border-white/40 hover:scale-105 active:scale-95">
                Explore Work
              </button>
            </motion.div>

            {/* Trust Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-24 flex flex-wrap gap-x-16 gap-y-8 border-t border-neutral-800/50 pt-12"
            >
              {[
                { value: "12 Days", label: "Avg. Delivery" },
                { value: "99.9%", label: "Performance" },
                { value: "Top 1%", label: "Execution" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <p className="text-5xl font-black text-white tracking-tighter">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-bold">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right content — 3D Scene */}
          <div className="flex-1 relative min-h-[300px] md:min-h-0">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </main>
  );
}
