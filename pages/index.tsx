import type { NextPage } from 'next';
import Head from 'next/head';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import ThemeContext, { ThemeOptions } from '@contexts/ThemeContext';
import NavLocationContext from '@contexts/NavLocationContext';
import { lightTheme, darkTheme, links } from '@sections/Me';

// components
import Intro from '@sections/Intro';
import Navbar from '@components/Navbar';
import SocialBar from '@components/SocialBar';
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
            {/* SEO - Optimized for recruiters and search engines */}
            <title>Pablo Machado | Full Stack Web Developer | React & Node.js | Barcelona</title>
            <meta
              name='description'
              content='Full Stack Web Developer with experience in React, TypeScript, Node.js, and MongoDB. Background in IT support and AI project support. Based in Barcelona, open to remote roles.'
            />
            <meta name='keywords' content='Full Stack Developer, Frontend Developer, React, TypeScript, Node.js, JavaScript, Barcelona, Remote, Web Developer, IT Support, AI Projects' />
            <meta name='author' content='Pablo Machado' />
            <meta name='robots' content='index, follow' />
            
            {/* Open Graph for LinkedIn, Twitter, etc. */}
            <meta property='og:type' content='website' />
            <meta property='og:url' content='https://pablomachado.dev' />
            <meta property='og:title' content='Pablo Machado | Full Stack Web Developer' />
            <meta property='og:description' content='Full Stack Developer with experience in React, TypeScript, Node.js. Open to remote opportunities.' />
            <meta property='og:image' content='https://pablomachado.dev/assets/images/personalPhoto.jpg' />
            
            {/* Twitter Card */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content='Pablo Machado | Full Stack Web Developer' />
            <meta name='twitter:description' content='React · TypeScript · Node.js · Open to remote roles' />
            <meta name='twitter:image' content='https://pablomachado.dev/assets/images/personalPhoto.jpg' />
            
            {/* Contact & Location for search engines */}
            <meta name='geo.region' content='ES-CT' />
            <meta name='geo.placename' content='Barcelona' />
            
            <link rel='icon' href='/favicon.ico' />
            <link rel='canonical' href='https://pablomachado.dev' />
            
            <script
              src='https://cdnjs.cloudflare.com/ajax/libs/iamdustan-smoothscroll/0.4.0/smoothscroll.min.js'
              async
            ></script>
          </Head>
          <Navbar links={links} />
          <SocialBar />

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
