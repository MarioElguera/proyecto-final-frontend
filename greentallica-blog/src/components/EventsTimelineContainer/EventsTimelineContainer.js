import React from 'react';
import styles from './EventsTimelineContainer.module.css';

/**
 * Componente visual tipo timeline para renderizar elementos como eventos u otros elementos en una línea de tiempo.
 *
 * @param {React.ReactNode} children - Elementos hijos que se mostrarán en cada punto del timeline.
 */
export default function TimelineContainer({ children }) {
    return (
        <section className={styles['timeline']}>
            {/* Línea vertical del timeline */}
            <div className={styles['timeline__line']}></div>

            {/* Lista de eventos u items */}
            <ul className={styles['timeline__list']}>
                {React.Children.map(children, (child, index) => (
                    <li key={index} className={styles['timeline__item']}>
                        <div className={styles['timeline__circle']}></div>
                        <div className={styles['timeline__content']}>
                            {child}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
