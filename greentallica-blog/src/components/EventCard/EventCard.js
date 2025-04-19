import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './EventCard.module.css';
import { formatDate } from '@/utils/helpers';
import { handleApiError } from '@/utils/handleErrors';
import { AuthContext } from '@/context/AuthContext';

export default function EventCard({ event }) {
    const { title, text, createdAt, image, link, author } = event;
    const { token, userId, userRole } = useContext(AuthContext);
    const router = useRouter();

    const canManageEvent = token && (userRole === 'admin' || userId === author?._id);

    const handleClick = () => {
        try {
            if (link) {
                window.open(link, '_blank');
            } else {
                console.warn("No se proporcionó un link para el evento.");
            }
        } catch (error) {
            const mensajeError = handleApiError(error);
            console.error(mensajeError);
            console.error("Error al abrir el link:", error);
        }
    };

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
                            onClick={() => router.push(`/events/edit/${event._id}`)}
                        >
                            Editar
                        </button>
                        <button
                            className={styles['event-card__delete']}
                            onClick={() => console.log("Eliminar evento", event._id)}
                        >
                            Eliminar
                        </button>
                    </div>
                )}

                <h3 className={styles['event-card__title']}>{title}</h3>
                <p className={styles['event-card__description']}>{text}</p>
                <p className={styles['event-card__date']}>{formatDate(createdAt)}</p>

                {/* Botón Más Información */}
                {link && (
                    <div className={styles['event-card__actions']}>
                        <button
                            className={styles['event-card__button']}
                            onClick={handleClick}
                        >
                            Más Información
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}
