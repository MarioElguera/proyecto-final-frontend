import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

// Servicios y utilidades
import { getAllArticles } from "@/services/api-articles";
import { handleApiError } from "@/utils/handleErrors";

// Componentes
import VideoMenu from "@/components/VideoMenu/VideoMenu";
import CardsContainer from "@/components/CardsContainer/CardsContainer";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Loading from "@/components/Loading/Loading";

// Estilos y constantes
import categories from "@/utils/categories";
import styles from "./articlesPage.module.css";
import {
    PAGE_TITLE,
    PAGE_TITLE_INFO_ICON_TEXT,
    CREATE_ARTICLE_TEXT,
    NO_ARTICLES_TEXT,
    SELECT_CATEGORY_TEXT,
} from "@/constants/articles";

export default function ArticlesPage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageError, setPageError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Función genérica para cargar artículos (con o sin categoría)
    const fetchArticles = async (category = null) => {
        setLoading(true);
        try {
            const data = await getAllArticles(category);
            setArticles(data);
            setPageError('');
        } catch (error) {
            const mensajeError = handleApiError(error);
            setPageError(mensajeError || "Error cargando artículos.");
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    // Maneja la selección de categoría
    const handleCategorySelect = async (slug) => {
        setSelectedCategory(slug);
        await fetchArticles(slug);
    };

    return (
        <>
            {/* Botón Agregar Artículo */}
            {token && (
                <button
                    className={styles['create-event__button']}
                    onClick={() => router.push('/articles/create')}
                    aria-label={CREATE_ARTICLE_TEXT}
                >
                    {CREATE_ARTICLE_TEXT}
                </button>
            )}

            {/* Sección del Menú de Categorías */}
            <section className={styles['articlesPage__menu-section']}>
                <div className={styles['articlesPage__header']}>
                    <h2 className={styles['articlesPage__title']}>
                        {PAGE_TITLE}
                        {!token && (
                            <span
                                className={styles['articlesPage__info-icon']}
                                title={PAGE_TITLE_INFO_ICON_TEXT}
                            >
                                ℹ️
                            </span>
                        )}
                    </h2>
                </div>

                <VideoMenu
                    categories={categories}
                    onSelectCategory={handleCategorySelect}
                />
            </section>

            {/* Sección de Artículos */}
            <section className={styles['articlesPage__list-section']}>
                <hr className={styles['articlesPage__hr']} />

                {loading ? (
                    <Loading />
                ) : pageError ? (
                    <p className={styles['articlesPage__error']}>{pageError}</p>
                ) : articles.length > 0 ? (
                    <CardsContainer
                        columnsDesktop={articles.length === 1 ? 1 : 2}
                        columnsTablet={1}
                        columnsMobile={1}
                        padding={0}
                        title={selectedCategory ? `Artículos de ${selectedCategory}` : PAGE_TITLE}
                    >
                        {articles.map((article) => (
                            <ArticleCard
                                key={article._id}
                                imageSrc={article.image}
                                altText={article.title}
                                title={article.title}
                                description={article.content}
                                variant="horizontal"
                                showLink={true}
                                onLinkClick={() => router.push(`/articles/${article._id}`)}
                            />
                        ))}
                    </CardsContainer>
                ) : (
                    <p className={styles['articlesPage__message']}>
                        {selectedCategory ? NO_ARTICLES_TEXT : SELECT_CATEGORY_TEXT}
                    </p>
                )}
            </section>
        </>

    );
}
