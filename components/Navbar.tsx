import React, { useContext } from 'react';
// import NavDotTracker from '@components/NavDotTracker';
// styles
import styles from '@styles/Navbar.module.sass';
// contexts
import ThemeContext from '../contexts/ThemeContext';
// import NavLocationContext from '../contexts/NavLocationContext';
// types
import { NavLinkType } from 'types';

interface Props {
  links: NavLinkType[];
}

const Navbar = ({ links }: Props) => {
  const { themeStyle } = useContext(ThemeContext);
  // const { location } = useContext(NavLocationContext);

  return (
    <header>
      <nav className={styles.navbar} style={themeStyle}>
        {/* Navigation Links - Left side */}
        <div className={styles.navLeft}>
          {links.map((l) => {
            return (
              <span className={styles.linkContainer} key={l.name}>
                {/* <NavDotTracker
                  visible={l.path === `#${location}`}
                  color={themeStyle.color}
                  aria-hidden={true}
                /> */}
                <a
                  href={l.path}
                  aria-label={l.name}
                  className={styles.link}
                  data-navitem={l.name}
                >
                  {l.icon}
                </a>
              </span>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
