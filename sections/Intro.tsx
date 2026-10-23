import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faReact, faNodeJs, faJs } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRight,
  faArrowDown,
  faLocationDot,
  faGlobe,
  faHeadset,
  faBrain,
  faFileArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import styles from '@styles/Intro.module.sass';

const ROTATING_WORDS = ['web apps', 'interfaces', 'dev tools', 'experiences'];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const Intro = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="intro" className={styles.intro}>
      {/* ---------- HERO ---------- */}
      <div className={`container ${styles.hero}`}>
        <motion.div className={styles.heroText} variants={container} initial="hidden" animate="visible">
          <motion.a href="#contact" className={styles.badge} variants={item}>
            <span className={styles.pulse} />
            Available for remote roles
            <FontAwesomeIcon icon={faArrowRight} className={styles.badgeArrow} />
          </motion.a>

          <motion.p className={styles.hello} variants={item}>
            Hi, I&apos;m
          </motion.p>

          <motion.h1 className={styles.name} variants={item}>
            Pablo <span className={styles.nameAccent}>Machado</span>
          </motion.h1>

          <motion.p className={styles.role} variants={item}>
            Frontend Web Developer crafting{' '}
            <span className={styles.rotator}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[wordIndex]}
                  className={styles.rotatorWord}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            with <b>React</b>, <b>TypeScript</b> &amp; <b>Node.js</b>.
          </motion.p>

          <motion.div className={styles.actions} variants={item}>
            <a href="#projects" className={styles.primaryBtn}>
              <span>View my work</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
            <a href="/cv-pablo-machado.pdf" download className={styles.secondaryBtn}>
              <FontAwesomeIcon icon={faFileArrowDown} />
              <span>Download CV</span>
            </a>
          </motion.div>

          <motion.div className={styles.socials} variants={item}>
            <a
              href="https://github.com/pmmachadov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-social-links="github"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/pmmachadov/?locale=en_US"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-social-links="linkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <span className={styles.socialsDivider} />
            <span className={styles.location}>
              <FontAwesomeIcon icon={faLocationDot} /> Barcelona, Spain
            </span>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          className={styles.portraitWrap}
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <div className={styles.portraitRing} />
          <div className={styles.portrait}>
            <Image
              src="/assets/images/personalPhoto.jpg"
              alt="Portrait of Pablo Machado"
              fill
              priority
              sizes="(max-width: 768px) 260px, 360px"
              style={{ objectFit: 'cover', transform: 'scale(1.35)' }}
            />
          </div>

          {/* Orbiting Tech Badges */}
          <div className={styles.orbitTrack} aria-label="Tecnologías destacadas">
            <div className={`${styles.orbitItem} ${styles.orbitPos1}`}>
              <div className={`${styles.bobWrapper} ${styles.bob1}`}>
                <div className={`${styles.floatChip} ${styles.chipReact}`}>
                  <FontAwesomeIcon icon={faReact} /> React
                </div>
              </div>
            </div>
            <div className={`${styles.orbitItem} ${styles.orbitPos2}`}>
              <div className={`${styles.bobWrapper} ${styles.bob2}`}>
                <div className={`${styles.floatChip} ${styles.chipJs}`}>
                  <FontAwesomeIcon icon={faJs} /> JavaScript
                </div>
              </div>
            </div>
            <div className={`${styles.orbitItem} ${styles.orbitPos3}`}>
              <div className={`${styles.bobWrapper} ${styles.bob3}`}>
                <div className={`${styles.floatChip} ${styles.chipNode}`}>
                  <FontAwesomeIcon icon={faNodeJs} /> Node.js
                </div>
              </div>
            </div>
            <div className={`${styles.orbitItem} ${styles.orbitPos4}`}>
              <div className={`${styles.bobWrapper} ${styles.bob4}`}>
                <div className={`${styles.floatChip} ${styles.chipTs}`}>
                  <span className={styles.tsMark}>TS</span> TypeScript
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          className={styles.scrollHint}
          aria-label="Scroll to about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span>Scroll</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </motion.a>
      </div>

      {/* ---------- ABOUT / BENTO ---------- */}
      <div id="about" className={`container ${styles.about}`}>
        <motion.div
          className={styles.bento}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={container}
        >
          <motion.article className={`${styles.card} ${styles.cardSummary}`} variants={item}>
            <span className={styles.cardEyebrow}>
              <span className={styles.eyebrowLine} />
              01 — About me
            </span>
            <h2 className={styles.cardTitle}>
              I turn ideas into <em>clean, fast</em> and <em>accessible</em> products.
            </h2>
            <p>
              Front End Web Developer with experience in <b>React</b>, <b>JavaScript/TypeScript</b>,{' '}
              <b>Node.js</b>, and <b>MongoDB</b>. Additional background in <b>IT support</b> and{' '}
              <b>AI project support</b>. Previously provided technical support and customer service in{' '}
              <b>English</b> for the U.S. market.
            </p>
            <a href="#contact" className={styles.inlineLink}>
              Did I pique your interest? Let&apos;s chat <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </motion.article>

          <motion.article className={`${styles.card} ${styles.cardLocation}`} variants={item}>
            <div className={styles.globe} aria-hidden="true">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <span className={styles.cardLabel}>Location</span>
            <h3>Barcelona, Spain</h3>
            <p>Open to remote, international roles in English.</p>
          </motion.article>

          <motion.article className={`${styles.card} ${styles.cardStatus}`} variants={item}>
            <span className={styles.statusRow}>
              <span className={styles.pulse} /> Currently
            </span>
            <h3>Open to work</h3>
            <p>Frontend &amp; full-stack roles, freelance and technical interviews.</p>
          </motion.article>

          <motion.article className={`${styles.card} ${styles.cardSmall}`} variants={item}>
            <span className={styles.iconBubble}>
              <FontAwesomeIcon icon={faHeadset} />
            </span>
            <div>
              <h3>IT Support</h3>
              <p>Customer-facing technical support for the U.S. market.</p>
            </div>
          </motion.article>

          <motion.article className={`${styles.card} ${styles.cardSmall}`} variants={item}>
            <span className={`${styles.iconBubble} ${styles.iconBubblePink}`}>
              <FontAwesomeIcon icon={faBrain} />
            </span>
            <div>
              <h3>AI Projects</h3>
              <p>Hands-on experience supporting AI projects.</p>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
