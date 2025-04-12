import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { getAllArticles } from "@/services/api";
import categories from "@/utils/categories";
import CategoryMenu from "@/components/CategoryMenu";
import ArticleList from "@/components/ArticleList/ArticleList";
import { getAllComments } from "@/services/api-comments";
import styles from "./articles.module.css";

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
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);

    const handleCategorySelect = async (slug) => {
        setSelectedCategory(slug);
        setLoading(true);

        try {
            const data = await getAllArticles(slug);
            setArticles(data);
        } catch (error) {
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
                // Toma los primeros 4 artículos
                setArticles(data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching articles:", error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    useEffect(() => {
        async function fetchComments() {
            try {
                const data = await getAllComments();
                // Toma los primeros 4 comentarios
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
        <div className={styles.articlesPage}>
            {/* Header: Título y botón de creación */}
            <div className={styles.articlesPage__header}>
                <h2 className={styles.articlesPage__title}>{PAGE_TITLE}</h2>

                {token ? (
                    <Link href="/articles/create" className={styles.articlesPage__createBtn}>
                        <span className={styles.articlesPage__createBtnIcon}>＋</span>
                        <span className={styles.articlesPage__createBtnText}>{CREATE_ARTICLE_TEXT}</span>
                    </Link>
                ) : (
                    <p className={styles.articlesPage__loginRequired}>{LOGIN_REQUIRED_TEXT}</p>
                )}
            </div>

            {/* Menú de categorías */}
            <CategoryMenu
                categories={categories}
                onSelectCategory={handleCategorySelect}
            />

            <hr className={styles.articlesPage__hr} />

            {/* Artículos */}
            {loading ? (
                <div className={styles.articlesPage__spinnerContainer}>
                    <div className={styles.spinner}></div>
                    <p className={styles.articlesPage__loadingText}>{LOADING_TEXT}</p>
                </div>
            ) : selectedCategory ? (
                articles.length > 0 ? (
                    <ArticleList
                        articles={articles}
                        layout="horizontal"
                        showLinkArticleCard={true}
                    />
                ) : (
                    <p className={styles.articlesPage__message}>{NO_ARTICLES_TEXT}</p>
                )
            ) : (
                <p className={styles.articlesPage__message}>{SELECT_CATEGORY_TEXT}</p>
            )}

            {/* Comentarios (Testimonios) */}
            {/* Puedes añadir aquí el CommentList de manera similar */}
        </div>
    );
}
