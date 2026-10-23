import React, { useState } from "react";
import SectionCard from "@components/SectionCard";
import ClipCopy from "@components/ClipCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faPaperPlane, faCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import styles from "@styles/Contact.module.sass";

const Contact = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    // Validation
    const newErrors = { name: "", email: "", message: "" };
    let hasError = false;

    if (!name) {
      newErrors.name = "Please enter your name";
      hasError = true;
    }
    if (!email) {
      newErrors.email = "Please enter your email address";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }
    if (!message) {
      newErrors.message = "Please enter a message";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }
    setErrors({ name: "", email: "", message: "" });

    setFormStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/mdkbggjw", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
        setTimeout(() => setFormStatus("idle"), 4000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <SectionCard
      id="contact"
      eyebrow="04 — Get in touch"
      title={
        <>
          Let&apos;s build something <em>together</em>.
        </>
      }
      subtitle="Have an open role, freelance project, or just want to chat tech? Reach out and I will get back to you promptly."
    >
      <div className={styles.contactGrid}>
        {/* Left Column: Direct Info & Social */}
        <div className={styles.infoColumn}>
          <div className={styles.statusPill}>
            <span className={styles.pulseDot} />
            Available for remote roles &amp; contracts
          </div>

          <p className={styles.infoText}>
            I&apos;m currently open to <b>Frontend and Full-Stack opportunities</b>. Based in Spain, working seamlessly across international time zones with fluent English and Spanish.
          </p>

          <div className={styles.actionsGroup}>
            <ClipCopy copy="pmmachadov@gmail.com" />

            <a
              href="/cv-pablo-machado.pdf"
              download
              className={styles.cvButton}
              title="Download Curriculum Vitae"
            >
              <FontAwesomeIcon icon={faFileArrowDown} />
              <span>Download CV (PDF)</span>
            </a>
          </div>

          <div className={styles.socialGroup}>
            <span className={styles.socialLabel}>Professional Profiles</span>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/pmmachadov"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                data-social-links="github"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/pmmachadov/?locale=en_US"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                data-social-links="linkedIn"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Jane Doe"
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="jane@example.com"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your team, project, or timeline..."
                className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={formStatus === "submitting" || formStatus === "success"}
              className={`${styles.submitBtn} ${
                formStatus === "success"
                  ? styles.submitSuccess
                  : formStatus === "error"
                  ? styles.submitError
                  : ""
              }`}
            >
              {formStatus === "submitting" ? (
                <span>Sending message...</span>
              ) : formStatus === "success" ? (
                <>
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Message sent successfully!</span>
                </>
              ) : formStatus === "error" ? (
                <>
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  <span>Error sending. Please try again or email directly</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </SectionCard>
  );
};

export default Contact;
