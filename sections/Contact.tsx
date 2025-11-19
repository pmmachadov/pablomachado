import React, { useContext, useState } from 'react';
import SectionCard from '@components/SectionCard';
import ThemeContext from '@contexts/ThemeContext';
import { socialLinks } from '@sections/Me';
import ClipCopy from '@components/ClipCopy';
// styles
import styles from '@styles/Contact.module.sass';
import BgTitle from '@components/BgTitle';

const Contact = () => {
  const { themeStyle } = useContext(ThemeContext);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mdkbggjw", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        // Reset status after 3 seconds so user can send another if needed
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    // change your title and section id
    <SectionCard id='contact' title='CONTACT' page='CONTACT'>
      <>
        <BgTitle title='CONTACT' />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p className={styles.articleDescription}>
              {/* change your contact description */}
              Looking for an awesome <b>Full-Stack Developer</b>?<br></br> I&apos;m{' '}
              <b>available</b> and looking to mingle! Hit me up and let&apos;s see
              if we&apos;re a match.
            </p>
            <ClipCopy copy='pmmachadov@gmail.com' theme={themeStyle} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: 'none',
                background: themeStyle.color === '#e0e7ff' ? '#1e293b' : '#e2e8f0',
                color: themeStyle.color,
                fontFamily: 'inherit'
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: 'none',
                background: themeStyle.color === '#e0e7ff' ? '#1e293b' : '#e2e8f0',
                color: themeStyle.color,
                fontFamily: 'inherit'
              }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: 'none',
                background: themeStyle.color === '#e0e7ff' ? '#1e293b' : '#e2e8f0',
                color: themeStyle.color,
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <button
              type="submit"
              disabled={formStatus === 'submitting' || formStatus === 'success'}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: 'none',
                background: '#3b82f6',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                opacity: formStatus === 'submitting' ? 0.7 : 1
              }}
            >
              {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? 'Message Sent!' : formStatus === 'error' ? 'Error! Try Again' : 'Send Message'}
            </button>
          </form>
        </div>

        <p className={styles.socialLinksTitle}>Connect with me</p>
        <section className={styles.socialLinksContainer}>
          {/* add your social information in the projectData.tsx file */}
          {socialLinks.map((s, i) => {
            return (
              <a
                key={i}
                href={s.link}
                aria-label={`navigate to ${s.link}`}
                className={styles.link}
                data-social-links={s.title}
                target={s.target}
                rel={s.rel}
              >
                {s.icon}
              </a>
            );
          })}
        </section>
      </>
    </SectionCard>
  );
};

export default Contact;
