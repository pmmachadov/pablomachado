import React, { ReactElement, useRef } from 'react';
import styles from '@styles/SectionCard.module.sass';
import PageCount from './PageCount';

interface Props {
  id: string;
  title?: string;
  children?: ReactElement;
  page?: string;
}

const SectionCard = ({ id, title, children, page }: Props) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id={id} title={id} className={styles.layoutContainer} ref={ref}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.layoutContent}>{children}</div>
      {page && <PageCount count={page} />}
    </section>
  );
};

export default SectionCard;
