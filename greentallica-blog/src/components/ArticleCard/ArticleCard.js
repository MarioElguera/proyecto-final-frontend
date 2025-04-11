import React from 'react';
import Link from 'next/link';
import styles from './ArticleCard.module.css';

export default function ArticleCard({
    imageSrc,
    altText = '',
    title,         // Texto principal (en verde)
    description,   // Texto secundario (autor, rol)
    variant = 'vertical',
    showLink = false,
    onLinkClick = () => { },
}) {
    const isBase64 = imageSrc?.startsWith('data:image');
    const imageSource = isBase64 ? imageSrc : imageSrc || '/images/placeholder.jpg';

    const handleClick = (e) => {
        e.preventDefault();
        onLinkClick(e);
    };

    // === VERSIÓN HORIZONTAL (Testimonial style) ===
    if (variant === 'horizontal') {
        return (
            <article className={styles.articles__item}>
                <div className={styles.articles__content}>
                    <h3 className={styles.articles__title}>{title}</h3>
                    <p className={styles.articles__description}>{description}</p>
                    {showLink && (
                        <Link href="#" onClick={handleClick} className={styles.articles__link}>
                            Ver detalle
                        </Link>
                    )}
                </div>
            </article>
        );
    }

    // === VERSIÓN VERTICAL (Featured) ===
    return (
        <article className={styles['featured-articles__item']}>
            <div className={styles['featured-articles__image-container']}>
                <img
                    src={imageSource}
                    alt={altText}
                    className={styles['featured-articles__image']}
                />
            </div>
            <div className={styles['featured-articles__content']}>
                <h3 className={styles['featured-articles__subtitle']}>{title}</h3>
                <p className={styles['featured-articles__text']}>{description}</p>
                {showLink && (
                    <Link
                        href="#"
                        onClick={handleClick}
                        className={styles['articles__link']}
                    >
                        Ver detalle
                    </Link>
                )}
            </div>
        </article>
    );
}
