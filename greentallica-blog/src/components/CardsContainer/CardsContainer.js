import React from 'react';
import styles from './CardsContainer.module.css';

/**
 * CardsContainer PRO
 * Centra y limita el ancho del último row si el número total de cards es impar.
 */
export default function CardsContainer({
    children,
    columnsDesktop = 2,
    padding = 0,
}) {
    const childrenArray = React.Children.toArray(children);
    const totalCards = childrenArray.length;

    const fullRows = Math.floor(totalCards / columnsDesktop);
    const itemsInLastRow = totalCards % columnsDesktop;

    const isOdd = totalCards % 2 !== 0;

    const rows = [];

    for (let i = 0; i < fullRows; i++) {
        rows.push(childrenArray.slice(i * columnsDesktop, (i + 1) * columnsDesktop));
    }

    if (itemsInLastRow > 0) {
        rows.push(childrenArray.slice(fullRows * columnsDesktop));
    }

    return (
        <div className={styles['cards-container-wrapper']}>
            {rows.map((row, index) => {
                const isLastRow = index === rows.length - 1;

                return (
                    <div
                        key={index}
                        className={styles['cards-container-row']}
                        style={{
                            padding: `${padding}rem`,
                            gridTemplateColumns: `repeat(${row.length}, 1fr)`,
                            justifyContent: isLastRow && isOdd ? 'center' : 'start',
                            ...(isLastRow && isOdd
                                ? { maxWidth: '50%', margin: '0 auto' }
                                : {}),
                        }}
                    >
                        {row}
                    </div>
                );
            })}
        </div>
    );
}
