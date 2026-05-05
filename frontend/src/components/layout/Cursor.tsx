"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const smoothRingX = useSpring(ringX, { damping: 20, stiffness: 200 });
  const smoothRingY = useSpring(ringY, { damping: 20, stiffness: 200 });

  const isHovering = useRef(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleHoverIn = () => { isHovering.current = true; };
    const handleHoverOut = () => { isHovering.current = false; };

    window.addEventListener("mousemove", moveCursor, { passive: true });

    // Attach hover to all interactive elements
    const interactives = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[9998]"
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
