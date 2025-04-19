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

// Importar constantes de textos e imágenes
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

    // Obtener artículos
    async function fetchArticles() {
        try {
            const data = await getAllArticles();
            setArticles(data.slice(0, 4));
        } catch (error) {
            const mensajeError = handleApiError(error);
            setPageError(mensajeError || "Error cargando artículos.");
        } finally {
            setLoadingArticles(false);
        }
    }

    // Obtener comentarios
    async function fetchComments() {
        try {
            const data = await getAllComments();
            setTestimonials(data.slice(0, 4));
        } catch (error) {
            const mensajeError = handleApiError(error);
            setPageError(mensajeError || "Error cargando comentarios.");
        } finally {
            setLoadingComments(false);
        }
    }

    // Llamar datos al cargar el componente
    useEffect(() => {
        async function fetchData() {
            await Promise.all([fetchArticles(), fetchComments()]);
        }
        fetchData();
    }, []);

    return (
        <div>
            {/* Sección Hero principal */}
            <section className="hero">
                <div className="hero__content">
                    <h1 className="hero__title">{HERO_TITLE}</h1>
                    <p className="hero__description">{HERO_DESCRIPTION}</p>
                </div>
                <div className="hero__image">
                    <SliderImages images={HERO_SLIDER_IMAGES} />
                </div>
            </section>

            {/* Mostrar error general si existe */}
            {pageError && (
                <p className={styles['home__error']}>
                    {pageError}
                </p>
            )}

            {/* Sección Artículos Destacados */}
            {loadingArticles ? (
                <Loading />
            ) : (
                <CardsContainer
                    columnsDesktop={articles.length || 2}
                    columnsTablet={2}
                    columnsMobile={1}
                    padding={2}
                    backgroundColor="grey"
                    title={ARTICLES_SECTION_TITLE}
                >
                    {articles.length !== 0 ? (
                        articles.map((article) => (
                            <ArticleCard
                                key={article._id}
                                imageSrc={article.image}
                                altText={article.altText}
                                title={article.title}
                                description={article.content}
                                link={article.link}
                                variant="vertical"
                                showLink={true}
                                onLinkClick={() => router.push(`/articles/${article._id}`)}
                            />
                        ))
                    ) : (
                        <p className={styles['home__no-data']}>{NO_ARTICLES_MESSAGE}</p>
                    )}
                </CardsContainer>
            )}

            {/* Sección Comentarios Destacados */}
            {loadingComments ? (
                <Loading />
            ) : (
                <CardsContainer
                    columnsDesktop={testimonials.length || 2}
                    columnsTablet={2}
                    columnsMobile={1}
                    padding={2}
                    backgroundColor="black"
                    title={COMMENTS_SECTION_TITLE}
                >
                    {testimonials.length !== 0 ? (
                        testimonials.map((comment) => (
                            <CommentCard
                                key={comment._id}
                                comment={comment.content}
                                author={comment.author.username}
                            />
                        ))
                    ) : (
                        <p className={styles['home__no-data']}>{NO_COMMENTS_MESSAGE}</p>
                    )}
                </CardsContainer>
            )}
        </div>
    );
}
