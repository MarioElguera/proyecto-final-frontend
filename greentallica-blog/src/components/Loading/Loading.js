import React from 'react';
import styles from './Loading.module.css';

/**
 * Componente Loading
 * Muestra un indicador visual de carga con animación de spinner y texto.
 * No recibe props.
 */
export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Cargando...</p>
        </div>
    );
}
