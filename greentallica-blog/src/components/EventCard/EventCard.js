import React from 'react';
import styles from './EventCard.module.css';
import { formatDate } from '@/utils/helpers';


export default function EventCard({ event }) {
    const { title, text, createdAt, image, link } = event;


    const handleClick = () => {
        try {
            if (link) {
                window.open(link, '_blank');
            } else {
                console.warn("No se proporcionó un link para el evento.");
            }
        } catch (error) {
            console.error("Error al abrir el link:", error);
        }
    };

    return (
        <article
            className={styles['event-card']}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className={styles['event-card__overlay']}>
                <h3 className={styles['event-card__title']}>{title}</h3>
                <p className={styles['event-card__description']}>{text}</p>
                <p className={styles['event-card__date']}>{formatDate(createdAt)}</p>
                {link && (
                    <button
                        className={styles['event-card__button']}
                        onClick={handleClick}
                    >
                        Más Información
                    </button>
                )}
            </div>
        </article>
    );
}
