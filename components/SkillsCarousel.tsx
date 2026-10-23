import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import styles from "@styles/SkillsCarousel.module.sass";

export interface SkillItem {
  text: string;
  icon?: React.ReactElement;
  category: "Frontend" | "Backend" | "Tools";
}

interface Props {
  skills: SkillItem[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#818cf8",
  Backend: "#34d399",
  Tools: "#fbbf24",
};

const SkillsCarousel: React.FC<Props> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  // Duplicate for seamless infinite loop
  const duplicated = [...skills, ...skills, ...skills];

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: "-33.333%",
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  return (
    <div
      ref={containerRef}
      className={styles.carouselContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={styles.carouselTrack}
        animate={controls}
        initial={{ x: 0 }}
      >
        {duplicated.map((skill, index) => {
          const color = CATEGORY_COLORS[skill.category] || "#818cf8";
          return (
            <div key={`${skill.text}-${index}`} className={styles.skillCard}>
              <span
                className={styles.categoryDot}
                style={{ backgroundColor: color, color }}
              />
              <span className={styles.iconWrapper}>{skill.icon}</span>
              <span className={styles.skillText}>{skill.text}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SkillsCarousel;
