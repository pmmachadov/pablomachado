import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Viewport */}
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {/* Preconnect for fonts */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                    {/* Theme color */}
                    <meta name="theme-color" content="#000000" />
                    {/* SEO meta tags */}
                    <meta property="og:title" content="Pablo Machado – Full Stack Developer" />
                    <meta property="og:description" content="Portfolio de Pablo Machado, especialista en desarrollo web full‑stack." />
                    <meta property="og:image" content="/assets/images/personalPhoto.jpg" />
                    <meta property="og:url" content="https://pablomachado.dev/" />
                    <meta property="og:type" content="website" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Pablo Machado – Full Stack Developer" />
                    <meta name="twitter:description" content="Portfolio de Pablo Machado, especialista en desarrollo web full‑stack." />
                    <meta name="twitter:image" content="/assets/images/personalPhoto.jpg" />
                    <link rel="canonical" href="https://pablomachado.dev/" />
                    {/* JSON‑LD Structured Data */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Person",
                                name: "Pablo Machado",
                                url: "https://pablomachado.dev/",
                                image: "https://pablomachado.dev/assets/images/personalPhoto.jpg",
                                sameAs: [
                                    "https://github.com/pmmachadov",
                                    "https://linkedin.com/in/pmmachadov"
                                ],
                                jobTitle: "Full Stack Developer",
                                description: "Desarrollador full‑stack especializado en React, Next.js y Node.js."
                            })
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
