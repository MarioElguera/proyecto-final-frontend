import React from 'react';
import styles from './VideoMenu.module.css';

export default function ImageMenu({ categories = [], onSelectCategory }) {
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
