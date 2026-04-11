import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from '@styles/SocialBar.module.sass';
import ThemeContext from '@contexts/ThemeContext';

const SocialBar = () => {
  const { themeStyle } = useContext(ThemeContext);

  return (
    <div 
      className={styles.socialBar}
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <a
        href="https://github.com/pmmachadov"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={styles.socialLink}
        title="GitHub"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'rgba(255, 255, 255, 0.06)',
          color: themeStyle.color,
        }}
      >
        <FontAwesomeIcon icon={faGithub} size="lg" />
      </a>
      <a
        href="https://www.linkedin.com/in/pmmachadov/?locale=en_US"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={styles.socialLink}
        title="LinkedIn"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'rgba(255, 255, 255, 0.06)',
          color: themeStyle.color,
        }}
      >
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </a>
    </div>
  );
};

export default SocialBar;
