import { useEffect, useState } from "react";
import SliderImages from "@/components/SliderImages";
import CommentList from "@/components/CommentList/CommentList";
import ArticleList from "@/components/ArticleList/ArticleList";
import Loading from "@/components/Loading/Loading";
import { getAllArticles } from "@/services/api";
import { getAllComments } from "@/services/api-comments";


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

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await getAllArticles();
                // Toma los primeros 4 artículos
                setArticles(data.slice(0, 4));
            } catch (error) {
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
                <ArticleList
                    articles={articles}
                    layout="featured"
                    showLinkArticleCard={true}
                />
            )}

            {/* Comentarios (Testimonios) */}
            {loadingComments ? (
                <Loading />
            ) : (
                <CommentList comments={testimonials} />
            )}
        </div>
    );
}
