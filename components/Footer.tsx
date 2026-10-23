import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/Footer.module.sass";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.content}`}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Pablo Machado</span>
          <span className={styles.copyright}>
            © {currentYear} Pablo Machado. All rights reserved.
          </span>
        </div>


        <button
          type="button"
          onClick={scrollToTop}
          className={styles.backToTop}
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
