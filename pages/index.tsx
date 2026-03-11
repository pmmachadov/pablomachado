import type { NextPage } from 'next';
import Head from 'next/head';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import ThemeContext, { ThemeOptions } from '@contexts/ThemeContext';
import NavLocationContext from '@contexts/NavLocationContext';
import { lightTheme, darkTheme, links } from '@sections/Me';

// components
import Intro from '@sections/Intro';
import Navbar from '@components/Navbar';
import Skills from '@sections/Skills';
import Projects from '@sections/Projects';
import Contact from '@sections/Contact';
import Footer from '@components/Footer';

// fonts
import '@fontsource/archivo-black';
import '@fontsource/ubuntu';

const Home: NextPage = () => {
  const [theme, setTheme] = useState<ThemeOptions>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as ThemeOptions | null;
      if (saved === ThemeOptions.Light || saved === ThemeOptions.Dark) return saved;
    }
    return ThemeOptions.Dark;
  });
  const [location, setLocation] = useState('');

  const handleSetTheme: Dispatch<SetStateAction<ThemeOptions>> = (action) => {
    const newTheme = typeof action === 'function' ? action(theme) : action;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const themeStyle = useMemo(() => {
    return theme === ThemeOptions.Dark ? darkTheme : lightTheme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, themeStyle }}>
      <NavLocationContext.Provider value={{ location, setLocation }}>
        <div style={themeStyle}>
          <Head>
            {/* change your meta information here */}
            <title>Pablo Machado - Full Stack Developer</title>
            <meta
              name='description'
              content='Portfolio of Pablo Machado, a Full Stack Web Developer specializing in modern web technologies.'
            />
            <link rel='icon' href='/favicon.ico' />
            <script
              src='https://cdnjs.cloudflare.com/ajax/libs/iamdustan-smoothscroll/0.4.0/smoothscroll.min.js'
              async
            ></script>
          </Head>
          <Navbar links={links} />

          <main>
            <Intro />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </div>
      </NavLocationContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Home;
