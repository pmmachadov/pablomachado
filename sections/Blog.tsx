import React, { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionCard from "@components/SectionCard";
import BgTitle from "@components/BgTitle";
import { blogPosts } from "@sections/Me";
import ThemeContext from "@contexts/ThemeContext";
import styles from "@styles/Blog.module.sass";

const Blog = () => {
    const { themeStyle } = useContext(ThemeContext);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <SectionCard id="blog" title="BLOG" page="BLOG">
            <div className={styles.blogWrapper}>
                <BgTitle title="BLOG" />

                <motion.div
                    className={styles.blogGrid}
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {blogPosts.slice(0, 3).map((post) => (
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
                                style={{ color: themeStyle.color }}
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

                <Link href="/blog-list" className={styles.viewAllLink}>
                    <motion.button
                        className={styles.viewAllButton}
                    >
                        See all articles →
                    </motion.button>
                </Link>
            </div>
        </SectionCard>
    );
};

export default Blog;
