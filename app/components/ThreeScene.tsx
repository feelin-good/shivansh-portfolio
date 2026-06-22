"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ── Slowly rotating wireframe mesh ── */
function RotatingWire({
  geometry,
  position,
  speedX = 0.08,
  speedY = 0.12,
  opacity = 0.18,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  speedX?: number;
  speedY?: number;
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    ref.current.rotation.x += dt * speedX;
    ref.current.rotation.y += dt * speedY;
  });
  return (
    <mesh ref={ref} position={position} geometry={geometry}>
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={opacity} />
    </mesh>
  );
}

/* ── Monitor (screen + stand + base) ── */
function Monitor({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={0.8} floatIntensity={0.4} rotationIntensity={0.15}>
      <group position={position}>
        <mesh>
          <boxGeometry args={[1.8, 1.1, 0.06]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.22} />
        </mesh>
        {/* inner screen bezel */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.55, 0.9]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
        </mesh>
        <mesh position={[0, -0.72, 0]}>
          <boxGeometry args={[0.12, 0.32, 0.05]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
        </mesh>
        <mesh position={[0, -0.9, 0]}>
          <boxGeometry args={[0.55, 0.06, 0.12]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Terminal window ── */
function Terminal({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.0} floatIntensity={0.5} rotationIntensity={0.2}>
      <group position={position}>
        {/* window frame */}
        <mesh>
          <boxGeometry args={[1.5, 1.0, 0.05]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
        </mesh>
        {/* title bar */}
        <mesh position={[0, 0.42, 0.03]}>
          <planeGeometry args={[1.5, 0.14]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
        </mesh>
        {/* blinking cursor line */}
        <mesh position={[-0.4, 0.1, 0.03]}>
          <planeGeometry args={[0.6, 0.03]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-0.55, -0.05, 0.03]}>
          <planeGeometry args={[0.3, 0.03]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
        <mesh position={[-0.35, -0.2, 0.03]}>
          <planeGeometry args={[0.5, 0.03]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Floating code symbol labels ── */
function CodeLabel({
  text,
  position,
  fontSize = 0.38,
  opacity = 0.14,
}: {
  text: string;
  position: [number, number, number];
  fontSize?: number;
  opacity?: number;
}) {
  return (
    <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.1}>
      <Text
        position={position}
        fontSize={fontSize}
        color="#ffffff"
        fillOpacity={opacity}
        font="https://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  );
}

/* ── Floating particle cloud ── */
function Particles({ count = 120 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

/* ── Scene composition ── */
function Scene() {
  const icosa = useMemo(() => new THREE.IcosahedronGeometry(1.1, 1), []);
  const octa = useMemo(() => new THREE.OctahedronGeometry(0.55), []);
  const torusKnot = useMemo(() => new THREE.TorusKnotGeometry(0.5, 0.15, 80, 12), []);
  const box = useMemo(() => new THREE.BoxGeometry(0.7, 0.7, 0.7), []);

  return (
    <>
      <ambientLight intensity={0.2} />

      {/* Central large icosahedron — 3D design orb */}
      <RotatingWire geometry={icosa} position={[2.8, 0.2, -1]} speedX={0.05} speedY={0.09} opacity={0.22} />

      {/* Torus knot — programmer complexity */}
      <Float speed={0.6} floatIntensity={0.3} rotationIntensity={0.4}>
        <RotatingWire geometry={torusKnot} position={[-3.2, -0.8, -1.5]} speedX={0.12} speedY={0.08} opacity={0.16} />
      </Float>

      {/* Octahedron */}
      <RotatingWire geometry={octa} position={[0.5, 2.8, -2]} speedX={0.18} speedY={0.1} opacity={0.14} />

      {/* Cube — code block */}
      <RotatingWire geometry={box} position={[-1.5, -2.5, -1]} speedX={0.09} speedY={0.14} opacity={0.16} />

      {/* Monitor */}
      <Monitor position={[-3.5, 1.2, -2]} />

      {/* Terminal */}
      <Terminal position={[3.8, -1.6, -2]} />

      {/* Code labels */}
      <CodeLabel text="</>" position={[-2.5, 2.4, -1.5]} fontSize={0.5} opacity={0.2} />
      <CodeLabel text="{ }" position={[1.8, -2.6, -1]} fontSize={0.42} opacity={0.17} />
      <CodeLabel text="fn()" position={[4.5, 0.8, -2]} fontSize={0.38} opacity={0.15} />
      <CodeLabel text="npm" position={[-4.2, -1.8, -2]} fontSize={0.34} opacity={0.13} />
      <CodeLabel text="git" position={[0.2, 3.2, -2]} fontSize={0.34} opacity={0.13} />
      <CodeLabel text="import" position={[-1.0, -3.2, -2]} fontSize={0.3} opacity={0.12} />
      <CodeLabel text="return" position={[5.2, -0.5, -2.5]} fontSize={0.3} opacity={0.1} />
      <CodeLabel text="∇" position={[-5.0, 0.5, -2.5]} fontSize={0.5} opacity={0.1} />

      {/* Particles */}
      <Particles count={150} />

      {/* Deep space stars */}
      <Stars radius={30} depth={20} count={800} factor={2} fade speed={0.5} />
    </>
  );
}

/* ── Exported canvas wrapper ── */
export default function ThreeScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
