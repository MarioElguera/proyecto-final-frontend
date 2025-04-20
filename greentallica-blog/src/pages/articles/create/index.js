import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createArticle, getArticleById, updateArticle } from '@/services/api-articles';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading/Loading';
import styles from './createArticle.module.css';

// Importar constantes de textos
import {
    PAGE_TITLE_CREATE,
    PAGE_TITLE_EDIT,
    SUBMIT_CREATE_TEXT,
    SUBMIT_UPDATE_TEXT,
    FIELD_REQUIRED_ERROR,
    NOT_AUTHENTICATED_ERROR,
    TOKEN_INVALID_ERROR,
    LOAD_ARTICLE_ERROR,
    SAVE_ARTICLE_ERROR,
    IMAGE_MAX_SIZE_ERROR
} from '@/constants/articles';

// Opciones del select de categorías
const CATEGORIES_OPTIONS = [
    { value: "futbol", label: "Fútbol" },
    { value: "viajes", label: "Viajes" },
    { value: "musica", label: "Música" },
    { value: "peliculas", label: "Películas" },
];

export default function CreateArticlePage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();
    const { id } = router.query;

    const isEditing = !!id;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔵 Decodifica el token para obtener ID y rol
    useEffect(() => {
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserId(payload.id);
                setUserRole(payload.role);
            } catch {
                setError(TOKEN_INVALID_ERROR);
            }
        }
    }, [token]);

    // Carga el artículo para editar si aplica
    useEffect(() => {
        setLoading(true);
        const fetchAndValidate = async () => {
            try {
                const article = await getArticleById(id);
                if (userRole !== 'admin' && article.author._id !== userId) {
                    router.push(`/articles/${article._id}`)
                    return;
                }
                setTitle(article.title);
                setContent(article.content);
                setCategory(article.category);
                setImageBase64(article.image || '');
            } catch {
                setError(LOAD_ARTICLE_ERROR);
            } finally {
                setLoading(false);
            }
        };

        if (isEditing && userId && userRole) {
            fetchAndValidate();
        } else {
            setLoading(false);
        }
    }, [isEditing, id, userId, userRole]);

    // 🔵 Maneja la carga de la imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSizeBytes = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSizeBytes) {
            setError(IMAGE_MAX_SIZE_ERROR);
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            setImageBase64(`data:${file.type};base64,${base64String}`);
        };
        reader.readAsDataURL(file);
    };

    // 🔵 Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !category) {
            setError(FIELD_REQUIRED_ERROR);
            return;
        }

        if (!userId) {
            setError(NOT_AUTHENTICATED_ERROR);
            return;
        }

        const articleData = {
            title,
            content,
            category,
            image: imageBase64,
            author: userId,
        };

        try {
            if (isEditing) {
                await updateArticle(id, articleData, token);
                setSuccess("Artículo actualizado correctamente.");
            } else {
                await createArticle(articleData, token);
                setSuccess("Artículo creado exitosamente.");
            }
            setError('');
            setTimeout(() => {
                router.push(`/articles/${id}`)
            }, 500);
        } catch {
            setError(SAVE_ARTICLE_ERROR);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className={styles['create-article']}>
            {/* 🔵 Título de la página */}
            <h1 className={styles['create-article__title']}>
                {isEditing ? PAGE_TITLE_EDIT : PAGE_TITLE_CREATE}
            </h1>

            {/* 🔵 Mensajes de error y éxito */}
            {error && <p className={styles['create-article__error']}>{error}</p>}
            {success && <p className={styles['create-article__success']}>{success}</p>}

            {/* 🔵 Formulario */}
            <form onSubmit={handleSubmit} className={styles['create-article__form']}>
                <div className={styles['create-article__left']}>
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Ingresa el título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label htmlFor="category">Categoría</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {CATEGORIES_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="image">Imagen (máx. 2MB)</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div className={styles['create-article__right']}>
                    <label htmlFor="content">Contenido</label>
                    <textarea
                        id="content"
                        placeholder="Escribe el contenido..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                {/* 🔵 Botón de enviar */}
                <div className={styles['create-article__actions']}>
                    <button type="submit" aria-label={isEditing ? SUBMIT_UPDATE_TEXT : SUBMIT_CREATE_TEXT}>
                        {isEditing ? SUBMIT_UPDATE_TEXT : SUBMIT_CREATE_TEXT}
                    </button>
                </div>
            </form>
        </div>
    );
}
