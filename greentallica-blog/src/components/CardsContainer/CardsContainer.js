import React, { useState, useEffect } from 'react';
import styles from './CardsContainer.module.css';

/**
 * Contenedor visual para agrupar tarjetas de forma responsiva.
 * Ajusta columnas, padding y estilos según el tamaño de pantalla.
 *
 * @param {React.ReactNode} children - Componentes hijos (tarjetas) a mostrar.
 * @param {number} columnsDesktop - Columnas en escritorio.
 * @param {number} columnsTablet - Columnas en tablet.
 * @param {number} columnsMobile - Columnas en móvil.
 * @param {number} padding - Padding en rem alrededor de cada fila.
 * @param {string} backgroundColor - Color de fondo del contenedor.
 * @param {string} title - Título opcional que aparece arriba del grid.
 * @param {string} colorTitle - Color personalizado para el título.
 */
export default function CardsContainer({
    children,
    columnsDesktop = 2,
    columnsTablet = 2,
    columnsMobile = 1,
    padding = 0,
    backgroundColor = 'transparent',
    title = '',
    colorTitle = '',
}) {
    const childrenArray = React.Children.toArray(children);
    const totalCards = childrenArray.length;

    const [columns, setColumns] = useState(columnsDesktop);
    const [isDesktop, setIsDesktop] = useState(true);

    // Detecta tamaño de pantalla para adaptar columnas
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

        updateColumns();
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
            {/* Título superior opcional */}
            {title && (
                <h2
                    className={styles['cards-container__title']}
                    style={{ color: colorTitle || '#99f243' }}
                >
                    {title}
                </h2>
            )}

            {/* Renderizado de filas con tarjetas */}
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
                                ? { maxWidth: '100%', margin: '0 auto' }
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
