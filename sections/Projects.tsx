import React from "react";
import ProjectCard from "@components/ProjectCard";
import SectionCard from "@components/SectionCard";
import { projectData } from "@sections/Me";
import BgTitle from "@components/BgTitle";
import containerStyle from "@styles/ProjectCard.module.sass";

const Projects = () => {
  const gridStyle = {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    alignItems: "stretch",
    margin: "2rem 0",
  };

  const workTitleStyle = {
    marginTop: "-20rem",
  };

  return (
    <SectionCard id="projects" title="PROJECTS" page="WORK">
      <div style={containerStyle}>
        <div style={workTitleStyle}>
          <BgTitle title="WORK" />
        </div>{" "}
        <div style={gridStyle}>
          {projectData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

export default Projects;
