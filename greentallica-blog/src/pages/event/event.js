import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import EventsTimelineContainer from '@/components/GalleryContainer/EventsTimelineContainer';
import EventCard from '@/components/EventCard/EventCard';
import Loading from '@/components/Loading/Loading';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { getAllEvents, deleteEvent } from '@/services/api-events';
import { AuthContext } from '@/context/AuthContext';
import { formatDate } from '@/utils/helpers';
import styles from './event.module.css';

export default function EventPage() {
    const router = useRouter();
    const { userId, userRole, token } = useContext(AuthContext);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const fetchEvents = async () => {
        try {
            const data = await getAllEvents();
            const formattedEvents = data.map((e) => ({
                ...e,
                eventDate: e.eventDate ? formatDate(e.eventDate) : formatDate(e.createdAt),
            }));
            setEvents(formattedEvents);
        } catch (err) {
            console.error('Error cargando eventos:', err.message);
            setError('Error al cargar los eventos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleConfirmDelete = async () => {
        if (!eventToDelete) return;
        setShowConfirmModal(false);

        try {
            setDeleting(true);
            await deleteEvent(eventToDelete._id, token);
            await fetchEvents();
        } catch (error) {
            console.error('Error eliminando evento:', error.message);
            setError('Error al eliminar el evento.');
        } finally {
            setDeleting(false);
            setEventToDelete(null);
        }
    };

    const isLoading = loading || deleting; // 🔵 loading inicial o mientras borra evento

    return (
        <div className={styles['event-section']}>
            {/* Botón Agregar evento */}
            {!isLoading && token && (
                <button
                    className={styles['create-event__button']}
                    onClick={() => router.push('/event/create')}
                >
                    Agregar evento
                </button>
            )}

            {/* Mostrar Loading / Error / Empty / Lista */}
            {isLoading ? (
                <Loading />
            ) : error ? (
                <p className={styles['event-section__error']}>{error}</p>
            ) : events.length === 0 ? (
                <p className={styles['event-section__empty']}>
                    No hay eventos disponibles por el momento.
                </p>
            ) : (
                <EventsTimelineContainer>
                    {events.map((e) => {
                        const canManage = token && (userRole === 'admin' || userId === e.author?._id);
                        return (
                            <EventCard
                                key={e._id}
                                event={e}
                                canManageEvent={canManage}
                                onEdit={() => router.push(`/event/create?id=${e._id}`)}
                                onDelete={() => {
                                    setEventToDelete(e);
                                    setShowConfirmModal(true);
                                }}
                                onLinkClick={() => window.open(e.link, '_blank')}
                            />
                        );
                    })}
                </EventsTimelineContainer>
            )}

            {/* Modal de Confirmación */}
            <ConfirmModal
                show={showConfirmModal}
                title="Eliminar evento"
                message="¿Estás seguro de que deseas eliminar este evento?"
                onCancel={() => {
                    setShowConfirmModal(false);
                    setEventToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
