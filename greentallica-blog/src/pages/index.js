import SliderImages from '@/components/SliderImages';
import CommentList from '@/components/CommentList/CommentList';
import ArticleList from '@/components/ArticleList/ArticleList';

const images = [
    '/images/slider_concierto.webp',
    '/images/slider_futbol.webp',
    '/images/slider_peliculas_sp.webp',
    '/images/slider_vinilos.webp',
];

const articulos = [
    {
        imageSrc: "assets/img/inicio/articulo_1.jpg",
        altText: "Imagen del artículo 1",
        title: "Los Mejores Goles en los Mundiales",
        description: "Desde el inicio de la Copa Mundial de la FIFA en 1930... la 'Mano de Dios'...",
        link: "/articles"
    },
    {
        imageSrc: "assets/img/articulos/img/musica_decada.jpg",
        altText: "Imagen del artículo 2",
        title: "Los Mejores Álbumes de la Década",
        description: "Los últimos diez años han sido testigos de una explosión de creatividad en la música...",
        link: "/articles"
    },
    {
        imageSrc: "assets/img/articulos/img/musica_decada.jpg",
        altText: "Imagen del artículo 2",
        title: "Los Mejores Álbumes de la Década",
        description: "Los últimos diez años han sido testigos de una explosión de creatividad en la música...",
        link: "/articles"
    },
    {
        imageSrc: "assets/img/articulos/img/musica_decada.jpg",
        altText: "Imagen del artículo 2",
        title: "Los Mejores Álbumes de la Década",
        description: "Los últimos diez años han sido testigos de una explosión de creatividad en la música...",
        link: "/articles"
    },
    // Añades más artículos aquí...
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
    return (
        <div className="min-h-screen bg-gray-100">
            <SliderImages images={images} />

            {/* Articulos Destacados */}
            <ArticleList articles={articulos} layout="featured" />

            {/* Comentarios */}
            <CommentList comments={testimoniosData} />

        </div>
    );
}
