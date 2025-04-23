import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import { getAllEvents, deleteEvent } from '@/services/api-events';
import EventsTimelineContainer from '@/components/EventsTimelineContainer/EventsTimelineContainer';
import EventCard from '@/components/EventCard/EventCard';
import Loading from '@/components/Loading/Loading';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { formatDate } from '@/utils/helpers';
import styles from './event.module.css';

// Constantes de textos
const PAGE_TITLE = "Eventos";
const BUTTON_ADD_EVENT = "Agregar evento";
const ERROR_LOADING_EVENTS = "Error al cargar los eventos.";
const EMPTY_EVENTS_MESSAGE = "No hay eventos disponibles por el momento.";
const CONFIRM_DELETE_TITLE = "Eliminar evento";
const CONFIRM_DELETE_MESSAGE = "¿Estás seguro de que deseas eliminar este evento?";
const INFO_TOOLTIP_MESSAGE = "Si quieres agregar un evento, debes iniciar sesión.";

export default function EventPage() {
    const router = useRouter();
    const { token, userId, userRole } = useContext(AuthContext);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const isLoading = loading || deleting;

    // Obtener todos los eventos
    const fetchEvents = async () => {
        try {
            const data = await getAllEvents();
            const formattedEvents = data.map((event) => ({
                ...event,
                eventDate: event.eventDate ? formatDate(event.eventDate) : formatDate(event.createdAt),
            }));
            setEvents(formattedEvents);
            setError('');
        } catch (err) {
            console.error('Error cargando eventos:', err.message);
            setError(ERROR_LOADING_EVENTS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (!eventToDelete) return;
        setShowConfirmModal(false);

        try {
            setDeleting(true);
            await deleteEvent(eventToDelete._id, token);
            await fetchEvents();
        } catch (err) {
            console.error('Error eliminando evento:', err.message);
            setError('Error al eliminar el evento.');
        } finally {
            setDeleting(false);
            setEventToDelete(null);
        }
    };

    return (
        <div className={styles['event-section']}>

            {/* Botón agregar evento */}
            {!isLoading && token && (
                <button
                    className={styles['create-event__button']}
                    onClick={() => router.push('/event/create')}
                    aria-label={BUTTON_ADD_EVENT}
                >
                    {BUTTON_ADD_EVENT}
                </button>
            )}

            {/* Encabezado */}
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
                <p className={styles['event-section__error']}>{error}</p>
            ) : events.length === 0 ? (
                <p className={styles['event-section__empty']}>{EMPTY_EVENTS_MESSAGE}</p>
            ) : (
                <EventsTimelineContainer>
                    {events.map((event) => {
                        const canManage = token && (userRole === 'admin' || userId === event.author?._id);
                        return (
                            <EventCard
                                key={event._id}
                                event={event}
                                canManageEvent={canManage}
                                onEdit={() => router.push(`/event/create?id=${event._id}`)}
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

            {/* Modal de Confirmación */}
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
        </div>
    );
}
