import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { getAllArticles } from '@/services/api';
import categories from '@/utils/categories';
import CategoryMenu from '@/components/CategoryMenu';
import ArticleList from '@/components/ArticleList/ArticleList';

// TEXTOS como constantes en UPPER_SNAKE_CASE
const PAGE_TITLE = 'Categorías';
const CREATE_ARTICLE_TEXT = 'Crear Artículo';
const LOGIN_REQUIRED_TEXT = 'Debes iniciar sesión para crear un artículo.';
const LOADING_TEXT = 'Cargando artículos...';
const NO_ARTICLES_TEXT = 'No hay artículos en esta categoría.';
const SELECT_CATEGORY_TEXT =
    '👉 Selecciona una de las categorías que se muestran arriba para ver los artículos. 👈';

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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-blue-600">{PAGE_TITLE}</h2>

                {token ? (
                    <Link
                        href="/articles/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition flex items-center justify-center gap-2"
                    >
                        <span className="sm:hidden text-xl">＋</span>
                        <span className="hidden sm:inline">{CREATE_ARTICLE_TEXT}</span>
                    </Link>
                ) : (
                    <p className="text-red-600 font-semibold text-center sm:text-left">
                        {LOGIN_REQUIRED_TEXT}
                    </p>
                )}
            </div>

            {/* Menú de categorías */}
            <CategoryMenu
                categories={categories}
                onSelectCategory={handleCategorySelect}
            />

            <hr className="my-8 border-gray-300" />

            {/* Artículos */}
            {loading ? (
                <div className="flex justify-center mt-12">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : selectedCategory ? (
                articles.length > 0 ? (
                    <ArticleList
                        articles={articles}
                        layout="horizontal"
                        showLinkArticleCard={true}
                    />
                ) : (
                    <p className="text-center text-lg mt-12">{NO_ARTICLES_TEXT}</p>
                )
            ) : (
                <p className="text-center text-lg font-semibold mt-12">
                    {SELECT_CATEGORY_TEXT}
                </p>
            )}
        </div>
    );
}