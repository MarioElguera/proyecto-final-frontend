import React from 'react';
import styles from './ConfirmModal.module.css';

/**
 * Componente ConfirmModal
 * 
 * Props:
 * - show: booleano que muestra u oculta el modal
 * - title: título opcional
 * - message: mensaje principal
 * - onCancel: función a ejecutar al cancelar
 * - onConfirm: función a ejecutar al confirmar
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
