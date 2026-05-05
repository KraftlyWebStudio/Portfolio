"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  speed?: number;
}

export function ParticleField({
  count = 600,
  spread = 20,
  color = "#ffffff",
  size = 0.015,
  speed = 0.03,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;

      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }

    return { positions, velocities };
  }, [count, spread]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 0] += velocities[i * 3 + 0] * speed * 10;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] * speed * 10;
      posArray[i * 3 + 2] += velocities[i * 3 + 2] * speed * 10;

      // Wrap around bounds
      if (Math.abs(posArray[i * 3 + 0]) > spread / 2) velocities[i * 3 + 0] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > spread / 2) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > spread / 4) velocities[i * 3 + 2] *= -1;
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
}
