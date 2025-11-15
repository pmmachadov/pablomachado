import React from "react";
import ProjectCard from "@components/ProjectCard";
import SectionCard from "@components/SectionCard";
import { projectData } from "@sections/Me";
import BgTitle from "@components/BgTitle";
import styles from "@styles/ProjectCard.module.sass";

const Projects = () => {
  // grid layout handled by CSS module `cardsGrid`

  const workTitleStyle = {
    marginTop: "-20rem",
  };

  return (
    <SectionCard id="projects" title="PROJECTS" page="WORK">
      <div className={styles.projectsWrapper}>
        <div className={styles.workTitle}>
          <BgTitle title="WORK" />
        </div>
        <div className={styles.cardsGrid}>
          {projectData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

export default Projects;
