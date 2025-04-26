/**
 * Página de creación y edición de artículos - Permite crear o editar un artículo seleccionando título, contenido, categoría e imagen.
 */

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

// Servicios y utilidades
import { createArticle, getArticleById, updateArticle } from '@/services/api-articles';
import { handleApiError } from '@/utils/handleErrors';

// Componentes
import Loading from '@/components/Loading/Loading';

// Estilos y constantes
import styles from './createArticle.module.css';
import {
    PAGE_TITLE_CREATE,
    PAGE_TITLE_EDIT,
    SUBMIT_CREATE_TEXT,
    SUBMIT_UPDATE_TEXT,
    FIELD_REQUIRED_ERROR,
    NOT_AUTHENTICATED_ERROR,
    IMAGE_MAX_SIZE_ERROR,
} from '@/constants/articles';

// Opciones fijas para la categoría
const CATEGORIES_OPTIONS = [
    { value: 'futbol', label: 'Fútbol' },
    { value: 'viajes', label: 'Viajes' },
    { value: 'musica', label: 'Música' },
    { value: 'peliculas', label: 'Películas' },
];

// Límites de validación
const TITLE_MIN_LENGTH = 5;
const TITLE_MAX_LENGTH = 100;
const CONTENT_MIN_LENGTH = 20;
const CONTENT_MAX_LENGTH = 3000;

export default function CreateArticlePage() {
    const { token, userId, userRole, isLoadingContextInfo } = useContext(AuthContext);
    const router = useRouter();
    const { id } = router.query;
    const isEditing = !!id;

    // Estados del formulario
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageBase64, setImageBase64] = useState('');

    // Estados de control de errores y carga
    const [error, setError] = useState('');
    const [fatalError, setFatalError] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);

    /**
     * Redirige a artículos si no hay token tras cargar el contexto.
     */
    useEffect(() => {
        if (!isLoadingContextInfo && !token) {
            router.push('/articles');
        }
    }, [isLoadingContextInfo, token]);

    /**
     * Carga los datos del artículo si estamos en modo edición.
     */
    useEffect(() => {
        const fetchArticleById = async () => {
            setLoadingPage(true);
            try {
                const article = await getArticleById(id);

                // Validar permisos (solo autor o admin puede editar)
                if (userRole !== 'admin' && article.author._id !== userId) {
                    router.push(`/articles/${article._id}`);
                    return;
                }

                // Prellenar datos en el formulario
                setTitle(article.title);
                setContent(article.content);
                setCategory(article.category);
                setImageBase64(article.image || '');
            } catch (err) {
                setError(handleApiError(err));
                setFatalError(true);
            } finally {
                setLoadingPage(false);
            }
        };

        if (isEditing && userId && userRole) {
            fetchArticleById();
        } else {
            setLoadingPage(false);
        }
    }, [isEditing, id, userId, userRole]);

    /**
     * Maneja la carga de una imagen y la convierte a base64.
     *
     * @param {Event} e - Evento de cambio del input de imagen.
     */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png'];
        const maxSizeBytes = 2 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
            setError('Solo se permiten imágenes JPG o PNG.');
            setTimeout(() => setError(''), 2000);
            setImageBase64('');
            e.target.value = '';
            return;
        }

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

    /**
     * Valida los campos del formulario antes de enviarlo.
     *
     * @returns {string|null} - Mensaje de error si no es válido, o null si es válido.
     */
    const validateFields = () => {
        if (!title || !content || !category) return FIELD_REQUIRED_ERROR;
        if (title.length < TITLE_MIN_LENGTH || title.length > TITLE_MAX_LENGTH)
            return `El título debe tener entre ${TITLE_MIN_LENGTH} y ${TITLE_MAX_LENGTH} caracteres.`;
        if (content.length < CONTENT_MIN_LENGTH || content.length > CONTENT_MAX_LENGTH)
            return `El contenido debe tener entre ${CONTENT_MIN_LENGTH} y ${CONTENT_MAX_LENGTH} caracteres.`;
        return null;
    };

    /**
     * Maneja el envío del formulario para crear o editar un artículo.
     *
     * @param {Event} e - Evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoadingAction(true);

        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            setTimeout(() => setError(''), 2000);
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
        } catch (error) {
            setError(handleApiError(error));
        } finally {
            setLoadingAction(false);
        }
    };

    // Mostrar loading mientras carga la página o acción
    if (loadingPage || loadingAction) return <Loading />;

    // Mostrar error fatal si no se puede editar o cargar
    if (fatalError) {
        return (
            <section className={styles['create-article']}>
                <h1 className={styles['create-article__title']}>
                    {isEditing ? PAGE_TITLE_EDIT : PAGE_TITLE_CREATE}
                </h1>
                <p className={styles['create-article__error']}>{error}</p>
            </section>
        );
    }

    return (
        <section className={styles['create-article']}>

            {/* Título de la página */}
            <h1 className={styles['create-article__title']}>
                {isEditing ? PAGE_TITLE_EDIT : PAGE_TITLE_CREATE}
            </h1>

            {/* Mostrar errores de validación */}
            {error && <p className={styles['create-article__error']}>{error}</p>}

            {/* Formulario de creación/edición de artículo */}
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
                        {CATEGORIES_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="image">Imagen (JPG o PNG | máx. 2MB)</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                        required={!isEditing}
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
                    <button type="submit" aria-label={isEditing ? SUBMIT_UPDATE_TEXT : SUBMIT_CREATE_TEXT}>
                        {isEditing ? SUBMIT_UPDATE_TEXT : SUBMIT_CREATE_TEXT}
                    </button>
                </div>
            </form>
        </section>
    );
}
