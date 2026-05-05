"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

interface HeroMeshProps {
  mouseX: number;
  mouseY: number;
}

export function HeroMesh({ mouseX, mouseY }: HeroMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();
  
  // Use simplex noise for organic vertex displacement
  const noise3D = useMemo(() => createNoise3D(), []);
  
  // Create a sphere with enough detail for smooth morphing (high detail for '4k' feel)
  const geometry = useMemo(() => new THREE.SphereGeometry(1.8, 256, 256), []);
  
  // Store original positions to calculate displacement
  const positions = useMemo(() => {
    const pos = geometry.attributes.position.array;
    const arr = [];
    for (let i = 0; i < pos.length; i += 3) {
      arr.push(new THREE.Vector3(pos[i], pos[i + 1], pos[i + 2]));
    }
    return arr;
  }, [geometry]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    // Smooth camera shift based on scroll and mouse
    const scrollY = window.scrollY;
    const scrollOffset = scrollY * 0.002;
    
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      scrollOffset - 0.2, // Move up slightly on scroll
      0.05
    );

    // Cursor distortion (rotation & slight scale)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouseY * 0.3 + t * 0.1,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouseX * 0.3 + t * 0.15,
      0.05
    );
    
    // Subtle breathing scale
    const scale = 1 + Math.sin(t * 1.5) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);
  });

  // Custom shader logic for organic morphing
  const onBeforeCompile = (shader: any) => {
    shader.uniforms.uTime = { value: 0 };
    shader.uniforms.uSpeed = { value: 0.5 };
    shader.uniforms.uDistortion = { value: 0.4 };
    
    shader.vertexShader = `
      uniform float uTime;
      uniform float uSpeed;
      uniform float uDistortion;
      
      // Simplex 3D Noise 
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      float snoise(vec3 v){ 
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0 ); 
        vec4 p = permute( permute( permute( 
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 1.0/7.0;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) ) ;
      }
      
      ${shader.vertexShader}
    `.replace(
      `#include <begin_vertex>`,
      `
      #include <begin_vertex>
      float noise = snoise(vec3(position * 1.5 + uTime * uSpeed));
      transformed += normal * noise * uDistortion;
      `
    );

    // Save uniform reference to update in useFrame
    materialRef.current = shader;
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      // Connect cursor to distortion intensity subtly
      const cursorDistortion = Math.max(Math.abs(mouseX), Math.abs(mouseY)) * 0.15;
      materialRef.current.uniforms.uDistortion.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uDistortion.value,
        0.15 + cursorDistortion, // Base distortion + cursor influence
        0.1
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* The Glass Orb */}
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.05}
          thickness={1.5}
          ior={1.3}
          chromaticAberration={0.08}
          anisotropy={0.5}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.15}
          color="#ffffff"
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>
      
      {/* Inner core for soft glow and reflections */}
      <mesh scale={0.75}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshPhysicalMaterial 
          color="#000000"
          emissive="#0d9488"
          emissiveIntensity={1.5}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}
