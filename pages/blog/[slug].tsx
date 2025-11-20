import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { blogPosts, darkTheme } from '@sections/Me';
import styles from '@styles/BlogPost.module.sass';
import React from 'react';

interface Props {
    slug: string;
}

const BlogPost = ({ slug }: Props) => {
    const router = useRouter();
    const post = blogPosts.find(p => p.slug === slug);

    const themeStyle = darkTheme;

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    // Simple content renderer
    const renderContent = () => {
        try {
            const paragraphs = post.content.split('\n\n');

            return paragraphs.map((para, idx) => {
                const trimmed = para.trim();

                if (!trimmed) return null;

                // Process inline formatting
                const processedText = trimmed
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/`(.+?)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 0.2em 0.4em; border-radius: 3px;">$1</code>');

                return (
                    <p
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: processedText }}
                        style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}
                    />
                );
            });
        } catch (error) {
            console.error('Error rendering content:', error);
            return <p>Error loading content</p>;
        }
    };

    return (
        <div style={{
            backgroundColor: themeStyle.backgroundColor,
            color: themeStyle.color,
            minHeight: '100vh',
            width: '100%',
            overflowX: 'hidden',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            position: 'relative',
            zIndex: 1
        }}>
            <Head>
                <title>{post.title} - Blog</title>
                <meta name="description" content={post.excerpt} />
            </Head>

            <Link href="/#blog" className={styles.backLink} style={{ color: themeStyle.color }}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Blog
            </Link>

            <main className={styles.container} style={{ position: 'relative', zIndex: 10 }}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.meta}>
                        <span>{post.date}</span>
                    </div>
                    <div className={styles.tags}>
                        {post.tags.map(tag => (
                            <span key={tag} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                </header>

                <article className={styles.content}>
                    {renderContent()}
                </article>
            </main>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = blogPosts.map(post => ({
        params: { slug: post.slug },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            slug,
        },
    };
};

export default BlogPost;
