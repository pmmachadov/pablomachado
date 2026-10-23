import React, { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from '@styles/Navbar.module.sass';
import useActiveSection from '@hooks/useActiveSection';
import { NavLinkType } from 'types';

interface Props {
  links: NavLinkType[];
}

// Human-friendly labels for the nav (keys match `name` in sections/Me.tsx)
const LABELS: Record<string, string> = {
  intro: 'About',
  software: 'Skills',
  projects: 'Work',
  contact: 'Contact',
};

const Navbar = ({ links }: Props) => {
  const ids = useMemo(() => links.map((l) => l.path.replace('#', '')), [links]);
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.header}>
      <motion.div className={styles.progress} style={{ scaleX: progress }} />
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
      >
        <a href="#intro" className={styles.logo} aria-label="Pablo Machado — back to top">
          <span className={styles.logoMark}>PM</span>
          <span className={styles.logoText}>pablomachado<span>.dev</span></span>
        </a>

        <ul className={styles.links}>
          {links.map((l) => {
            const id = l.path.replace('#', '');
            const isActive = active === id;
            return (
              <li key={l.name}>
                <a
                  href={l.path}
                  aria-label={l.name}
                  aria-current={isActive ? 'true' : undefined}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                  data-navitem={l.name}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className={styles.pill}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={styles.linkIcon}>{l.icon}</span>
                  <span className={styles.linkLabel}>{LABELS[l.name] ?? l.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <a href="/cv-pablo-machado.pdf" download className={styles.cta}>
          <span className={styles.ctaDot} />
          Resume
        </a>
      </motion.nav>
    </header>
  );
};

export default Navbar;
