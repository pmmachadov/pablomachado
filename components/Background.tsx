import React, { useEffect, useRef } from 'react';
import styles from '@styles/Background.module.sass';

/**
 * Fixed, decorative page background:
 * animated aurora blobs + fading grid + film grain + cursor spotlight.
 */
const Background = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--x', `${e.clientX}px`);
        el.style.setProperty('--y', `${e.clientY}px`);
        el.style.opacity = '1';
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div className={styles.background} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blobViolet}`} />
      <div className={`${styles.blob} ${styles.blobCyan}`} />
      <div className={`${styles.blob} ${styles.blobPink}`} />
      <div className={styles.grid} />
      <div className={styles.spotlight} ref={spotlightRef} />
      <div className={styles.noise} />
    </div>
  );
};

export default Background;
