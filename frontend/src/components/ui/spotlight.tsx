'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
};

export function Spotlight({
  className,
  size = 500,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current?.parentElement) return;
      const { left, top } = containerRef.current.parentElement.getBoundingClientRect();
      setPosition({
        x: event.clientX - left - size / 2,
        y: event.clientY - top - size / 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  if (!mounted) return null;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_40%,transparent_80%)] blur-[100px] transition-opacity duration-500',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      animate={{
        left: position.x,
        top: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      onLayoutAnimationStart={() => setIsHovered(true)}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
