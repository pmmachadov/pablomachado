import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "@components/ProjectCard";
import SectionCard from "@components/SectionCard";
import { projectData } from "@sections/Me";
import styles from "@styles/ProjectCard.module.sass";

const Projects = () => {
  return (
    <SectionCard
      id="projects"
      eyebrow="03 — Portfolio"
      title={
        <>
          Featured <em>Work</em> &amp; Experiments
        </>
      }
      subtitle="Full-stack and frontend applications built to solve real workflows, featuring complex state management, data structures, and intuitive UIs."
    >
      <div className={styles.projectsGrid}>
        {projectData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{
              duration: 0.5,
              delay: (index % 3) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </SectionCard>
  );
};

export default Projects;
