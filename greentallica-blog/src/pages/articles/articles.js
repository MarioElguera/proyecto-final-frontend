import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { getAllArticles } from "@/services/api-articles";
import categories from "@/utils/categories";
import ImageMenu from "@/components/ImageMenu";
import styles from "./articles.module.css";
import { useRouter } from 'next/router';
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import CardsContainer from '@/components/CardsContainer/CardsContainer';
import { handleApiError } from '@/utils/handleErrors';
import Loading from "@/components/Loading/Loading";

// TEXTOS como constantes en UPPER_SNAKE_CASE
const PAGE_TITLE = "Categorías";
const CREATE_ARTICLE_TEXT = "Crear Artículo";
const LOGIN_REQUIRED_TEXT = "Debes iniciar sesión para crear un artículo.";
const LOADING_TEXT = "Cargando artículos...";
const NO_ARTICLES_TEXT = "No hay artículos en esta categoría.";
const SELECT_CATEGORY_TEXT =
    "👉 Selecciona una de las categorías que se muestran arriba para ver los artículos. 👈";

export default function ArticlesPage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();
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
            const mensajeError = handleApiError(error);
            console.error(mensajeError);
            console.error("Error fetching articles:", error.message);
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await getAllArticles();
                setArticles(data);
            } catch (error) {
                const mensajeError = handleApiError(error);
                console.error(mensajeError);
                console.error("Error fetching articles:", error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    return (
        <>
            {token
                ? (
                    <button className={styles['create-event__button']} onClick={() => router.push('/articles/create')}>
                        Agregar Artículo
                    </button>
                )
                : ('')
            }

            <div className={styles.articlesPage}>

                <div className={styles.articlesPage__header}>
                    <h2 className={styles.articlesPage__title}>{PAGE_TITLE}</h2>
                </div>

                <ImageMenu
                    categories={categories}
                    onSelectCategory={handleCategorySelect}
                />

                <hr className={styles.articlesPage__hr} />

                {/* Artículos */}
                {loading
                    ? (<Loading />)
                    : selectedCategory
                        ? (
                            articles.length > 0
                                ? (
                                    <CardsContainer
                                        columnsDesktop={articles.length === 1 ? 1 : 2}
                                        columnsTablet={1}
                                        columnsMobile={1}
                                    >
                                        {articles.map(article => (
                                            <ArticleCard
                                                imageSrc={article.image}
                                                altText={article.altText}
                                                title={article.title}
                                                description={article.content}
                                                link={article.link}
                                                variant={'horizontal'}
                                                showLink={true}
                                                onLinkClick={() => router.push(`/articles/${article._id}`)}
                                            />
                                        ))}
                                    </CardsContainer>
                                )
                                : (<p className={styles.articlesPage__message}>{NO_ARTICLES_TEXT}</p>)
                        )
                        : (<p className={styles.articlesPage__message}>{SELECT_CATEGORY_TEXT}</p>)}
            </div >
        </>
    );
}
