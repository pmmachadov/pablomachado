import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareNodes, faLink } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { blogPosts, darkTheme } from '@sections/Me';
import styles from '@styles/BlogPost.module.sass';
import React, { useState, useEffect } from 'react';

interface Props {
    slug: string;
}

const BlogPost = ({ slug }: Props) => {
    const router = useRouter();
    const post = blogPosts.find(p => p.slug === slug);
    const [copied, setCopied] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [canShare, setCanShare] = useState(false);

    const themeStyle = darkTheme;

    useEffect(() => {
        setShareUrl(window.location.href);
        setCanShare(typeof navigator !== 'undefined' && !!navigator.share);
    }, []);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    const shareTitle = post.title;

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: post.excerpt,
                    url: shareUrl,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }
    };

    const handleCopyLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };

    const renderContent = () => {
        try {
            const paragraphs = post.content.split('\n\n');

            return paragraphs.map((para, idx) => {
                const trimmed = para.trim();

                if (!trimmed) return null;

                // Check if it's a link list item
                if (trimmed.startsWith('- [')) {
                    const match = trimmed.match(/- \[(.+?)\]\((.+?)\)(.*)$/);
                    if (match) {
                        return (
                            <p key={idx} style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
                                • <a
                                    href={match[2]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: '#60a5fa',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {match[1]}
                                </a>
                                {match[3] && ` ${match[3]}`}
                            </p>
                        );
                    }
                }

                // Process inline formatting including links
                let processedText = trimmed
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/`(.+?)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace;">$1</code>')
                    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; text-decoration: underline; cursor: pointer;">$1</a>');

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

                    <div className={styles.shareContainer}>
                        <span className={styles.shareLabel}>Share:</span>
                        <div className={styles.shareButtons}>
                            {canShare && (
                                <button
                                    onClick={handleNativeShare}
                                    className={styles.shareButton}
                                    aria-label="Share article"
                                >
                                    <FontAwesomeIcon icon={faShareNodes} />
                                </button>
                            )}
                            <a
                                href={shareLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.shareButton}
                                aria-label="Share on Twitter"
                            >
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a
                                href={shareLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.shareButton}
                                aria-label="Share on LinkedIn"
                            >
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a
                                href={shareLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.shareButton}
                                aria-label="Share on Facebook"
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <button
                                onClick={handleCopyLink}
                                className={styles.shareButton}
                                aria-label="Copy link"
                            >
                                <FontAwesomeIcon icon={faLink} />
                                {copied && <span className={styles.copiedTooltip}>Copied!</span>}
                            </button>
                        </div>
                    </div>
                </header>

                <article className={styles.content}>
                    {renderContent()}
                </article>

                <div className={styles.shareContainer} style={{ marginTop: '3rem' }}>
                    <span className={styles.shareLabel}>Share this article:</span>
                    <div className={styles.shareButtons}>
                        {canShare && (
                            <button
                                onClick={handleNativeShare}
                                className={styles.shareButton}
                                aria-label="Share article"
                            >
                                <FontAwesomeIcon icon={faShareNodes} />
                            </button>
                        )}
                        <a
                            href={shareLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.shareButton}
                            aria-label="Share on Twitter"
                        >
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a
                            href={shareLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.shareButton}
                            aria-label="Share on LinkedIn"
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a
                            href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.shareButton}
                            aria-label="Share on Facebook"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <button
                            onClick={handleCopyLink}
                            className={styles.shareButton}
                            aria-label="Copy link"
                        >
                            <FontAwesomeIcon icon={faLink} />
                            {copied && <span className={styles.copiedTooltip}>Copied!</span>}
                        </button>
                    </div>
                </div>
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
