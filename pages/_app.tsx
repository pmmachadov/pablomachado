import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'], display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${inter.style.fontFamily};
          --font-display: ${spaceGrotesk.style.fontFamily};
          --font-mono: ${jetbrainsMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
