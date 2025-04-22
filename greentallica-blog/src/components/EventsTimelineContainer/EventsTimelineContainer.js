// src/components/TimelineContainer/TimelineContainer.jsx
import React from 'react';
import styles from './EventsTimelineContainer.module.css';

/**
 * TimelineContainer
 * Componente genérico tipo timeline para cualquier contenido pasado como children.
 *
 * Props:
 * - children: React nodes (cards o cualquier otro contenido).
 */
export default function TimelineContainer({ children }) {
    return (
        <section className={styles['timeline']}>
            <div className={styles['timeline__line']}></div>
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
