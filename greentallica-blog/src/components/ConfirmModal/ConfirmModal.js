import React from 'react';
import styles from './ConfirmModal.module.css';

/**
 * Componente visual para mostrar un modal de confirmación.
 * Permite al usuario confirmar o cancelar una acción crítica como eliminar.
 * 
 * @param {boolean} show - Controla si el modal se muestra o no.
 * @param {string} title - Título opcional del modal.
 * @param {string} message - Mensaje principal del cuerpo del modal.
 * @param {function} onCancel - Callback que se ejecuta al presionar "Cancelar".
 * @param {function} onConfirm - Callback que se ejecuta al presionar "Confirmar".
 */
export default function ConfirmModal({ show, title = '', message, onCancel, onConfirm }) {
    if (!show) return null;

    return (
        <div className={styles['confirm-modal']}>
            <div className={styles['confirm-modal__content']}>
                {title && <h2 className={styles['confirm-modal__title']}>{title}</h2>}
                <p className={styles['confirm-modal__message']}>{message}</p>
                <div className={styles['confirm-modal__actions']}>
                    <button
                        onClick={onCancel}
                        className={styles['confirm-modal__button--cancel']}
                        aria-label="Cancelar"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className={styles['confirm-modal__button--confirm']}
                        aria-label="Confirmar"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
