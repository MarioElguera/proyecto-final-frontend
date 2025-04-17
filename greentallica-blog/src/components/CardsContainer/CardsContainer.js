import React from 'react';
import styles from './CardsContainer.module.css';

/**
 * CardsContainer Component
 * Agrupa cards en un grid responsive con columnas definibles por tamaño de pantalla.
 *
 * Props:
 * - children: Cards a renderizar.
 * - columnsDesktop: Número de columnas en pantallas grandes (default 3).
 * - columnsTablet: Número de columnas en tablets (default 2).
 * - columnsMobile: Número de columnas en móviles (default 1).
 */
export default function CardsContainer({
    children,
    columnsDesktop = 3,
    columnsTablet = 2,
    columnsMobile = 1,
}) {
    return (
        <div
            className={styles['cards-container']}
            style={{
                '--columns-desktop': columnsDesktop,
                '--columns-tablet': columnsTablet,
                '--columns-mobile': columnsMobile,
            }}
        >
            {children}
        </div>
    );
}
