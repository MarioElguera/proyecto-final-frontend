import { useEffect, useState, useContext } from 'react';
import CategoryMenu from '@/components/CategoryMenu';
import ArticleList from '@/components/ArticleList/ArticleList';
import { getAllArticles } from '@/services/api';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';

import categories from '@/utils/categories';

export default function ArticlesPage() {
    const { token } = useContext(AuthContext);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCategorySelect = async (slug) => {
        setSelectedCategory(slug);
        setLoading(true);

        try {
            const data = await getAllArticles(slug);
            setArticles(data);
        } catch (error) {
            console.error('Error fetching articles:', error.message);
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-6 px-4">
            <h2 className="text-center text-2xl font-bold text-blue-600 mb-8">Categorías</h2>

            {token ? (
                <Link
                    href="/articles/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition mb-4 inline-block"
                >
                    Crear Artículo
                </Link>
            ) : (
                <p className="text-center text-red-600 font-semibold mb-4">
                    Debes iniciar sesión para crear un artículo.
                </p>
            )}

            <CategoryMenu
                categories={categories}
                onSelectCategory={handleCategorySelect}
            />

            <hr className="my-8 border-gray-300" />

            {loading ? (
                <p className="text-center text-lg mt-12">Cargando artículos...</p>
            ) : selectedCategory ? (
                articles.length > 0 ? (
                    <ArticleList articles={articles} layout="horizontal" />
                ) : (
                    <p className="text-center text-lg mt-12">No hay artículos en esta categoría.</p>
                )
            ) : (
                <p className="text-center text-lg font-semibold mt-12">
                    👉 Selecciona una de las categorías que se muestran arriba para ver los artículos. 👈
                </p>
            )}
        </div>
    );
}
