import React, { useState, useEffect } from 'react';
import styles from './CardsContainer.module.css';

/**
 * CardsContainer Component
 * Agrupa cards de forma responsiva, adaptando columnas, centrado y fondo según el tamaño de pantalla.
 *
 * Props:
 * - children: Cards a renderizar.
 * - columnsDesktop: Número de columnas en desktop.
 * - columnsTablet: Número de columnas en tablet.
 * - columnsMobile: Número de columnas en móvil.
 * - padding: Padding en rem.
 * - backgroundColor: Color de fondo personalizado (opcional).
 */
export default function CardsContainer({
    children,
    columnsDesktop = 2,
    columnsTablet = 2,
    columnsMobile = 1,
    padding = 0,
    backgroundColor = 'transparent',
}) {
    const childrenArray = React.Children.toArray(children);
    const totalCards = childrenArray.length;

    const [columns, setColumns] = useState(columnsDesktop);
    const [isDesktop, setIsDesktop] = useState(true);

    // Maneja el tamaño de pantalla para adaptar columnas y detectar si estamos en desktop
    useEffect(() => {
        function updateColumns() {
            const width = window.innerWidth;

            if (width <= 600) {
                setColumns(columnsMobile);
                setIsDesktop(false);
            } else if (width <= 1024) {
                setColumns(columnsTablet);
                setIsDesktop(false);
            } else {
                setColumns(columnsDesktop);
                setIsDesktop(true);
            }
        }

        updateColumns(); // Ejecutar al montar
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, [columnsDesktop, columnsTablet, columnsMobile]);

    const fullRows = Math.floor(totalCards / columns);
    const itemsInLastRow = totalCards % columns;

    const isOdd = totalCards % 2 !== 0;

    const rows = [];

    for (let i = 0; i < fullRows; i++) {
        rows.push(childrenArray.slice(i * columns, (i + 1) * columns));
    }

    if (itemsInLastRow > 0) {
        rows.push(childrenArray.slice(fullRows * columns));
    }

    return (
        <div
            className={styles['cards-container-wrapper']}
            style={{ backgroundColor }}
        >
            {rows.map((row, index) => {
                const isLastRow = index === rows.length - 1;
                const shouldCenter = isLastRow && isOdd && isDesktop;

                return (
                    <div
                        key={index}
                        className={styles['cards-container-row']}
                        style={{
                            padding: `${padding}rem`,
                            gridTemplateColumns: `repeat(${row.length}, 1fr)`,
                            justifyContent: shouldCenter ? 'center' : 'start',
                            ...(shouldCenter
                                ? { maxWidth: '50%', margin: '0 auto' }
                                : { maxWidth: '100%' }),
                        }}
                    >
                        {row}
                    </div>
                );
            })}
        </div>
    );
}
