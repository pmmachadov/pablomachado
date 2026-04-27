import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import styles from "@styles/SkillsCarousel.module.sass";

interface SkillItem {
  text: string;
  icon?: React.ReactElement;
  category: "Frontend" | "Backend" | "Tools";
}

interface Props {
  skills: SkillItem[];
}

const SkillsCarousel: React.FC<Props> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();

  // Duplicate skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills, ...skills];

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: "-33.33%",
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "#6366f1";
      case "Backend":
        return "#10b981";
      case "Tools":
        return "#f59e0b";
      default:
        return "#6366f1";
    }
  };

  return (
    <div 
      className={styles.carouselContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlays for fade effect */}
      <div className={styles.gradientLeft} />
      <div className={styles.gradientRight} />

      <motion.div
        ref={containerRef}
        className={styles.carouselTrack}
        animate={controls}
        initial={{ x: 0 }}
      >
        {duplicatedSkills.map((skill, index) => (
          <motion.div
            key={`${skill.text}-${index}`}
            className={styles.skillCard}
            whileHover={{ 
              scale: 1.08, 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            style={{
              borderColor: `${getCategoryColor(skill.category)}40`,
            }}
          >
            {/* Glow effect on hover */}
            <div 
              className={styles.cardGlow}
              style={{
                background: `radial-gradient(circle at center, ${getCategoryColor(skill.category)}30, transparent 70%)`,
              }}
            />
            
            {/* Category indicator */}
            <div 
              className={styles.categoryIndicator}
              style={{ backgroundColor: getCategoryColor(skill.category) }}
            />

            {/* Icon */}
            <div className={styles.iconWrapper}>
              {skill.icon || (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              )}
            </div>

            {/* Text */}
            <span className={styles.skillText}>{skill.text}</span>

            {/* Category label */}
            <span 
              className={styles.categoryLabel}
              style={{ color: getCategoryColor(skill.category) }}
            >
              {skill.category}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Pause indicator */}
      <motion.div 
        className={styles.pauseIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
        <span>Pausado</span>
      </motion.div>
    </div>
  );
};

export default SkillsCarousel;
