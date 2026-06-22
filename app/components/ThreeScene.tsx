"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Stars, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ─────────────────────── LAPTOP ─────────────────────── */
function Laptop({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.25) * 0.18;
    group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
  });
  return (
    <group ref={group} position={position}>
      {/* Lid */}
      <group rotation={[-0.38, 0, 0]} position={[0, 0.58, -0.28]}>
        <mesh castShadow>
          <boxGeometry args={[2.1, 1.35, 0.07]} />
          <meshPhysicalMaterial color="#1c1c1e" metalness={0.92} roughness={0.08} clearcoat={1} clearcoatRoughness={0.04} />
        </mesh>
        {/* glowing screen */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.9, 1.18]} />
          <meshStandardMaterial color="#000d2e" emissive="#0044ff" emissiveIntensity={0.7} />
        </mesh>
        {/* code lines */}
        {[0.35, 0.18, 0.01, -0.16, -0.33].map((y, i) => (
          <mesh key={i} position={[-0.55 + (i % 2) * 0.12, y, 0.06]}>
            <planeGeometry args={[0.55 + (i % 3) * 0.28, 0.022]} />
            <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={2} />
          </mesh>
        ))}
        {/* cursor blink */}
        <mesh position={[0.3, -0.33, 0.06]}>
          <planeGeometry args={[0.018, 0.09]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
        </mesh>
      </group>
      {/* Base */}
      <mesh rotation={[-0.06, 0, 0]} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.1, 0.07, 1.4]} />
        <meshPhysicalMaterial color="#1c1c1e" metalness={0.92} roughness={0.08} clearcoat={1} />
      </mesh>
      {/* Trackpad */}
      <mesh rotation={[-0.06, 0, 0]} position={[0, 0.04, 0.3]}>
        <boxGeometry args={[0.62, 0.002, 0.42]} />
        <meshPhysicalMaterial color="#2c2c2e" metalness={0.7} roughness={0.2} clearcoat={0.8} />
      </mesh>
    </group>
  );
}

/* ─────────────────────── CHROME SPHERE ─────────────────────── */
function ChromeSphere({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.55) * 0.28;
    ref.current.rotation.y += 0.004;
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[0.9, 128, 128]} />
      <meshPhysicalMaterial
        metalness={1}
        roughness={0.02}
        clearcoat={1}
        clearcoatRoughness={0.02}
        color="#d0d0d0"
        envMapIntensity={4}
      />
    </mesh>
  );
}

/* ─────────────────────── CRYSTAL ─────────────────────── */
function Crystal({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s, dt) => {
    ref.current.rotation.y += dt * 0.35;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.45) * 0.25;
    ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.7 + 1) * 0.22;
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <icosahedronGeometry args={[0.75, 0]} />
      <MeshTransmissionMaterial
        color="#aa88ff"
        transmission={0.96}
        thickness={1.8}
        roughness={0}
        ior={2.1}
        clearcoat={1}
        clearcoatRoughness={0}
        iridescence={1}
        iridescenceIOR={1.4}
        iridescenceThicknessRange={[100, 800]}
        backside
      />
    </mesh>
  );
}

/* ─────────────────────── PHONE ─────────────────────── */
function Phone({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.38 + 2) * 0.09;
    group.current.position.y = position[1] + Math.sin(t * 0.52 + 0.5) * 0.14;
  });
  return (
    <group ref={group} position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.72, 1.48, 0.09]} />
        <meshPhysicalMaterial color="#111111" metalness={0.95} roughness={0.04} clearcoat={1} clearcoatRoughness={0.03} />
      </mesh>
      <mesh position={[0, 0, 0.048]}>
        <planeGeometry args={[0.62, 1.3]} />
        <meshStandardMaterial color="#000820" emissive="#2255ff" emissiveIntensity={0.55} />
      </mesh>
      {/* app grid */}
      {[-0.17, 0.17].map((x) =>
        [-0.35, -0.1, 0.15, 0.4].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.052]}>
            <planeGeometry args={[0.1, 0.1]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} transparent opacity={0.35} />
          </mesh>
        ))
      )}
      {/* notch */}
      <mesh position={[0, 0.62, 0.052]}>
        <planeGeometry args={[0.22, 0.04]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

/* ─────────────────────── MONITOR ─────────────────────── */
function Monitor({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.2 + 1) * 0.12;
    group.current.position.y = position[1] + Math.sin(t * 0.45 + 2) * 0.12;
  });
  return (
    <group ref={group} position={position}>
      {/* bezel */}
      <mesh castShadow>
        <boxGeometry args={[2.0, 1.25, 0.08]} />
        <meshPhysicalMaterial color="#1a1a1c" metalness={0.85} roughness={0.12} clearcoat={0.9} />
      </mesh>
      {/* screen glow */}
      <mesh position={[0, 0, 0.046]}>
        <planeGeometry args={[1.82, 1.08]} />
        <meshStandardMaterial color="#000c20" emissive="#0033cc" emissiveIntensity={0.65} />
      </mesh>
      {/* terminal text lines */}
      {[0.28, 0.12, -0.04, -0.20].map((y, i) => (
        <mesh key={i} position={[-0.4 + (i % 2) * 0.08, y, 0.05]}>
          <planeGeometry args={[0.48 + (i % 3) * 0.22, 0.02]} />
          <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={1.8} />
        </mesh>
      ))}
      {/* stand */}
      <mesh position={[0, -0.75, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.06]} />
        <meshPhysicalMaterial color="#1a1a1c" metalness={0.85} roughness={0.12} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[0.55, 0.06, 0.14]} />
        <meshPhysicalMaterial color="#1a1a1c" metalness={0.85} roughness={0.12} />
      </mesh>
    </group>
  );
}

/* ─────────────────────── FLOATING GEM ─────────────────────── */
function Gem({
  position,
  color,
  emissive,
  scale = 1,
  phase = 0,
  speed = 0.6,
}: {
  position: [number, number, number];
  color: string;
  emissive: string;
  scale?: number;
  phase?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s, dt) => {
    ref.current.rotation.x += dt * 0.55;
    ref.current.rotation.y += dt * 0.75;
    ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * speed + phase) * 0.18;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[0.42]} />
      <meshPhysicalMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.4}
        metalness={0.85}
        roughness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.05}
      />
    </mesh>
  );
}

/* ─────────────────────── PARTICLES ─────────────────────── */
function Particles() {
  const count = 180;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#88aaff" size={0.04} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ─────────────────────── SCENE ─────────────────────── */
function Scene() {
  return (
    <>
      {/* Lighting rig — Disney-style multi-coloured key/fill/rim */}
      <ambientLight intensity={0.12} />
      <pointLight position={[-7, 5, 5]} color="#4488ff" intensity={120} distance={25} decay={2} />
      <pointLight position={[7, -4, 4]} color="#aa44ff" intensity={100} distance={22} decay={2} />
      <pointLight position={[0, 7, 6]} color="#ffffff" intensity={60} distance={18} decay={2} />
      <pointLight position={[2, -3, 5]} color="#00ffaa" intensity={40} distance={12} decay={2} />
      <pointLight position={[-3, 0, 6]} color="#ff6644" intensity={25} distance={10} decay={2} />

      {/* PBR reflections */}
      <Environment preset="city" />

      {/* Hero objects */}
      <Laptop position={[-2.6, -0.1, 0]} />
      <ChromeSphere position={[2.9, 0.6, -0.8]} />
      <Crystal position={[0.4, 2.1, -0.4]} />
      <Phone position={[1.3, -0.9, 0.6]} />
      <Monitor position={[-4.2, -0.5, -1.5]} />

      {/* Accent gems */}
      <Gem position={[-3.8, 1.8, -1]} color="#ff4488" emissive="#ff2266" scale={0.75} phase={0.5} speed={0.65} />
      <Gem position={[4.3, 1.8, -1.2]} color="#44aaff" emissive="#2288ff" scale={0.55} phase={1.3} speed={0.7} />
      <Gem position={[-1.8, 2.8, -1]} color="#ffcc44" emissive="#ffaa00" scale={0.6} phase={2.1} speed={0.5} />
      <Gem position={[3.8, -2.2, -0.6]} color="#aa44ff" emissive="#8822ff" scale={0.8} phase={0.9} speed={0.6} />
      <Gem position={[0.8, -2.8, -0.5]} color="#44ffcc" emissive="#00ffaa" scale={0.5} phase={1.7} speed={0.75} />

      {/* Particles + stars */}
      <Particles />
      <Stars radius={30} depth={20} count={700} factor={2} fade speed={0.4} />

      {/* Cinematic bloom */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.85} intensity={1.1} />
      </EffectComposer>
    </>
  );
}

/* ─────────────────────── CANVAS ─────────────────────── */
export default function ThreeScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  );
}
