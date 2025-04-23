import React from 'react';
import styles from './VideoMenu.module.css';

/**
 * VideoMenu
 * Componente visual que muestra categorías en tarjetas con videos en loop.
 * 
 * @param {Array} categories - Lista de categorías con slug, name e image (video).
 * @param {function} onSelectCategory - Callback al hacer clic en una categoría.
 */
export default function VideoMenu({ categories = [], onSelectCategory }) {
    return (
        <div className={styles['category-menu-container']}>
            {categories.map((cat) => (
                <div
                    key={cat.slug}
                    className={styles['category-menu__card']}
                    onClick={() => onSelectCategory?.(cat.slug)}
                >
                    <video
                        src={cat.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles['category-menu__video']}
                    />
                    <div className={styles['category-menu__overlay']}>
                        <div className={styles['category-menu__name']}>
                            {cat.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
