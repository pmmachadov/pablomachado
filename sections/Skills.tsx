import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionCard from "@components/SectionCard";
import SkillsCarousel, { SkillItem } from "@components/SkillsCarousel";
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

type CategoryFilter = "All" | "Frontend" | "Backend" | "Tools";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const allSkills: SkillItem[] = [
    ...skillcard_Frontend.map((s) => ({ ...s, category: "Frontend" as const })),
    ...skillcard_Backend.map((s) => ({ ...s, category: "Backend" as const })),
    ...skillcard_Tools.map((s) => ({ ...s, category: "Tools" as const })),
  ];

  const filteredSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

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
      <div className={styles.skillsSection}>
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
            {filteredSkills.map((skill) => {
              const color = CATEGORY_COLORS[skill.category] || "#818cf8";
              return (
                <motion.div
                  key={skill.text}
                  layout
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.skillCard}
                >
                  <div
                    className={styles.cardGlow}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${color}26, transparent 70%)`,
                    }}
                  />
                  <div className={styles.iconWrap}>{skill.icon}</div>
                  <span className={styles.skillName}>{skill.text}</span>
                  <span
                    className={styles.skillCategoryBadge}
                    style={{ color }}
                  >
                    {skill.category}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Infinite marquee ticker */}
        <div className={styles.tickerWrap}>
          <div className={styles.tickerHeader}>
            <span className={styles.tickerLabel}>Continuous Stack</span>
          </div>
          <SkillsCarousel skills={allSkills} />
        </div>
      </div>
    </SectionCard>
  );
};

export default Skills;
