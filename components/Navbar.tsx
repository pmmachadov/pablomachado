import React, { useContext } from 'react';
// import NavDotTracker from '@components/NavDotTracker';
import SwitchBtn from '@components/SwitchBtn';
// styles
import styles from '@styles/Navbar.module.sass';
// contexts
import ThemeContext, { ThemeOptions } from '../contexts/ThemeContext';
// import NavLocationContext from '../contexts/NavLocationContext';
// types
import { NavLinkType } from 'types';

interface Props {
  links: NavLinkType[];
}

const Navbar = ({ links }: Props) => {
  const { setTheme, themeStyle } = useContext(ThemeContext);
  // const { location } = useContext(NavLocationContext);

  const handleChange = (checked: boolean) => {
    setTheme(checked ? ThemeOptions.Light : ThemeOptions.Dark);
  };



  return (
    <header>
      <nav className={styles.navbar} style={themeStyle}>
        {links.map((l, i) => {
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
        <SwitchBtn onChange={handleChange} color={themeStyle.color} />
      </nav>
    </header>
  );
};

export default Navbar;
