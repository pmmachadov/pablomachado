import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from '@styles/SectionCard.module.sass';

interface Props {
  id: string;
  /** Small label above the title, e.g. "02 — Skills" */
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const SectionCard = ({ id, eyebrow, title, subtitle, children, className }: Props) => {
  return (
    <section id={id} className={`${styles.section} ${className ?? ''}`}>
      <div className="container">
        {(eyebrow || title) && (
          <motion.header
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow && (
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowLine} />
                {eyebrow}
              </span>
            )}
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionCard;
