import React from 'react';
import styles from './CommentCard.module.css';

/**
 * Componente visual para mostrar un comentario con posibles acciones.
 * Permite mostrar botones para editar o eliminar si se requieren.
 * 
 * @param {string} comment - Contenido del comentario.
 * @param {string} author - Nombre del autor del comentario.
 * @param {boolean} showEdit - Muestra el botón de editar si es true.
 * @param {boolean} showDelete - Muestra el botón de eliminar si es true.
 * @param {function} onEdit - Función que se ejecuta al hacer clic en editar.
 * @param {function} onDelete - Función que se ejecuta al hacer clic en eliminar.
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

            {/* Acciones (editar / eliminar) */}
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
