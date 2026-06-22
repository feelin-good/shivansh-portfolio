"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Email", value: "hello@shivanshmalik.com", href: "mailto:hello@shivanshmalik.com" },
  { label: "GitHub", value: "github.com/feelin-good", href: "https://github.com/feelin-good" },
  { label: "LinkedIn", value: "linkedin.com/in/shivanshmalik", href: "#" },
  { label: "Dribbble", value: "dribbble.com/shivanshmalik", href: "#" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-32 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#6e6e73] mb-4">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
              Let&apos;s build
              <br />
              something great.
            </h2>
            <p className="text-[#6e6e73] leading-relaxed max-w-sm">
              Have a project in mind? I&apos;m available for freelance work and collaborations.
              Let&apos;s talk.
            </p>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-center justify-between py-5 hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors duration-200"
              >
                <div>
                  <p className="text-xs text-[#3d3d3f] mb-0.5">{link.label}</p>
                  <p className="text-sm text-white">{link.value}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[#3d3d3f] group-hover:text-white transition-colors duration-200"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
