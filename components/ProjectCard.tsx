import React from "react";

import styles from "@styles/ProjectCard.module.sass";
import Image from "next/image";

interface Props {
  project: {
    title: string;
    image: string;
    description?: string;
    links: {
      name: string;
      path: string;
      icon?: React.ReactNode;
      style?: React.CSSProperties;
    }[];
  };
}

const ProjectCard = ({ project }: Props) => {
  return (
    <article className={styles.projectCardContainer}>
      <h2 className={styles.projectCardTitle}>{project.title.toUpperCase()}</h2>
      <div className={styles.projectCard}>
        {project.image && (
          <div className={styles.projectImage}>
            <Image
              src={project.image}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              alt={`Image of ${project.title}`}
            />
          </div>
        )}
        <div className={styles.projectCardDetails}>
            {project.description && (
              <p className={styles.projectDescription}>{project.description}</p>
            )}
            <div className={styles.projectCardLinkContainer}>
            {" "}
            {project.links.map(
              (
                link: {
                  name: string;
                  path: string;
                  icon?: React.ReactNode;
                  style?: React.CSSProperties;
                },
                index: number
              ) => (
                <a
                  key={link.name + index}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectCardLink}
                  style={link.style}
                >
                  {link.icon}
                  {link.name}
                </a>
              )
            )}
            </div>
          </div>
      </div>
    </article>
  );
};

export default React.memo(ProjectCard);
