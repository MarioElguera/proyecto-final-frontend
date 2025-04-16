import React from 'react';
import styles from './EventsList.module.css';
import EventCard from '../EventCard/EventCard';


export default function EventsList({ events, title = '' }) {

    return (
        <section className={styles['events-list']}>
            <h2 className={styles['events-list__title']}>{title}</h2>
            <div className={styles['events-list__grid']}>
                {events.map((event, index) => {

                    const rowSpan = (index % 2 === 0) ? 1 : 2;
                    const colSpan = (index % 3 === 0) ? 2 : 1;

                    return (
                        <div
                            key={event.id}
                            className={`
                ${styles['events-list__item']} 
                ${styles[`events-list__item--row${rowSpan}`]} 
                ${styles[`events-list__item--col${colSpan}`]}
              `.trim()}
                        >
                            <EventCard event={event} showButtonLink={true} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
