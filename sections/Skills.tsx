import React from "react";
import { motion } from "framer-motion";
import SectionCard from "@components/SectionCard";
import SkillCard from "@components/SkillCard";
import styles from "@styles/Skills.module.sass";
import {
  skillcard_Frontend,
  skillcard_Backend,
  skillcard_Tools,
} from "@sections/Me";
import BgTitle from "@components/BgTitle";

const Skills = () => {
  return (
    <SectionCard id="skills" title="SKILLS" page="SKILLS">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BgTitle title="SKILLS" />
        
        <div className={styles.skillsContainer}>
          <div className={styles.skillCategory}>
            <h3 className={styles.categoryTitle}>Front-End</h3>
            <div className={styles.skillCardWrapper}>
              <SkillCard items={skillcard_Frontend} itemHeight={70} />
            </div>
          </div>

          <div className={styles.skillCategory}>
            <h3 className={styles.categoryTitle}>Back-End & Databases</h3>
            <div className={styles.skillCardWrapper}>
              <SkillCard items={skillcard_Backend} itemHeight={70} />
            </div>
          </div>

          <div className={styles.skillCategory}>
            <h3 className={styles.categoryTitle}>Tools & Methodologies</h3>
            <div className={styles.skillCardWrapper}>
              <SkillCard items={skillcard_Tools} itemHeight={70} />
            </div>
          </div>
        </div>

        <div className={styles.languagesSection}>
          <h3 className={styles.categoryTitle}>Languages</h3>
          <div className={styles.languageTags}>
            <span className={styles.languageTag}>🇪🇸 Spanish (Native)</span>
            <span className={styles.languageTag}>🇬🇧 English (B2 - Professional)</span>
          </div>
        </div>
      </motion.div>
    </SectionCard>
  );
};

export default Skills;
