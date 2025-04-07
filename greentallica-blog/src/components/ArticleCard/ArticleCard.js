import React from 'react';
import Link from 'next/link';
import styles from './ArticleCard.module.css';

export default function ArticleCard({
    imageSrc,
    altText,
    title,
    description,
    variant = 'vertical',
    showLink = false,
    onLinkClick = () => { }, // callback opcional
}) {
    const isBase64 = imageSrc?.startsWith('data:image');
    const imageSource = isBase64 ? imageSrc : imageSrc || '/images/placeholder.jpg';

    const handleClick = (e) => {
        onLinkClick(e); // ejecutar callback si existe
    };

    if (variant === 'horizontal') {
        return (
            <article className={styles['articles__item']}>
                <div className={styles['articles__content']}>
                    <h3 className={styles['articles__title']}>{title}</h3>
                    <p className={styles['articles__description']}>{description}</p>
                    {showLink && (
                        <a
                            className={styles['articles__link']}
                            onClick={handleClick}
                        >
                            Ver detalle
                        </a>
                    )}
                </div>
                <div className={styles['articles__image-container']}>
                    <img
                        src={imageSource}
                        alt={altText}
                        className={styles['articles__image']}
                    />
                </div>
            </article>
        );
    }

    return (
        <article className={styles['featured-articles__item']}>
            <img
                src={imageSource}
                alt={altText}
                className={styles['featured-articles__image']}
            />
            <div className={styles['featured-articles__content']}>
                <h3 className={styles['featured-articles__subtitle']}>{title}</h3>
                <p className={styles['featured-articles__text']}>{description}</p>
                {showLink && link && (
                    <Link
                        href={link}
                        className={styles['featured-articles__link']}
                        onClick={handleClick}
                    >
                        Ver detalle
                    </Link>
                )}
            </div>
        </article>
    );
}
