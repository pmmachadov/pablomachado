import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/ClipCopy.module.sass";

interface Props {
  copy: string;
  theme?: unknown;
}

const ClipCopy: React.FC<Props> = ({ copy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={handleCopy}
        className={styles.container}
        title="Click to copy email address"
      >
        <div className={styles.emailContent}>
          <span className={styles.label}>Direct Email</span>
          <span className={styles.email}>{copy}</span>
        </div>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
        </span>
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            className={styles.copiedBadge}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            Copied to clipboard! ✓
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClipCopy;
