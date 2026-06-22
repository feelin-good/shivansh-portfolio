"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    title: "3D Design",
    skills: ["Blender", "Cinema 4D", "Substance Painter", "ZBrush", "Houdini", "V-Ray"],
  },
  {
    title: "UI / UX Design",
    skills: ["Figma", "Prototyping", "Design Systems", "User Research", "Wireframing", "Motion Design"],
  },
  {
    title: "Web Development",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "GSAP"],
  },
  {
    title: "Tools & More",
    skills: ["Git", "Vercel", "Framer", "Webflow", "Adobe CC", "Spline"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-32 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#6e6e73] mb-4">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Skills
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-black p-8"
            >
              <h3 className="text-sm font-semibold text-white mb-6">{group.title}</h3>
              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-[#6e6e73]">
                    <span className="w-1 h-1 rounded-full bg-[#3d3d3f] shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
