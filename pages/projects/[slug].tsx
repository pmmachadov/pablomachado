import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { projectData, darkTheme } from '@sections/Me';
import styles from '@styles/ProjectDetail.module.sass';

interface Props {
    slug: string;
}

const ProjectDetail = ({ slug }: Props) => {
    const router = useRouter();

    // Find the project based on the slug passed from getStaticProps
    // This avoids serializing React elements (icons) in getStaticProps
    const project = projectData.find(p => p.slug === slug);

    const themeStyle = darkTheme;

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div style={{ backgroundColor: themeStyle.backgroundColor, color: themeStyle.color, minHeight: '100vh' }}>
            <Head>
                <title>{project.title} - Case Study</title>
                <meta name="description" content={project.description} />
            </Head>

            <Link href="/#projects" className={styles.backLink} style={{ color: themeStyle.color }}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Projects
            </Link>

            <main className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{project.title}</h1>
                    {project.technologies && (
                        <div className={styles.tags}>
                            {project.technologies.map(tech => (
                                <span key={tech} className={styles.tag}>{tech}</span>
                            ))}
                        </div>
                    )}
                </header>

                <div className={styles.imageContainer}>
                    {/* Using standard img tag to avoid build-time optimization issues with dynamic paths */}
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Overview</h2>
                        <p className={styles.text}>{project.longDescription || project.description}</p>
                    </section>

                    {project.challenges && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>The Challenge</h2>
                            <p className={styles.text}>{project.challenges}</p>
                        </section>
                    )}

                    {project.solutions && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>The Solution</h2>
                            <p className={styles.text}>{project.solutions}</p>
                        </section>
                    )}

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Links</h2>
                        <div className={styles.links}>
                            {project.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.linkButton}
                                    style={{ color: themeStyle.color }}
                                >
                                    {link.icon}
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = projectData
        .filter(p => p.slug)
        .map(project => ({
            params: { slug: project.slug },
        }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const project = projectData.find(p => p.slug === slug);

    if (!project) {
        return {
            notFound: true,
        };
    }

    // Only pass the slug to avoid serialization issues with React elements in projectData
    return {
        props: {
            slug,
        },
    };
};

export default ProjectDetail;
