"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

const roles = ["3D Designer", "Web & App Designer", "Web Developer"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Three.js background */}
      <ThreeScene />

      {/* Subtle radial glow on top of the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 80%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xs font-medium tracking-[0.25em] uppercase text-[#6e6e73] mb-6"
        >
          Portfolio
        </motion.p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] text-white mb-6">
          Shivansh Malik
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {roles.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              className="text-sm px-4 py-1.5 rounded-full border border-white/10 text-[#a1a1a6]"
            >
              {role}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-[#6e6e73] max-w-xl mx-auto leading-relaxed"
        >
          Crafting digital experiences at the intersection of design and technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 border border-white/15 text-white text-sm font-medium rounded-full hover:border-white/40 transition-all duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#3d3d3f]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#3d3d3f] to-transparent"
        />
      </motion.div>
    </section>
  );
}
