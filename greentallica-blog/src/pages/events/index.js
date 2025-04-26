/**
 * Página de eventos - Muestra todos los eventos disponibles con opción de crear, editar y eliminar.
 */

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

// Servicios y utilidades
import { getAllEvents, deleteEvent } from '@/services/api-events';
import { formatDate } from '@/utils/helpers';
import { handleApiError } from '@/utils/handleErrors';

// Componentes
import EventsTimelineContainer from '@/components/EventsTimelineContainer/EventsTimelineContainer';
import EventCard from '@/components/EventCard/EventCard';
import Loading from '@/components/Loading/Loading';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

// Estilos y textos
import styles from './events.module.css';
import {
    PAGE_TITLE,
    BUTTON_ADD_EVENT,
    ERROR_LOADING_EVENTS,
    EMPTY_EVENTS_MESSAGE,
    CONFIRM_DELETE_TITLE,
    CONFIRM_DELETE_MESSAGE,
    INFO_TOOLTIP_MESSAGE
} from '@/constants/events';

export default function EventPage() {
    const router = useRouter();
    const { token, userId, userRole } = useContext(AuthContext);

    // Estados principales de la página
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    // Estado para el modal de confirmación
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const isLoading = loading || deleting;

    /**
     * Función para obtener todos los eventos de la API.
     */
    const fetchEvents = async () => {
        try {
            const data = await getAllEvents();
            const formattedEvents = data.map((event) => ({
                ...event,
                eventDate: formatDate(event.eventDate),
            }));
            setEvents(formattedEvents);
            setError('');
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    /**
     * Carga inicial de eventos al montar el componente.
     */
    useEffect(() => {
        fetchEvents();
    }, []);

    /**
     * Función que confirma y elimina un evento seleccionado.
     */
    const handleConfirmDelete = async () => {
        if (!eventToDelete) return;
        setShowConfirmModal(false);

        try {
            setDeleting(true);
            await deleteEvent(eventToDelete._id, token);
            await fetchEvents();
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setDeleting(false);
            setEventToDelete(null);
        }
    };

    return (
        <section className={styles['event-section']}>

            {/* Botón para agregar nuevo evento */}
            {!isLoading && token && (
                <button
                    className={styles['create-event__button']}
                    onClick={() => router.push('/events/create')}
                    aria-label={BUTTON_ADD_EVENT}
                >
                    {BUTTON_ADD_EVENT}
                </button>
            )}

            {/* Encabezado de sección */}
            <div className={styles['event-section__header']}>
                <h2 className={styles['event-section__title']}>
                    {PAGE_TITLE}
                    {!token && (
                        <span
                            className={styles['event-section__info-icon']}
                            title={INFO_TOOLTIP_MESSAGE}
                        >
                            ℹ️
                        </span>
                    )}
                </h2>
            </div>

            {/* Contenido principal */}
            {isLoading ? (
                <Loading />
            ) : error ? (
                <p className={styles['event-section__error']}>{error || ERROR_LOADING_EVENTS}</p>
            ) : events.length === 0 ? (
                <p className={styles['event-section__empty']}>{EMPTY_EVENTS_MESSAGE}</p>
            ) : (
                <EventsTimelineContainer>
                    {events.map((event) => {
                        const canManage = token && (userRole === 'admin' || userId === event.author._id);
                        return (
                            <EventCard
                                key={event._id}
                                event={event}
                                canManageEvent={canManage}
                                onEdit={() => router.push(`/events/create?id=${event._id}`)}
                                onDelete={() => {
                                    setEventToDelete(event);
                                    setShowConfirmModal(true);
                                }}
                                onLinkClick={() => window.open(event.link, '_blank')}
                            />
                        );
                    })}
                </EventsTimelineContainer>
            )}

            {/* Modal para confirmar eliminación */}
            <ConfirmModal
                show={showConfirmModal}
                title={CONFIRM_DELETE_TITLE}
                message={CONFIRM_DELETE_MESSAGE}
                onCancel={() => {
                    setShowConfirmModal(false);
                    setEventToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
