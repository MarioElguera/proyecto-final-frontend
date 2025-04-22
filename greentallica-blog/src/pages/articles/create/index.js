import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

// Contexto
import { AuthContext } from '@/context/AuthContext';

// Servicios
import { createArticle, getArticleById, updateArticle } from '@/services/api-articles';

// Componentes
import Loading from '@/components/Loading/Loading';

// Estilos
import styles from './createArticle.module.css';

// Constantes de textos
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

// Opciones de categorías
const CATEGORIES_OPTIONS = [
    { value: 'futbol', label: 'Fútbol' },
    { value: 'viajes', label: 'Viajes' },
    { value: 'musica', label: 'Música' },
    { value: 'peliculas', label: 'Películas' },
];

// Límites para validaciones
const TITLE_MIN_LENGTH = 5;
const TITLE_MAX_LENGTH = 100;
const CONTENT_MIN_LENGTH = 10;
const CONTENT_MAX_LENGTH = 5000;

export default function CreateArticlePage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();
    const { id } = router.query;
    const isEditing = !!id;

    // Estados
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [error, setError] = useState('');
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    // Decodificar token de usuario
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

    // Cargar artículo si se edita
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoadingPage(true);
                const article = await getArticleById(id);
                if (userRole !== 'admin' && article.author._id !== userId) {
                    router.push(`/articles/${article._id}`);
                    return;
                }
                setTitle(article.title);
                setContent(article.content);
                setCategory(article.category);
                setImageBase64(article.image || '');
            } catch {
                setError(LOAD_ARTICLE_ERROR);
            } finally {
                setLoadingPage(false);
            }
        };

        if (isEditing && userId && userRole) {
            fetchArticle();
        } else {
            setLoadingPage(false);
        }
    }, [isEditing, id, userId, userRole]);

    // Manejar cambio de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setError('Solo se permiten imágenes JPG o PNG.');
            setImageBase64('');
            e.target.value = '';
            return;
        }

        const maxSizeBytes = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSizeBytes) {
            setError(IMAGE_MAX_SIZE_ERROR);
            setImageBase64('');
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

    // Validaciones de campos
    const validateFields = () => {
        if (!title || !content || !category) return FIELD_REQUIRED_ERROR;
        if (title.length < TITLE_MIN_LENGTH || title.length > TITLE_MAX_LENGTH)
            return `El título debe tener entre ${TITLE_MIN_LENGTH} y ${TITLE_MAX_LENGTH} caracteres.`;
        if (content.length < CONTENT_MIN_LENGTH || content.length > CONTENT_MAX_LENGTH)
            return `El contenido debe tener entre ${CONTENT_MIN_LENGTH} y ${CONTENT_MAX_LENGTH} caracteres.`;
        return null;
    };

    // Submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoadingAction(true);

        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            setLoadingAction(false);
            return;
        }

        if (!userId) {
            setError(NOT_AUTHENTICATED_ERROR);
            setLoadingAction(false);
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
                router.push(`/articles/${id}`);
            } else {
                const created = await createArticle(articleData, token);
                router.push(`/articles/${created._id}`);
            }
        } catch {
            setError(SAVE_ARTICLE_ERROR);
        } finally {
            setLoadingAction(false);
        }
    };

    // Mostrar loading mientras carga la página o procesa
    if (loadingPage || loadingAction) {
        return <Loading />;
    }

    return (
        <section className={styles['create-article']}>
            {/* Título */}
            <h1 className={styles['create-article__title']}>
                {isEditing ? PAGE_TITLE_EDIT : PAGE_TITLE_CREATE}
            </h1>

            {/* Mensaje de error */}
            {error && <p className={styles['create-article__error']}>{error}</p>}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className={styles['create-article__form']}>
                <div className={styles['create-article__left']}>
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ingresa el título"
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
                        {CATEGORIES_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="image">Imagen (JPG o PNG | máx. 2MB)</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                    />
                </div>

                <div className={styles['create-article__right']}>
                    <label htmlFor="content">Contenido</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escribe el contenido del artículo..."
                        required
                    />
                </div>

                {/* Botón de enviar */}
                <div className={styles['create-article__actions']}>
                    <button
                        type="submit"
                        aria-label={isEditing ? SUBMIT_UPDATE_TEXT : SUBMIT_CREATE_TEXT}
                    >
                        {isEditing ? SUBMIT_UPDATE_TEXT : SUBMIT_CREATE_TEXT}
                    </button>
                </div>
            </form>
        </section>
    );
}
