import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from '@styles/SocialBar.module.sass';
import ThemeContext from '@contexts/ThemeContext';

const SocialBar = () => {
  const { themeStyle } = useContext(ThemeContext);
  const isDark = themeStyle.backgroundColor === '#0f172a';

  return (
    <div 
      className={styles.socialBar}
      style={{
        background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.85)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
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
          background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.1)',
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
          background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.1)',
          color: themeStyle.color,
        }}
      >
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </a>
    </div>
  );
};

export default SocialBar;
