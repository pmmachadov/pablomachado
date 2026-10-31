import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionCard from "@components/SectionCard";
import { SkillItem } from "@components/SkillsCarousel";
import styles from "@styles/Skills.module.sass";
import {
  skillcard_Frontend,
  skillcard_Backend,
  skillcard_Tools,
} from "@sections/Me";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#818cf8",
  Backend: "#34d399",
  Tools: "#fbbf24",
};

// Softer, muted palette for subtle illumination
const SKILL_LIGHT_RGB: Record<string, { hex: string; rgb: string }> = {
  React: { hex: "#7dd3fc", rgb: "125, 211, 252" },
  "Next.js": { hex: "#a5b4fc", rgb: "165, 180, 252" },
  TypeScript: { hex: "#93c5fd", rgb: "147, 197, 253" },
  JavaScript: { hex: "#fde047", rgb: "253, 224, 71" },
  HTML5: { hex: "#fdba74", rgb: "253, 186, 116" },
  CSS3: { hex: "#7dd3fc", rgb: "125, 211, 252" },
  "Tailwind CSS": { hex: "#5eead4", rgb: "94, 234, 212" },
  Vite: { hex: "#c4b5fd", rgb: "196, 181, 253" },
  "Node.js": { hex: "#6ee7b7", rgb: "110, 231, 183" },
  Express: { hex: "#a5b4fc", rgb: "165, 180, 252" },
  MongoDB: { hex: "#86efac", rgb: "134, 239, 172" },
  MySQL: { hex: "#67e8f9", rgb: "103, 232, 249" },
  "REST APIs": { hex: "#c4b5fd", rgb: "196, 181, 253" },
  Git: { hex: "#fca5a5", rgb: "252, 165, 165" },
  GitHub: { hex: "#cbd5e1", rgb: "203, 213, 225" },
  Jest: { hex: "#fda4af", rgb: "253, 164, 175" },
  "Agile/Scrum": { hex: "#fcd34d", rgb: "252, 211, 77" },
};

type CategoryFilter = "All" | "Frontend" | "Backend" | "Tools";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [litIndex, setLitIndex] = useState<number | null>(null);
  const [inViewTrigger, setInViewTrigger] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const allSkills: SkillItem[] = [
    ...skillcard_Frontend.map((s) => ({ ...s, category: "Frontend" as const })),
    ...skillcard_Backend.map((s) => ({ ...s, category: "Backend" as const })),
    ...skillcard_Tools.map((s) => ({ ...s, category: "Tools" as const })),
  ];

  const filteredSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  // Start the 4-second light sequence when the grid comes into view
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewTrigger((n) => n + 1);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run random one-by-one card lighting for 4 seconds total, then turn off
  useEffect(() => {
    if (inViewTrigger === 0) return;
    const total = filteredSkills.length;
    if (total === 0) return;

    const pickRandomIndex = (prev: number | null) => {
      if (total <= 1) return 0;
      let next = Math.floor(Math.random() * total);
      while (next === prev) {
        next = Math.floor(Math.random() * total);
      }
      return next;
    };

    let current = pickRandomIndex(null);
    setLitIndex(current);

    const stepInterval = setInterval(() => {
      current = pickRandomIndex(current);
      setLitIndex(current);
    }, 220);

    const stopTimeout = setTimeout(() => {
      clearInterval(stepInterval);
      setLitIndex(null);
    }, 2000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(stopTimeout);
    };
  }, [activeCategory, inViewTrigger, filteredSkills.length]);

  const categories: { label: CategoryFilter; count: number; color?: string }[] = [
    { label: "All", count: allSkills.length },
    { label: "Frontend", count: skillcard_Frontend.length, color: CATEGORY_COLORS.Frontend },
    { label: "Backend", count: skillcard_Backend.length, color: CATEGORY_COLORS.Backend },
    { label: "Tools", count: skillcard_Tools.length, color: CATEGORY_COLORS.Tools },
  ];

  return (
    <SectionCard
      id="skills"
      eyebrow="02 — Expertise"
      title={
        <>
          Technologies &amp; <em>Toolbox</em>
        </>
      }
      subtitle="A curated stack of modern frontend frameworks, backend runtimes, and developer tooling I use to craft high-quality software."
    >
      <div className={styles.skillsSection} ref={gridRef}>
        {/* Category Filter Pills */}
        <div className={styles.filterContainer}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ""}`}
                onClick={() => setActiveCategory(cat.label)}
              >
                {cat.color && (
                  <span
                    className={styles.filterDot}
                    style={{ backgroundColor: cat.color }}
                  />
                )}
                <span>{cat.label}</span>
                <span className={styles.filterCount}>{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Filtered Skills Grid */}
        <motion.div layout className={styles.skillsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const badgeColor = CATEGORY_COLORS[skill.category] || "#818cf8";
              const light = SKILL_LIGHT_RGB[skill.text] || {
                hex: badgeColor,
                rgb: "129, 140, 248",
              };
              const isLit = litIndex === index;

              return (
                <motion.div
                  key={skill.text}
                  layout
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{
                    opacity: 1,
                    scale: isLit ? 1.015 : 1,
                    y: isLit ? -2 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`${styles.skillCard} ${isLit ? styles.skillCardLit : ""}`}
                  style={{
                    borderColor: isLit
                      ? `rgba(${light.rgb}, 0.38)`
                      : "rgba(255, 255, 255, 0.08)",
                    boxShadow: isLit
                      ? `0 10px 26px -10px rgba(${light.rgb}, 0.22), 0 0 18px -4px rgba(${light.rgb}, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.16)`
                      : "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                    background: isLit
                      ? `linear-gradient(180deg, rgba(${light.rgb}, 0.11) 0%, rgba(${light.rgb}, 0.03) 60%, rgba(255, 255, 255, 0.015) 100%)`
                      : "linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015))",
                  }}
                >
                  {/* Soft top beam */}
                  <div
                    className={styles.cardTopBeam}
                    style={{
                      opacity: isLit ? 0.75 : 0,
                      transform: isLit ? "scaleX(0.85)" : "scaleX(0.3)",
                      background: `linear-gradient(90deg, transparent, ${light.hex}, transparent)`,
                      boxShadow: isLit
                        ? `0 0 10px rgba(${light.rgb}, 0.45)`
                        : "none",
                    }}
                  />

                  {/* Subtle radial spotlight from top */}
                  <div
                    className={styles.cardGlow}
                    style={{
                      opacity: isLit ? 1 : 0,
                      background: `radial-gradient(100% 80% at 50% 0%, rgba(${light.rgb}, 0.2) 0%, rgba(${light.rgb}, 0.06) 50%, transparent 80%)`,
                    }}
                  />

                  {/* Soft orb behind icon */}
                  <div
                    className={styles.cardOrb}
                    style={{
                      opacity: isLit ? 0.55 : 0,
                      transform: isLit
                        ? "translate(-50%, -38%) scale(1.05)"
                        : "translate(-50%, -40%) scale(0.7)",
                      background: `radial-gradient(circle, rgba(${light.rgb}, 0.35) 0%, transparent 70%)`,
                    }}
                  />

                  <div
                    className={styles.iconWrap}
                    style={{
                      borderColor: isLit
                        ? `rgba(${light.rgb}, 0.35)`
                        : "rgba(255, 255, 255, 0.08)",
                      background: isLit
                        ? `radial-gradient(circle at 50% 30%, rgba(${light.rgb}, 0.18), rgba(255, 255, 255, 0.03))`
                        : "rgba(255, 255, 255, 0.035)",
                      boxShadow: isLit
                        ? `0 0 14px rgba(${light.rgb}, 0.25)`
                        : "none",
                      color: isLit ? "#ffffff" : "var(--text)",
                    }}
                  >
                    {skill.icon}
                  </div>

                  <span
                    className={styles.skillName}
                    style={{
                      color: isLit ? "#ffffff" : "var(--text)",
                    }}
                  >
                    {skill.text}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionCard>
  );
};

export default Skills;
