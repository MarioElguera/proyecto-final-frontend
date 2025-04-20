import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import EventsTimelineContainer from '@/components/GalleryContainer/EventsTimelineContainer';
import EventCard from '@/components/EventCard/EventCard';
import Loading from '@/components/Loading/Loading';
import { getAllEvents, deleteEvent } from '@/services/api-events';
import { AuthContext } from '@/context/AuthContext';
import { formatDate } from '@/utils/helpers';
import styles from './event.module.css';

export default function EventPage() {
    const router = useRouter();
    const { userId, userRole, token } = useContext(AuthContext);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const fetchEvents = async () => {
        try {
            const data = await getAllEvents();
            const processed = data.map((e) => ({
                ...e,
                eventDate: e.eventDate ? formatDate(e.eventDate) : formatDate(e.createdAt),
            }));
            setEvents(processed);
        } catch (err) {
            console.error('Error fetching events:', err.message);
            setError('Error al cargar los eventos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleConfirmDelete = async () => {
        try {
            await deleteEvent(eventToDelete._id, token);
            fetchEvents();
            setEventToDelete(null);
            setShowConfirmModal(false);
        } catch (error) {
            console.error('Error eliminando evento:', error.message);
            setError('Error al eliminar el evento.');
        }
    };

    return (
        <div className={styles['event-section']}>
            {token && (
                <button
                    className={styles['create-event__button']}
                    onClick={() => router.push('/event/create')}
                >
                    Agregar evento
                </button>
            )}

            {loading ? (
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

            {/* Modal Confirmación */}
            {showConfirmModal && (
                <div className={styles['event-page__modal']}>
                    <div className={styles['event-page__modal-content']}>
                        <p>¿Estás seguro que deseas eliminar este evento?</p>
                        <div className={styles['event-page__modal-actions']}>
                            <button
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    setEventToDelete(null);
                                }}
                                className={styles['event-page__modal-button--cancel']}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className={styles['event-page__modal-button--confirm']}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
