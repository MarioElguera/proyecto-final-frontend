// Imports
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { createEvent, getEventById, updateEvent } from '@/services/api-events';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading/Loading';
import styles from './createEvent.module.css';

// Textos constantes
const PAGE_TITLE_CREATE = 'Crear evento';
const PAGE_TITLE_EDIT = 'Editar evento';
const SUBMIT_CREATE_TEXT = 'Crear evento';
const SUBMIT_UPDATE_TEXT = 'Actualizar evento';
const FIELD_REQUIRED_ERROR = 'Todos los campos son obligatorios.';
const LOAD_EVENT_ERROR = 'Error al cargar el evento.';
const SAVE_EVENT_ERROR = 'Error al guardar el evento.';
const IMAGE_MAX_SIZE_ERROR = 'La imagen supera el tamaño máximo de 2MB.';
const IMAGE_INVALID_FORMAT_ERROR = 'Formato de imagen inválido. Solo JPG, PNG o WEBP.';

// Límites
const TITLE_MIN_LENGTH = 5;
const TITLE_MAX_LENGTH = 100;
const TEXT_MIN_LENGTH = 10;
const TEXT_MAX_LENGTH = 1000;

export default function CreateEventPage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();
    const { id } = router.query;
    const isEditing = !!id;

    // Estados
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [error, setError] = useState('');
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);

    // Cargar datos si estamos editando
    useEffect(() => {
        if (token && isEditing && id) {
            (async () => {
                try {
                    const event = await getEventById(id);
                    setTitle(event.title);
                    setText(event.text);
                    setLink(event.link);
                    setImageBase64(event.image || '');
                    setEventDate(event.eventDate?.substring(0, 10)); // formato yyyy-mm-dd
                } catch {
                    setError(LOAD_EVENT_ERROR);
                } finally {
                    setLoadingPage(false);
                }
            })();
        } else {
            setLoadingPage(false);
        }
    }, [token, isEditing, id]);

    // Convertir imagen a base64 validando tipo y tamaño
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

    // Validaciones manuales
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

        const payload = { title, text, link, image: imageBase64, eventDate };

        try {
            if (isEditing) {
                await updateEvent(id, payload, token);
            } else {
                await createEvent(payload, token);
            }
            router.push('/event/event');
        } catch {
            setError(SAVE_EVENT_ERROR);
        } finally {
            setLoadingAction(false);
        }
    };

    // Mostrar loading general si carga página o acción
    if (loadingPage || loadingAction) {
        return <Loading />;
    }

    return (
        <div className={styles['create-event']}>
            <h1 className={styles['create-event__title']}>
                {isEditing ? PAGE_TITLE_EDIT : PAGE_TITLE_CREATE}
            </h1>

            {error && <p className={styles['create-event__error']}>{error}</p>}

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
        </div>
    );
}
