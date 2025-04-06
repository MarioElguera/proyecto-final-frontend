import React from 'react';
import styles from './ArticleCard.module.css';

export default function ArticleCard({ imageSrc, altText, title, description, link, variant = 'vertical' }) {
    if (variant === 'horizontal') {
        return (
            <article className={styles['articles__item']}>
                <div className={styles['articles__content']}>
                    <h3 className={styles['articles__title']}>{title}</h3>
                    <p className={styles['articles__description']}>{description}</p>
                    {/* En horizontal se omite el enlace "Leer más" */}
                </div>
                <div className={styles['articles__image-container']}>
                    <img src={imageSrc} alt={altText} className={styles['articles__image']} />
                </div>
            </article>
        );
    }

    // Modo vertical (featured articles)
    return (
        <article className={styles['featured-articles__item']}>
            <img src={imageSrc} alt={altText} className={styles['featured-articles__image']} />
            <div className={styles['featured-articles__content']}>
                <h3 className={styles['featured-articles__subtitle']}>{title}</h3>
                <p className={styles['featured-articles__text']}>{description}</p>
                <a href={link} className={styles['featured-articles__link']}>Leer más</a>
            </div>
        </article>
    );
}
