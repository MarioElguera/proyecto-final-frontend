import { useEffect, useState } from "react";
import SliderImages from "@/components/SliderImages";
import CommentList from "@/components/CommentList/CommentList";
import ArticleList from "@/components/ArticleList/ArticleList";
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
            <SliderImages images={images} />

            {/* Artículos Destacados */}
            {loadingArticles ? (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>
                    Cargando artículos...
                </p>
            ) : (
                <ArticleList
                    articles={articles}
                    layout="featured"
                    showLinkArticleCard={true}
                />
            )}

            {/* Comentarios (Testimonios) */}
            {loadingComments ? (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>
                    Cargando comentarios...
                </p>
            ) : (
                <CommentList comments={testimonials} />
            )}
        </div>
    );
}
