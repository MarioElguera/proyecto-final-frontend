import { useState } from 'react';
import CategoryMenu from '@/components/CategoryMenu';
import ArticleList from '@/components/ArticleList/ArticleList';

const categorias = [
    { name: 'Fútbol', image: '/images/futbol.jpg', slug: 'futbol' },
    { name: 'Viajes', image: '/images/viajes.jpg', slug: 'viajes' },
    { name: 'Música', image: '/images/musica.jpg', slug: 'musica' },
    { name: 'Películas', image: '/images/peliculas.jpg', slug: 'peliculas' },
];

// Simulación de artículos
const articulos = [
    {
        title: 'Messi rompe récords',
        description: 'El astro argentino consigue su gol número 800.',
        category: 'futbol',
        imageSrc: '/images/articulos/futbol_1.webp',
        altText: 'Messi celebrando',
        link: '/articles',
    },
    {
        title: 'Messi rompe récords',
        description: 'El astro argentino consigue su gol número 800.',
        category: 'futbol',
        imageSrc: '/images/articulos/futbol_1.webp',
        altText: 'Messi celebrando',
        link: '/articles/messi-record',
    },
    {
        title: 'Messi rompe récords',
        description: 'El astro argentino consigue su gol número 800.',
        category: 'futbol',
        imageSrc: '/images/articulos/futbol_1.webp',
        altText: 'Messi celebrando',
        link: '/articles/messi-record',
    },
    {
        title: 'Messi rompe récords',
        description: 'El astro argentino consigue su gol número 800.',
        category: 'futbol',
        imageSrc: '/images/articulos/futbol_1.webp',
        altText: 'Messi celebrando',
        link: '/articles/messi-record',
    },
    {
        title: 'Top destinos 2024',
        description: 'Descubre los lugares más visitados del año.',
        category: 'viajes',
        imageSrc: '/images/articulos/viajes_1.webp',
        altText: 'Paisaje natural',
        link: '/articles/top-destinos-2024',
    },
    {
        title: 'SpotiRanking',
        description: 'Las canciones más escuchadas del mes.',
        category: 'musica',
        imageSrc: '/images/articulos/musica_1.webp',
        altText: 'Vinilos y cascos',
        link: '/articles/spotiranking',
    },
    {
        title: 'Spider-Man en el cine',
        description: 'La nueva película de Marvel bate récords.',
        category: 'peliculas',
        imageSrc: '/images/articulos/peliculas_1.webp',
        altText: 'Poster de Spider-Man',
        link: '/articles/spiderman-marvel',
    },
];

export default function ArticlesPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (slug) => {
        setSelectedCategory(slug);
    };

    const articulosFiltrados = articulos.filter(
        (art) => art.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-gray-100 pt-6 px-4">
            <h2 className="text-center text-2xl font-bold text-blue-600 mb-8">
                Categorías
            </h2>

            <CategoryMenu
                categories={categorias}
                onSelectCategory={handleCategorySelect}
            />

            <hr className="my-8 border-gray-300" />

            {selectedCategory
                ? <ArticleList articles={articulosFiltrados} layout="horizontal" />
                : (
                    <p className="text-center text-lg font-semibold mt-12">
                        👉 Selecciona una de las categorías que se muestran arriba para ver los artículos. 👈
                    </p>
                )}
        </div>
    );
}
