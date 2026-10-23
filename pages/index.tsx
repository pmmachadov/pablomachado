import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import ThemeContext, { darkTheme } from '@contexts/ThemeContext';
import NavLocationContext from '@contexts/NavLocationContext';
import { links } from '@sections/Me';

// components
import Background from '@components/Background';
import Navbar from '@components/Navbar';
import SocialBar from '@components/SocialBar';
import Intro from '@sections/Intro';
import Skills from '@sections/Skills';
import Projects from '@sections/Projects';
import Contact from '@sections/Contact';
import Footer from '@components/Footer';

const Home: NextPage = () => {
  const [location, setLocation] = useState('');

  return (
    <ThemeContext.Provider value={{ themeStyle: darkTheme }}>
      <NavLocationContext.Provider value={{ location, setLocation }}>
        <Head>
          {/* SEO - Optimized for recruiters and search engines */}
          <title>Pablo Machado | Frontend &amp; Full Stack Developer | React, TypeScript &amp; Node.js</title>
          <meta
            name="description"
            content="Frontend & Full Stack Web Developer specializing in React, TypeScript, Node.js, and modern web architectures. Open to remote opportunities."
          />
          <meta
            name="keywords"
            content="Pablo Machado, Full Stack Developer, Frontend Developer, React, TypeScript, Node.js, JavaScript, Next.js, Web Developer, Barcelona, Remote Developer"
          />
          <meta name="author" content="Pablo Machado" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pablomachado.dev" />
          <meta property="og:title" content="Pablo Machado | Frontend &amp; Full Stack Developer" />
          <meta
            property="og:description"
            content="Frontend & Full Stack Web Developer specializing in React, TypeScript, and Node.js. Open to remote roles."
          />
          <meta property="og:image" content="https://pablomachado.dev/assets/images/personalPhoto.jpg" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Pablo Machado | Frontend &amp; Full Stack Developer" />
          <meta
            name="twitter:description"
            content="React · TypeScript · Node.js · Open to remote opportunities worldwide"
          />
          <meta name="twitter:image" content="https://pablomachado.dev/assets/images/personalPhoto.jpg" />

          {/* Location */}
          <meta name="geo.region" content="ES-CT" />
          <meta name="geo.placename" content="Barcelona, Spain" />

          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href="https://pablomachado.dev" />
        </Head>

        {/* Ambient background lighting, cursor spotlight and subtle grid */}
        <Background />

        {/* Floating pill navigation */}
        <Navbar links={links} />

        {/* Vertical social dock */}
        <SocialBar />

        {/* Main Sections */}
        <main>
          <Intro />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </NavLocationContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Home;
