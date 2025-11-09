import React from "react";

import styles from "@styles/ProjectCard.module.sass";
import Image from "next/image";

interface Props {
  project: {
    title: string;
    image: string;
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
              layout="responsive"
              width={400}
              height={200}
              objectFit="contain"
              alt={`Image of ${project.title}`}
            />
          </div>
        )}
        <div className={styles.projectCardDetails}>
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
