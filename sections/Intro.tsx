import React from 'react';
import { motion } from 'framer-motion';
import SectionCard from '@components/SectionCard';
import styles from '@styles/Intro.module.sass';
import BgTitle from '@components/BgTitle';
import PersonalImage from '@components/PersonalImage';


const Intro = () => {
  function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const contact = document.getElementById('contact');
    contact?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    // change your title and section id
    <SectionCard id='intro' title='ABOUT' page='ABOUT'>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <BgTitle title='ABOUT' />
        <div>
          <motion.div variants={itemVariants}>
            <PersonalImage
              src='/assets/images/personalPhoto.jpg'
              alt='Pablo Machado'
              className={styles.myPhoto} />
          </motion.div>

          <motion.p variants={itemVariants}>
            <span
              className={styles.myName}
              style={{ fontFamily: 'Archivo Black, sans-serif' }}>
              PABLO MACHADO
            </span> Professional in the digital sector within the
            <br /><b>Full Stack Web Development</b>. <br /> My skills include: Attention to detail and quality. Planning and organization. Learning and application of knowledge.
            Did I just pique your interest? Let&apos;s{' '}
            <a onClick={scrollToContact}>
              <b style={{ textDecoration: 'underline', cursor: 'pointer' }}>chat </b>💬
            </a>{' '}
          </motion.p>
        </div>
      </motion.div>
    </SectionCard>
  );
};

export default Intro;
