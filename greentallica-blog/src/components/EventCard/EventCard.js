import React from 'react';
import styles from './EventCard.module.css';

/**
 * Componente visual para mostrar un evento como tarjeta interactiva.
 *
 * @param {Object} event - Objeto que contiene los datos del evento (title, text, eventDate, image, link).
 * @param {boolean} canManageEvent - Determina si se deben mostrar los botones de editar y eliminar.
 * @param {function} onEdit - Callback al hacer clic en "Editar".
 * @param {function} onDelete - Callback al hacer clic en "Eliminar".
 * @param {function} onLinkClick - Callback al hacer clic en "Más Información".
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

                {/* Acciones de gestión del evento (visible solo si puede administrar) */}
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

                {/* Contenido principal del evento */}
                <h3 className={styles['event-card__title']}>{title}</h3>
                <p className={styles['event-card__description']}>{text}</p>
                <p className={styles['event-card__date']}>{eventDate}</p>

                {/* Acción adicional (enlace a más info) */}
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
