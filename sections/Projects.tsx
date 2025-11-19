import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "@components/ProjectCard";
import SectionCard from "@components/SectionCard";
import { projectData } from "@sections/Me";
import BgTitle from "@components/BgTitle";
import styles from "@styles/ProjectCard.module.sass";

const Projects = () => {
  // grid layout handled by CSS module `cardsGrid`

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <SectionCard id="projects" title="PROJECTS" page="WORK">
      <div className={styles.projectsWrapper}>
        <div className={styles.workTitle}>
          <BgTitle title="WORK" />
        </div>
        <motion.div
          className={styles.cardsGrid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {projectData.map((project) => (
            <motion.div key={project.title} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionCard>
  );
};

export default Projects;
