// Imports
import React from 'react';
import styles from './CommentCard.module.css';

/**
 * Componente de tarjeta de comentario con acciones opcionales.
 *
 * @param {string} comment - Texto del comentario.
 * @param {string} author - Autor del comentario.
 * @param {boolean} showEdit - Mostrar botón de editar.
 * @param {boolean} showDelete - Mostrar botón de eliminar.
 * @param {function} onEdit - Callback para acción de editar.
 * @param {function} onDelete - Callback para acción de eliminar.
 */
export default function CommentCard({
    comment,
    author,
    showEdit = false,
    showDelete = false,
    onEdit = () => { },
    onDelete = () => { }
}) {
    return (
        <article className={styles.commentCard}>
            <p className={styles.commentCard__text}>"{comment}"</p>
            <p className={styles.commentCard__author}>escrito por : {author}</p>

            {/* Acciones individuales */}
            {(showEdit || showDelete) && (
                <div className={styles.commentCard__actions}>
                    {showEdit && (
                        <button
                            className={styles.commentCard__button}
                            onClick={onEdit}
                        >
                            Editar
                        </button>
                    )}
                    {showDelete && (
                        <button
                            className={styles.commentCard__button}
                            onClick={onDelete}
                        >
                            Eliminar
                        </button>
                    )}
                </div>
            )}
        </article>
    );
}
