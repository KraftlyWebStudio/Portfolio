"use client";

import { useState, useEffect, useRef } from "react";

interface MousePosition {
  x: number; // -1 to 1
  y: number; // -1 to 1
  rawX: number;
  rawY: number;
}

export function useMouseParallax(smoothing = 0.08): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };

    const animate = () => {
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * smoothing;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * smoothing;

      setPosition({
        x: currentRef.current.x,
        y: currentRef.current.y,
        rawX: targetRef.current.x,
        rawY: targetRef.current.y,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [smoothing]);

  return position;
}
