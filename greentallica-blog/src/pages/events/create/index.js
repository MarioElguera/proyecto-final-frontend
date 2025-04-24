import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

// Servicios
import { createEvent, getEventById, updateEvent } from '@/services/api-events';
import { handleApiError } from '@/utils/handleErrors';

// Componentes
import Loading from '@/components/Loading/Loading';

// Estilos y constantes
import styles from './createEvent.module.css';
import {
    PAGE_TITLE_CREATE,
    PAGE_TITLE_EDIT,
    SUBMIT_CREATE_TEXT,
    SUBMIT_UPDATE_TEXT,
    FIELD_REQUIRED_ERROR,
    LOAD_EVENT_ERROR,
    IMAGE_MAX_SIZE_ERROR,
    IMAGE_INVALID_FORMAT_ERROR
} from '@/constants/events';

// Límites de validación
const TITLE_MIN_LENGTH = 5;
const TITLE_MAX_LENGTH = 100;
const TEXT_MIN_LENGTH = 10;
const TEXT_MAX_LENGTH = 400;

export default function CreateEventPage() {
    const { token, userId, userRole, isLoadingContextInfo } = useContext(AuthContext);
    const router = useRouter();
    const { id } = router.query;
    const isEditing = !!id;

    // Estados de formulario
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [imageBase64, setImageBase64] = useState('');

    // Estados UI
    const [error, setError] = useState('');
    const [fatalError, setFatalError] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);

    // Redirige si no hay token después de cargar contexto
    useEffect(() => {
        if (!isLoadingContextInfo && !token) {
            router.push('/events');
        }
    }, [isLoadingContextInfo, token]);

    // Cargar evento si estamos editando
    useEffect(() => {
        const fetchEventById = async () => {
            setLoadingPage(true);
            try {
                const event = await getEventById(id);

                // Validar permisos
                if (userRole !== 'admin' && event.author !== userId) {
                    router.push('/events');
                    return;
                }

                // rellenar datos
                setTitle(event.title);
                setText(event.text);
                setLink(event.link);
                setImageBase64(event.image || '');
                setEventDate(event.eventDate?.substring(0, 10));
            } catch (err) {
                setError(LOAD_EVENT_ERROR);
                setFatalError(true);
            } finally {
                setLoadingPage(false);
            }
        };

        if (token && isEditing && id) {
            fetchEventById();
        } else {
            setLoadingPage(false);
        }
    }, [isEditing, id]);

    // Validación y conversión de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError(IMAGE_INVALID_FORMAT_ERROR);
            e.target.value = '';
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError(IMAGE_MAX_SIZE_ERROR);
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.replace('data:', '').replace(/^.+,/, '');
            setImageBase64(`data:${file.type};base64,${base64}`);
        };
        reader.readAsDataURL(file);
    };

    // Validar campos del formulario
    const validateFields = () => {
        if (!title.trim() || !text.trim() || !link.trim() || !eventDate) {
            return FIELD_REQUIRED_ERROR;
        }
        if (title.length < TITLE_MIN_LENGTH || title.length > TITLE_MAX_LENGTH) {
            return `El título debe tener entre ${TITLE_MIN_LENGTH} y ${TITLE_MAX_LENGTH} caracteres.`;
        }
        if (text.length < TEXT_MIN_LENGTH || text.length > TEXT_MAX_LENGTH) {
            return `La descripción debe tener entre ${TEXT_MIN_LENGTH} y ${TEXT_MAX_LENGTH} caracteres.`;
        }
        if (!imageBase64 && !isEditing) {
            return 'Debes adjuntar una imagen para el evento.';
        }
        return null;
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoadingAction(true);

        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            setTimeout(() => setError(''), 1500);
            setLoadingAction(false);
            return;
        }

        const payload = { title, text, link, image: imageBase64, eventDate };

        try {
            if (isEditing) {
                await updateEvent(id, payload, token);
            } else {
                await createEvent(payload, token);
            }
            router.push('/events');
        } catch (error) {
            setError(handleApiError(error));
        } finally {
            setLoadingAction(false);
        }
    };

    // Mostrar loading
    if (loadingPage || loadingAction) return <Loading />;

    // Error fatal: no cargar formulario
    if (fatalError) {
        return (
            <section className={styles['create-event']}>
                <h1 className={styles['create-event__title']}>
                    {isEditing ? PAGE_TITLE_EDIT : PAGE_TITLE_CREATE}
                </h1>
                <p className={styles['create-event__error']}>{error}</p>
            </section>
        );
    }

    return (
        <section className={styles['create-event']}>
            {/* Título */}
            <h1 className={styles['create-event__title']}>
                {isEditing ? PAGE_TITLE_EDIT : PAGE_TITLE_CREATE}
            </h1>

            {/* Mensaje de error */}
            {error && <p className={styles['create-event__error']}>{error}</p>}

            {/* Formulario de creación / edición */}
            <form onSubmit={handleSubmit} className={styles['create-event__form']}>
                <div className={styles['create-event__left']}>
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título del evento"
                        required
                    />

                    <label htmlFor="link">Enlace del evento</label>
                    <input
                        id="link"
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://..."
                        required
                    />

                    <label htmlFor="eventDate">Fecha del evento</label>
                    <input
                        id="eventDate"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />

                    <label htmlFor="image">Imagen (JPG, PNG o WEBP | máx. 2MB)</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        onChange={handleImageChange}
                        required={!isEditing}
                    />
                </div>

                <div className={styles['create-event__right']}>
                    <label htmlFor="text">Descripción</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Describe el evento..."
                        required
                    />
                </div>

                <div className={styles['create-event__actions']}>
                    <button type="submit">
                        {isEditing ? SUBMIT_UPDATE_TEXT : SUBMIT_CREATE_TEXT}
                    </button>
                </div>
            </form>
        </section>
    );
}
