import React from 'react';
import { motion } from 'framer-motion';
import SectionCard from '@components/SectionCard';
import styles from '@styles/Intro.module.sass';
import BgTitle from '@components/BgTitle';
import PersonalImage from '@components/PersonalImage';

const Intro = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <SectionCard id="intro" title="ABOUT" page="ABOUT">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <BgTitle title="ABOUT" />
        <div className={styles.introContainer}>
          <motion.div variants={itemVariants}>
            <PersonalImage
              src="/assets/images/personalPhoto.jpg"
              alt="Pablo Machado"
              className={styles.myPhoto}
            />
          </motion.div>

          <motion.div variants={itemVariants} className={styles.textContent}>
            <h1 className={styles.myName} style={{ fontFamily: 'Archivo Black, sans-serif' }}>
              PABLO MACHADO
            </h1>
            <p className={styles.jobTitle}>
              Frontend Web Developer
            </p>
            <p className={styles.stack}>
              React · TypeScript · Node.js
            </p>
            <p className={styles.availability}>
              📍 Based in Spain &nbsp;|&nbsp; 🌐 Open to remote international roles in English
            </p>
            <p className={styles.profileSummary}>
              Front End Web Developer with experience in <b>React</b>, <b>JavaScript/TypeScript</b>, <b>Node.js</b>, and <b>MongoDB</b>. 
              Additional background in <b>IT support</b> and <b>AI project support</b>. 
              Previously provided technical support and customer service in <b>English</b> for the U.S. market.
            </p>
            <p className={styles.ctaText}>
              Did I pique your interest? Let&apos;s{' '}
              <a href="#contact" className={styles.chatLink}>
                <span className={styles.chatLinkText}>chat </span>💬
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </SectionCard>
  );
};

export default Intro;
