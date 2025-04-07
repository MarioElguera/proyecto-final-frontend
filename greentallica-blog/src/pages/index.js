import { useEffect, useState } from 'react';
import SliderImages from '@/components/SliderImages';
import CommentList from '@/components/CommentList/CommentList';
import ArticleList from '@/components/ArticleList/ArticleList';
import { getAllArticles } from '@/services/api';

const images = [
    '/images/slider_concierto.webp',
    '/images/slider_futbol.webp',
    '/images/slider_peliculas_sp.webp',
    '/images/slider_vinilos.webp',
];

const testimoniosData = [
    {
        avatarSrc: "/images/perfil_sin_foto.png",
        altText: "Usuario 1",
        comment: "¡Increíble cómo este blog combina mi amor por el fútbol y la música! Me encantó el artículo sobre el regreso de los vinilos.",
        author: "Juan P."
    },
    {
        avatarSrc: "/images/perfil_sin_foto.png",
        altText: "Usuario 2",
        comment: "Gracias por compartir tus conocimientos sobre los mejores conciertos del año. ¡Espero no perderme el próximo!",
        author: "Carla G."
    },
    {
        avatarSrc: "/images/perfil_sin_foto.png",
        altText: "Usuario 3",
        comment: "Me encanta el enfoque personal que le das a los artículos de fútbol. ¡Sigue así!",
        author: "Daniel T."
    }
];

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await getAllArticles();
                setArticles(data);

            } catch (error) {
                console.error('Error fetching articles:', error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <SliderImages images={images} />

            {/* Artículos Destacados */}
            {loading ? (
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando artículos...</p>
            ) : (
                <ArticleList articles={articles} layout="featured" />
            )}

            {/* Comentarios */}
            <CommentList comments={testimoniosData} />
        </div>
    );
}
