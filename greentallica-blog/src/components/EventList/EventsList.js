import React from 'react';
import styles from './EventsList.module.css';
import EventCard from '../EventCard/EventCard';

/**
 * EventsList
 * - Muestra un layout tipo "masonry" / "random tiles" con CSS Grid.
 * - Cada tarjeta (EventCard) puede ocupar distintas celdas según su randomSpan o tamaño.
 * - Para simular un arreglo aleatorio, en este ejemplo se asignan spans fijos 
 *   o podrías generar un random al mapear.
 */
export default function EventsList({ events }) {

    return (
        <section className={styles['events-list']}>
            <h2 className={styles['events-list__title']}>PRÓXIMOS EVENTOS</h2>
            <div className={styles['events-list__grid']}>
                {events.map((event, index) => {
                    // Ejemplo: spans aleatorios en filas/columnas
                    // Podrías definir "rowSpan" y "colSpan" en el objeto "event" 
                    // o generarlos random aquí para la clase CSS.
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
                            <EventCard event={event} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
