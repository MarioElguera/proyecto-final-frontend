import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import EventsList from '@/components/EventList/EventsList';
import Loading from '@/components/Loading/Loading';
import { getAllEvents } from '@/services/api-events';
import { AuthContext } from '@/context/AuthContext';
import styles from './event.module.css';

export default function EventPage() {
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);

    // Llama a la API para obtener los eventos
    async function fetchEvents() {
        try {
            const data = await getAllEvents();
            setEvents(data);
        } catch (err) {
            console.error('Error fetching events:', err.message);
            setError('Error al cargar los eventos.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            {token && (
                <button className={styles['create-event__button']} onClick={() => router.push('/event/create')}>
                    Agregar evento
                </button>
            )}

            {loading ? (
                <Loading />
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <EventsList events={events} title="Eventos" />
            )}
        </div>
    );
}
