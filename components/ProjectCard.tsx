import React, { useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "@styles/ProjectCard.module.sass";
import { ProjectCardType } from "types";

interface Props {
  project: ProjectCardType;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const cardRef = useRef<HTMLElement>(null);

  const liveLink = project.links.find(
    (l) =>
      l.name.toLowerCase().includes("live") ||
      l.name.toLowerCase().includes("project")
  );
  const codeLink = project.links.find(
    (l) =>
      l.name.toLowerCase().includes("code") ||
      l.name.toLowerCase().includes("github")
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={cardRef}
      className={styles.card}
      onPointerMove={handlePointerMove}
    >
      <div className={styles.cardGlow} />
      <div className={styles.spotlightBorder} />
      <div className={styles.spotlightSurface} />

      {/* Project Image Preview */}
      <div className={styles.imageContainer}>
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className={styles.image}
          />
        )}
        <div className={styles.imageOverlay} />

        {/* Tech tags */}
        {project.tags && project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
          {liveLink && (
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className={styles.titleArrow}
            />
          )}
        </div>

        {project.description && (
          <p className={styles.description}>{project.description}</p>
        )}

        {/* Action Links */}
        <div className={styles.actions}>
          {liveLink && (
            <a
              href={liveLink.path}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveBtn}
            >
              <span>Live Demo</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink.path}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.codeBtn}
            >
              <FontAwesomeIcon icon={faGithub} />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default React.memo(ProjectCard);
