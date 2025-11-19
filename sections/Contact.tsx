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
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Validation
    const newErrors = { name: '', email: '', message: '' };
    let hasError = false;

    if (!name) {
      newErrors.name = 'Please enter your name';
      hasError = true;
    }
    if (!email) {
      newErrors.email = 'Please enter your email address';
      hasError = true;
    }
    if (!message) {
      newErrors.message = 'Please enter a message';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }
    setErrors({ name: '', email: '', message: '' });

    setFormStatus('submitting');
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

          <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" className={styles.srOnly}>Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                className={styles.appleInput}
                style={{
                  background: themeStyle.color === '#e0e7ff' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  color: themeStyle.color,
                  borderColor: errors.name ? '#ef4444' : ''
                }}
              />
              {errors.name && <span style={{ color: '#ef4444', fontSize: '0.85rem', marginLeft: '4px' }}>{errors.name}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" className={styles.srOnly}>Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                className={styles.appleInput}
                style={{
                  background: themeStyle.color === '#e0e7ff' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  color: themeStyle.color,
                  borderColor: errors.email ? '#ef4444' : ''
                }}
              />
              {errors.email && <span style={{ color: '#ef4444', fontSize: '0.85rem', marginLeft: '4px' }}>{errors.email}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="message" className={styles.srOnly}>Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows={5}
                className={styles.appleInput}
                style={{
                  resize: 'vertical',
                  background: themeStyle.color === '#e0e7ff' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  color: themeStyle.color,
                  borderColor: errors.message ? '#ef4444' : ''
                }}
              />
              {errors.message && <span style={{ color: '#ef4444', fontSize: '0.85rem', marginLeft: '4px' }}>{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={formStatus === 'submitting' || formStatus === 'success'}
              className={styles.appleButton}
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
