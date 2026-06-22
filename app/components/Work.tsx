"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "3D Brand Identity",
    category: "3D Design",
    description:
      "Complete 3D visual identity for a luxury brand — product renders, motion sequences, and immersive campaign assets built in Blender.",
    tags: ["Blender", "Cinema 4D", "Substance Painter"],
    year: "2024",
  },
  {
    number: "02",
    title: "Finance App UI",
    category: "App Design",
    description:
      "End-to-end mobile application design for a personal finance platform — from user research and wireframes to a polished Figma prototype.",
    tags: ["Figma", "Prototyping", "iOS Design"],
    year: "2024",
  },
  {
    number: "03",
    title: "Studio Website",
    category: "Web Development",
    description:
      "Custom built marketing site for a creative studio — smooth scroll animations, WebGL backgrounds, and sub-second load times.",
    tags: ["Next.js", "Three.js", "GSAP"],
    year: "2023",
  },
  {
    number: "04",
    title: "Product Configurator",
    category: "3D + Web",
    description:
      "Interactive real-time 3D product configurator allowing users to customise materials, colours, and finishes in the browser.",
    tags: ["Three.js", "React", "GLSL"],
    year: "2023",
  },
];

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="py-32 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#6e6e73] mb-4">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Projects
          </h2>
        </motion.div>

        <div className="divide-y divide-white/[0.06]">
          {projects.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group py-10 grid md:grid-cols-[80px_1fr_auto] gap-6 items-start cursor-pointer hover:bg-white/[0.02] -mx-6 px-6 transition-colors duration-300 rounded-xl"
            >
              <span className="text-xs text-[#3d3d3f] font-mono pt-1">{p.number}</span>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-[#6e6e73]">
                    {p.category}
                  </span>
                </div>
                <p className="text-[#6e6e73] text-sm leading-relaxed max-w-xl mb-4">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs text-[#3d3d3f]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs text-[#3d3d3f]">{p.year}</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
