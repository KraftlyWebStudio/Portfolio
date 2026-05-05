"use client";

import { useRef, useState, Suspense, lazy } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";

const ParticleField = lazy(() =>
  import("@/components/three/ParticleField").then((m) => ({ default: m.ParticleField }))
);

const inputFields = [
  { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
  { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL || "http://localhost:5001/api";
      const response = await fetch(`${backendUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 md:py-32 px-6 md:px-12 bg-black overflow-hidden min-h-screen flex items-center"
    >
      {/* 3D particle background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <ParticleField count={300} spread={24} color="#0d9488" size={0.018} speed={0.015} />
            <ParticleField count={200} spread={20} color="#ffffff" size={0.01} speed={0.008} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-teal-400" />
            <span className="text-xs tracking-[0.3em] uppercase text-teal-400">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none mb-12"
          >
            Let’s build something
            <br />
            <span className="text-white/40">that actually stands out.</span>
          </motion.h2>
        </div>

        {/* Form */}
        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Name + Email row */}
            <div className="grid sm:grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.id} className="group">
                  <label
                    htmlFor={field.id}
                    className="block text-xs text-white/35 tracking-widest uppercase mb-3"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formState[field.id as keyof typeof formState]}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, [field.id]: e.target.value }))
                    }
                    className="w-full bg-transparent border-0 border-b border-white/15 pb-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-teal-400 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs text-white/35 tracking-widest uppercase mb-3"
              >
                Your Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell us about your project..."
                value={formState.message}
                onChange={(e) =>
                  setFormState((p) => ({ ...p, message: e.target.value }))
                }
                className="w-full bg-transparent border-0 border-b border-white/15 pb-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-teal-400 transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-white/40">
                We respond within 24 hours.
              </p>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase rounded-full hover:bg-teal-400 transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="loader" />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="py-20 text-center"
          >
            <div className="w-16 h-16 rounded-full border border-teal-400/50 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
            <p className="text-white/60 text-sm">
              We'll be in touch within 24 hours. Prepare for something extraordinary.
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.04]">
        <span className="text-xs text-white/40 tracking-widest">
          © 2025 Kraftly. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          {["Twitter", "LinkedIn", "Dribbble", "Behance"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
