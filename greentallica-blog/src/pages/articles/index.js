/**
 * Página de artículos - Permite seleccionar una categoría y ver artículos relacionados.
 */

import { useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

// Servicios y utilidades
import { getAllArticles } from "@/services/api-articles";
import { handleApiError } from "@/utils/handleErrors";
import categories from "@/utils/categories";

// Componentes reutilizables
import VideoMenu from "@/components/VideoMenu/VideoMenu";
import CardsContainer from "@/components/CardsContainer/CardsContainer";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Loading from "@/components/Loading/Loading";

// Estilos y constantes
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

    // Referencia a la sección de artículos
    const articlesSectionRef = useRef(null);

    // Estados principales
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    /**
     * Función que obtiene todos los artículos de la API (puede filtrar por categoría).
     *
     * @param {string|null} category - Categoría seleccionada, o null para obtener todos.
     */
    const fetchArticles = async (category = null) => {
        setLoading(true);
        try {
            const data = await getAllArticles(category);
            setArticles(data);
            setError('');
        } catch (error) {
            const mensajeError = handleApiError(error);
            setError(mensajeError || "Error cargando artículos.");
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Maneja la selección de una categoría y actualiza los artículos mostrados.
     *
     * @param {string} slug - Slug de la categoría seleccionada.
     */
    const handleCategorySelect = async (slug) => {
        setSelectedCategory(slug);
        await fetchArticles(slug);
        articlesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Botón para crear un nuevo artículo */}
            {token && (
                <button
                    className={styles['create-event__button']}
                    onClick={() => router.push('/articles/create')}
                    aria-label={CREATE_ARTICLE_TEXT}
                >
                    {CREATE_ARTICLE_TEXT}
                </button>
            )}

            {/* Sección de selección de categorías */}
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

            {/* Sección donde se muestran los artículos */}
            <section
                id="articulos-categoria"
                ref={articlesSectionRef}
                className={styles['articlesPage__list-section']}
            >
                <hr className={styles['articlesPage__hr']} />

                {loading ? (
                    <Loading />
                ) : error ? (
                    <p className={styles['articlesPage__error']}>{error}</p>
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
