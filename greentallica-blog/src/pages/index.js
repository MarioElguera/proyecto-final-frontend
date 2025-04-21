import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SliderImages from "@/components/SliderImages/SliderImages";
import CommentCard from "@/components/CommentCard/CommentCard";
import Loading from "@/components/Loading/Loading";
import CardsContainer from "@/components/CardsContainer/CardsContainer";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { getAllArticles } from "@/services/api-articles";
import { getAllComments } from "@/services/api-comments";
import { handleApiError } from "@/utils/handleErrors";
import styles from './Home.module.css';
import {
    HERO_SLIDER_IMAGES,
    HERO_TITLE,
    HERO_DESCRIPTION,
    ARTICLES_SECTION_TITLE,
    COMMENTS_SECTION_TITLE,
    NO_ARTICLES_MESSAGE,
    NO_COMMENTS_MESSAGE
} from "@/constants/index";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [pageError, setPageError] = useState('');
    const router = useRouter();

    const fetchArticles = async () => {
        try {
            const data = await getAllArticles();
            setArticles(data.slice(0, 4));

        } catch (error) {
            const mensajeError = handleApiError(error);
            setPageError(mensajeError || "Error al cargar artículos.");

        } finally {
            setLoadingArticles(false);
        }
    };

    const fetchComments = async () => {
        try {
            const data = await getAllComments();
            setTestimonials(data.slice(0, 4));
        } catch (error) {
            const mensajeError = handleApiError(error);
            setPageError(mensajeError || "Error al cargar comentarios.");
        } finally {
            setLoadingComments(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchArticles();
            await fetchComments();
        };
        fetchData();
    }, []);

    return (
        <div>
            <section className={styles["hero"]}>
                <div className={styles["hero__content"]}>
                    <h1 className={styles["hero__title"]}>{HERO_TITLE}</h1>
                    <p className={styles["hero__description"]}>{HERO_DESCRIPTION}</p>
                </div>
                <div className={styles["hero__image"]}>
                    <SliderImages images={HERO_SLIDER_IMAGES} />
                </div>
            </section>

            {pageError && (
                <div className={styles['home__no-data-container']}>
                    <p className={styles['home__error']}>{pageError}</p>
                </div>
            )}

            <section className={styles['home__section']}>
                {loadingArticles
                    ? (<Loading />)
                    : articles.length > 0
                        ? (
                            <CardsContainer
                                columnsDesktop={articles.length || 2}
                                columnsTablet={2}
                                columnsMobile={1}
                                padding={2}
                                backgroundColor="grey"
                                title={ARTICLES_SECTION_TITLE}
                            >
                                {articles.map((article) => (
                                    <ArticleCard
                                        key={article._id}
                                        imageSrc={article.image}
                                        altText={article.title}
                                        title={article.title}
                                        description={article.content}
                                        link={article.link}
                                        variant="vertical"
                                        showLink={true}
                                        onLinkClick={() => router.push(`/articles/${article._id}`)}
                                    />
                                ))}
                            </CardsContainer>
                        )
                        : (
                            <div className={styles['home__no-data-container']}>
                                <p className={styles['home__no-data']}>{NO_ARTICLES_MESSAGE}</p>
                            </div>
                        )}
            </section>

            <section className={styles['home__section']}>
                {loadingComments
                    ? (<Loading />)
                    : testimonials.length > 0
                        ? (
                            <CardsContainer
                                columnsDesktop={testimonials.length > 4 ? 4 : testimonials.length || 1}
                                columnsTablet={1}
                                columnsMobile={1}
                                padding={2}
                                backgroundColor="black"
                                title={COMMENTS_SECTION_TITLE}
                            >
                                {testimonials.map((comment) => (
                                    <CommentCard
                                        key={comment._id}
                                        comment={comment.content}
                                        author={comment.author?.username || "Anónimo"}
                                    />
                                ))}
                            </CardsContainer>
                        )
                        : (
                            <div className={styles['home__no-data-container']}>
                                <p className={styles['home__no-data']}>{NO_COMMENTS_MESSAGE}</p>
                            </div>
                        )}
            </section>
        </div>
    );
}