import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "@styles/SocialBar.module.sass";

const SocialBar = () => {
  return (
    <aside className={styles.dock} aria-label="Social media links">
      <a
        href="https://github.com/pmmachadov"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className={styles.link}
        title="GitHub"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        href="https://www.linkedin.com/in/pmmachadov/?locale=en_US"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className={styles.link}
        title="LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
    </aside>
  );
};

export default SocialBar;
