// src/components/EventsTimelineContainer/EventsTimelineContainer.jsx
import React, { useContext } from 'react';
import EventCard from '@/components/EventCard/EventCard';
import styles from './EventsTimelineContainer.module.css';
import { formatDate } from '@/utils/helpers';
import { AuthContext } from '@/context/AuthContext';

export default function EventsTimelineContainer({ events = [] }) {
    const { userId, userRole, token } = useContext(AuthContext);

    return (
        <section className={styles['timeline']}>
            <div className={styles['timeline__line']}></div>
            <ul className={styles['timeline__list']}>
                {events.length > 0 ? (
                    events.map((event) => {
                        const canManage = token && (userRole === 'admin' || userId === event.author?._id);
                        return (
                            <li key={event._id} className={styles['timeline__item']}>
                                <div className={styles['timeline__circle']}>
                                    {formatDate(event.createdAt)}
                                </div>
                                <div className={styles['timeline__content']}>
                                    <EventCard event={event} canManage={canManage} />
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <div className={styles['timeline__empty']}>No hay eventos disponibles.</div>
                )}
            </ul>
        </section>
    );
}
