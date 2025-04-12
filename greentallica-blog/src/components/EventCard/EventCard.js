import React from 'react';
import styles from './EventCard.module.css';

/**
 * EventCard
 * - Muestra una imagen de fondo y encima un bloque con título y descripción.
 * - Las dimensiones y el estilo “masonry” se controlan principalmente en EventsList,
 *   pero en esta tarjeta puedes definir la superposición del texto sobre la imagen.
 */
export default function EventCard({ event }) {
    const { title, description, date, backgroundImage } = event;

    return (
        <article
            className={styles['event-card']}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={styles['event-card__overlay']}>
                <h3 className={styles['event-card__title']}>{title}</h3>
                <p className={styles['event-card__description']}>{description}</p>
                <p className={styles['event-card__date']}>{date}</p>
            </div>
        </article>
    );
}
