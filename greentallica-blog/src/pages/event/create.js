import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { createEvent, getEventById, updateEvent } from '@/services/api-events';
import { AuthContext } from '@/context/AuthContext';
import styles from './event.module.css';

export default function CreateEventPage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();
    const { id } = router.query;
    const isEditing = Boolean(id);

    // Estados del formulario
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Si está en modo edición, carga los datos del evento para prellenar el formulario
    useEffect(() => {
        if (isEditing && id && token) {
            (async () => {
                try {
                    const eventData = await getEventById(id);
                    setTitle(eventData.title);
                    setText(eventData.text);
                    setLink(eventData.link);
                    setImageBase64(eventData.image);
                } catch (err) {
                    setError('Error al cargar el evento para editar.');
                }
            })();
        }
    }, [id, isEditing, token]);

    // Manejo de conversión de imagen a base64 (máximo 2MB)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSizeMB = 2;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (file.size > maxSizeBytes) {
            alert(`El archivo supera los ${maxSizeMB} MB permitidos`);
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

    // Manejador del envío del formulario (crear o actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validaciones básicas
        if (!title.trim() || !text.trim() || !link.trim() || !imageBase64.trim()) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        try {
            setSubmitting(true);
            const eventData = { title, text, link, image: imageBase64 };
            // Incluye token en la llamada
            if (isEditing) {
                await updateEvent(id, eventData, token);
                setSuccess('Evento actualizado exitosamente.');
            } else {
                await createEvent(eventData, token);
                setSuccess('Evento creado exitosamente.');
            }
            setError('');
            setTimeout(() => {
                router.push('/event/event');
            }, 1000);
        } catch (err) {
            console.error(err);
            setError('Error al guardar el evento.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles['create-event']}>
            <h1 className={styles['create-event__title']}>
                {isEditing ? 'EDITAR EVENTO' : 'CREAR EVENTO'}
            </h1>
            {error && <p className={styles['create-event__error']}>{error}</p>}
            {success && <p className={styles['create-event__success']}>{success}</p>}
            <form onSubmit={handleSubmit} className={styles['create-event__form']}>
                <div className={styles['create-event__form-group']}>
                    <label htmlFor="title" className={styles['create-event__label']}>
                        TÍTULO
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles['create-event__input']}
                        required
                    />
                </div>
                <div className={styles['create-event__form-group']}>
                    <label htmlFor="text" className={styles['create-event__label']}>
                        DESCRIPCIÓN
                    </label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={styles['create-event__textarea']}
                        required
                    ></textarea>
                </div>
                <div className={styles['create-event__form-group']}>
                    <label htmlFor="link" className={styles['create-event__label']}>
                        LINK DEL EVENTO
                    </label>
                    <input
                        type="url"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className={styles['create-event__input']}
                        required
                    />
                </div>
                <div className={styles['create-event__form-group']}>
                    <label htmlFor="image" className={styles['create-event__label']}>
                        IMAGEN (máx. 2MB)
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles['create-event__input']}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    className={styles['create-event__button']}
                >
                    {submitting ? 'ENVIANDO...' : isEditing ? 'ACTUALIZAR EVENTO' : 'CREAR EVENTO'}
                </button>
            </form>
        </div>
    );
}
