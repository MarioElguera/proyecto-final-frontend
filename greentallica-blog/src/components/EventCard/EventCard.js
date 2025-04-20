import React from 'react';
import styles from './EventCard.module.css';

/**
 * EventCard
 * Muestra una tarjeta de evento con opciones para gestionar (editar, eliminar) y más información.
 *
 * Props:
 * - event: objeto de datos del evento.
 * - canManageEvent: booleano que habilita botones de edición y eliminación.
 * - onEdit: función callback para editar.
 * - onDelete: función callback para eliminar.
 * - onLinkClick: función callback para abrir el enlace.
 */
export default function EventCard({
    event,
    canManageEvent = false,
    onEdit = () => { },
    onDelete = () => { },
    onLinkClick = () => { }
}) {
    const { title, text, eventDate, image, link } = event;

    return (
        <article
            className={styles['event-card']}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className={styles['event-card__overlay']}>

                {/* Botones Editar / Eliminar */}
                {canManageEvent && (
                    <div className={styles['event-card__manage']}>
                        <button
                            className={styles['event-card__edit']}
                            onClick={() => onEdit(event)}
                        >
                            Editar
                        </button>
                        <button
                            className={styles['event-card__delete']}
                            onClick={() => onDelete(event)}
                        >
                            Eliminar
                        </button>
                    </div>
                )}

                {/* Contenido del evento */}
                <h3 className={styles['event-card__title']}>{title}</h3>
                <p className={styles['event-card__description']}>{text}</p>
                <p className={styles['event-card__date']}>{eventDate}</p>

                {/* Botón de Más Información */}
                {link && (
                    <div className={styles['event-card__actions']}>
                        <button
                            className={styles['event-card__button']}
                            onClick={() => onLinkClick(event)}
                        >
                            Más Información
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}
