import React from "react";
import { motion } from "framer-motion";
import SectionCard from "@components/SectionCard";
import SkillsCarousel from "@components/SkillsCarousel";
import styles from "@styles/Skills.module.sass";
import {
  skillcard_Frontend,
  skillcard_Backend,
  skillcard_Tools,
} from "@sections/Me";
import BgTitle from "@components/BgTitle";

const Skills = () => {
  // Combine all skills with their categories
  const allSkills = [
    ...skillcard_Frontend.map(skill => ({ ...skill, category: "Frontend" as const })),
    ...skillcard_Backend.map(skill => ({ ...skill, category: "Backend" as const })),
    ...skillcard_Tools.map(skill => ({ ...skill, category: "Tools" as const })),
  ];

  return (
    <SectionCard id="skills" title="SKILLS" page="SKILLS">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BgTitle title="SKILLS" />
        
        {/* Category Legend */}
        <motion.div 
          className={styles.categoryLegend}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: "#6366f1" }} />
            <span>Frontend</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: "#10b981" }} />
            <span>Backend</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: "#f59e0b" }} />
            <span>Tools</span>
          </div>
        </motion.div>

        {/* Skills Carousel */}
        <SkillsCarousel skills={allSkills} />


      </motion.div>
    </SectionCard>
  );
};

export default Skills;
