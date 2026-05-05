"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center group cursor-pointer"
          aria-label="Kraftly home"
        >
          <div className="relative h-20 w-fit flex items-center justify-start transition-transform duration-500 group-hover:scale-105 bg-white rounded-md p-0 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <img 
              src="/logo.jpeg" 
              alt="Kraftly Logo" 
              className="h-full w-auto object-contain" 
            />
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-white/50 hover:text-white tracking-widest uppercase transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="ml-4 px-5 py-2 text-sm text-black bg-white rounded-full tracking-widest uppercase font-semibold hover:bg-teal-400 hover:text-black transition-all duration-300 cursor-pointer"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8 cursor-pointer z-50"
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block h-px bg-white origin-left"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-px bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block h-px bg-white origin-left"
          />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                onClick={() => handleNavClick(link.href)}
                className="text-4xl font-bold tracking-widest uppercase text-white hover:text-teal-400 transition-colors cursor-pointer"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => handleNavClick("#contact")}
              className="mt-6 px-8 py-3 border border-white text-white rounded-full tracking-widest uppercase text-sm hover:bg-white hover:text-black transition-all cursor-pointer"
            >
              Let's Talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
