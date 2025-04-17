import { useEffect, useState } from "react";
import SliderImages from "@/components/SliderImages";
import CommentList from "@/components/CommentList/CommentList";
import Loading from "@/components/Loading/Loading";
import { getAllArticles } from "@/services/api";
import { getAllComments } from "@/services/api-comments";
import CardsContainer from '@/components/CardsContainer/CardsContainer';
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { useRouter } from 'next/router';
import { handleApiError } from '@/utils/handleErrors';

const images = [
    "/images/slider_concierto.webp",
    "/images/slider_futbol.webp",
    "/images/slider_peliculas_sp.webp",
    "/images/slider_vinilos.webp",
];

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await getAllArticles();
                setArticles(data.slice(0, 4));
            } catch (error) {
                const mensajeError = handleApiError(error);
                console.error(mensajeError);
                console.error("Error fetching articles:", error.message);
            } finally {
                setLoadingArticles(false);
            }
        }
        fetchArticles();
    }, []);

    useEffect(() => {
        async function fetchComments() {
            try {
                const data = await getAllComments();
                console.log(data)
                setTestimonials(data.slice(0, 4));
            } catch (error) {
                const mensajeError = handleApiError(error);
                console.error(mensajeError);
                console.error("Error fetching comments:", error.message);
            } finally {
                setLoadingComments(false);
            }
        }
        fetchComments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* <SliderImages images={images} /> */}
            <section className="hero">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <a>Bienvenido </a>
                        <a>Greentallica !</a>
                    </h1>
                    <p className="hero__description">
                        Bienvenido a un blog hecho para compartir pasiones: fútbol, música, cine y viajes. Aquí encontrarás artículos auténticos, comentarios reales y una experiencia hecha con dedicación.
                    </p>
                    <button className="hero__button">Conocer más</button>
                </div>
                <div className="hero__image">
                    <SliderImages images={images} />
                </div>
            </section>

            {/* Artículos Destacados */}
            {loadingArticles ? (
                <Loading />
            ) : (
                <CardsContainer
                    columnsDesktop={articles.length}
                    columnsTablet={2}
                    columnsMobile={1}
                    padding={2}
                >
                    {articles.map(article => (
                        <ArticleCard
                            imageSrc={article.image}
                            altText={article.altText}
                            title={article.title}
                            description={article.content}
                            link={article.link}
                            variant={'vertical'}
                            showLink={true}
                            onLinkClick={() => router.push(`/articles/${article._id}`)}
                        />
                    ))}
                </CardsContainer>
            )}

            {/* Comentarios (Testimonios) */}
            {loadingComments ? (
                <Loading />
            ) : (
                <CommentList title="Lo que dicen nuestros lectores" comments={testimonials} />
            )}
        </div>
    );
}
