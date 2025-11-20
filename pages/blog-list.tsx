import React, { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts, darkTheme } from "@sections/Me";
import ThemeContext from "@contexts/ThemeContext";
import styles from "@styles/BlogList.module.sass";

const BlogListPage = () => {
    const { themeStyle } = useContext(ThemeContext);
    const theme = darkTheme; // Use dark theme to match main page

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div style={{ backgroundColor: theme.backgroundColor, minHeight: '100vh' }}>
            <div className={styles.container} style={{ color: theme.color }}>
                <div className={styles.header}>
                    <Link href="/" className={styles.backLink}>
                        ← Back to home
                    </Link>
                    <h1 className={styles.title}>All Articles</h1>
                    <p className={styles.subtitle}>Exploring technology, development, and the latest AI trends</p>
                </div>

                <motion.div
                    className={styles.blogGrid}
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {blogPosts.map((post) => (
                        <Link
                            href={`/blog/${post.slug}`}
                            key={post.slug}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.article
                                variants={item}
                                className={styles.blogCard}
                                style={{ color: theme.color }}
                            >
                                <span className={styles.blogDate}>{post.date}</span>
                                <h3 className={styles.blogTitle}>{post.title}</h3>
                                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                                <div className={styles.blogTags}>
                                    {post.tags.map(tag => (
                                        <span key={tag} className={styles.blogTag}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default BlogListPage;
