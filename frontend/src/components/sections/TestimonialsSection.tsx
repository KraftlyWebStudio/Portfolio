"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "Working with Aman and the team was honestly great. I just gave them the basics and they totally ran with it, delivering way more than I expected. Plus, we wrapped the whole project in just four days.",
    author: "Santoshi Pharate",
    role: "Content Strategist",
    company: "Freelance",
    avatar: "SP",
  },
  {
    id: 2,
    quote:
      "We needed a highly reliable, professional digital presence for our healthcare operations. The team delivered a solution that balanced technical complexity with a clean, patient-focused UI perfectly.",
    author: "Executive Director",
    role: "Management",
    company: "Fortschritt Healthcare Limited",
    avatar: "FH",
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="testimonials" ref={ref} className="relative py-20 md:py-32 px-6 md:px-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-teal-400" />
            <span className="text-xs tracking-[0.3em] uppercase text-teal-400 font-bold">
              Kind Words
            </span>
            <div className="h-px w-12 bg-teal-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white"
          >
            Trusted by
            <br />
            <span className="text-white/40">innovators.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.05] transition-colors duration-500"
            >
              <div className="text-4xl text-teal-400/20 mb-8 font-serif">"</div>
              <blockquote className="text-xl md:text-2xl text-white/80 leading-relaxed mb-10 font-medium tracking-tight">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-400/10 border border-teal-400/20 flex items-center justify-center text-xs font-bold text-teal-400">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">{t.author}</div>
                  <div className="text-xs text-white/50 tracking-widest uppercase mt-1">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
