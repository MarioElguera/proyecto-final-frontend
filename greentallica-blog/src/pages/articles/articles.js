import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import { getAllArticles } from "@/services/api-articles";
import categories from "@/utils/categories";
import ImageMenu from "@/components/ImageMenu";
import CardsContainer from "@/components/CardsContainer/CardsContainer";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Loading from "@/components/Loading/Loading";
import { handleApiError } from "@/utils/handleErrors";
import styles from "./articles.module.css";

// Importar constantes de textos e imágenes
import {
    PAGE_TITLE,
    CREATE_ARTICLE_TEXT,
    NO_ARTICLES_TEXT,
    SELECT_CATEGORY_TEXT
} from "@/constants/articles";

export default function ArticlesPage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageError, setPageError] = useState('');

    // Maneja la selección de categoría
    const handleCategorySelect = async (slug) => {
        setSelectedCategory(slug);
        setLoading(true);

        try {
            const data = await getAllArticles(slug);
            setArticles(data);
            setPageError('');
        } catch (error) {
            const mensajeError = handleApiError(error);
            setPageError(mensajeError || "Error cargando artículos por categoría.");
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    // Trae artículos al montar la página
    useEffect(() => {
        async function fetchArticles() {
            setLoading(true);
            try {
                const data = await getAllArticles();
                setArticles(data);
            } catch (error) {
                const mensajeError = handleApiError(error);
                setPageError(mensajeError || "Error cargando artículos.");
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    return (
        <>
            {/* Botón para agregar artículos (si está logueado) */}
            {token && (
                <button
                    className={styles['create-event__button']}
                    onClick={() => router.push('/articles/createArticle')}
                    aria-label="Agregar nuevo artículo"
                >
                    {CREATE_ARTICLE_TEXT}
                </button>
            )}

            <div className={styles.articlesPage}>
                {/* Encabezado */}
                <div className={styles.articlesPage__header}>
                    <h2 className={styles.articlesPage__title}>{PAGE_TITLE}</h2>
                </div>

                {/* Menú de categorías */}
                <ImageMenu
                    categories={categories}
                    onSelectCategory={handleCategorySelect}
                />

                <hr className={styles.articlesPage__hr} />

                {/* Mostrar errores si existen */}
                {pageError && (
                    <p className={styles.articlesPage__error}>{pageError}</p>
                )}

                {/* Listado de artículos */}
                {loading ? (
                    <Loading />
                ) : selectedCategory ? (
                    articles.length > 0 ? (
                        <CardsContainer
                            columnsDesktop={articles.length === 1 ? 1 : 2}
                            columnsTablet={1}
                            columnsMobile={1}
                            padding={2}
                            title={`Artículos de ${selectedCategory}`}
                        >
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article._id}
                                    imageSrc={article.image}
                                    altText={article.altText}
                                    title={article.title}
                                    description={article.content}
                                    link={article.link}
                                    variant="horizontal"
                                    showLink={true}
                                    onLinkClick={() => router.push(`/articles/${article._id}`)}
                                />
                            ))}
                        </CardsContainer>
                    ) : (
                        <p className={styles.articlesPage__message}>{NO_ARTICLES_TEXT}</p>
                    )
                ) : (
                    <p className={styles.articlesPage__message}>{SELECT_CATEGORY_TEXT}</p>
                )}
            </div>
        </>
    );
}
