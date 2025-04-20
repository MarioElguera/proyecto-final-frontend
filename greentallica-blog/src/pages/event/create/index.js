import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { createEvent, getEventById, updateEvent } from '@/services/api-events';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading/Loading';
import styles from './createEvent.module.css';

export default function CreateEventPage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();
    const { id } = router.query;
    const isEditing = !!id;

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    // 🔵 Decodifica token y carga datos si se está editando
    useEffect(() => {
        if (token && isEditing && id) {
            (async () => {
                try {
                    const event = await getEventById(id);
                    setTitle(event.title);
                    setText(event.text);
                    setLink(event.link);
                    setImageBase64(event.image || '');
                    setEventDate(event.eventDate?.substring(0, 10)); // yyyy-mm-dd
                } catch {
                    setError('Error al cargar el evento.');
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setLoading(false);
        }
    }, [token, isEditing, id]);

    // 🔵 Maneja imagen base64
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
            setError('La imagen supera los 2MB permitidos.');
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

    // 🔵 Submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !text || !link || !imageBase64 || !eventDate) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        try {
            const payload = {
                title,
                text,
                link,
                image: imageBase64,
                eventDate,
            };

            if (isEditing) {
                await updateEvent(id, payload, token);
                setSuccess('Evento actualizado con éxito.');
            } else {
                await createEvent(payload, token);
                setSuccess('Evento creado con éxito.');
            }

            setError('');
            setTimeout(() => router.push('/event/event'), 1000);
        } catch {
            setError('Error al guardar el evento.');
        }
    };

    if (loading) return <Loading />;

    return (
        <div className={styles['create-event']}>
            <h1 className={styles['create-event__title']}>
                {isEditing ? 'EDITAR EVENTO' : 'CREAR EVENTO'}
            </h1>

            {error && <p className={styles['create-event__error']}>{error}</p>}
            {success && <p className={styles['create-event__success']}>{success}</p>}

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

                    <label htmlFor="image">Imagen (máx. 2MB)</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
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
                        {isEditing ? 'Actualizar evento' : 'Crear evento'}
                    </button>
                </div>
            </form>
        </div>
    );
}
