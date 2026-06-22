"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "3+", label: "Years of Experience" },
  { value: "30+", label: "Projects Delivered" },
  { value: "15+", label: "Happy Clients" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#6e6e73] mb-4">
              About
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
              Design-driven,
              <br />
              detail-obsessed.
            </h2>
            <p className="text-[#6e6e73] leading-relaxed mb-4">
              I&apos;m Shivansh Malik — a multidisciplinary creative who lives at the crossroads
              of 3D design, visual interface design, and web development. I believe great
              products aren&apos;t just functional — they should feel inevitable.
            </p>
            <p className="text-[#6e6e73] leading-relaxed">
              Whether sculpting 3D assets, designing intuitive app experiences, or writing
              clean, performant code — I bring the same obsessive attention to craft to
              everything I touch.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-black flex flex-col items-center justify-center py-10 px-4 text-center"
              >
                <span className="text-3xl md:text-4xl font-semibold text-white mb-2">
                  {s.value}
                </span>
                <span className="text-xs text-[#6e6e73] leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
