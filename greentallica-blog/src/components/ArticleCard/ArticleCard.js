import React from 'react';
import Link from 'next/link';
import styles from './ArticleCard.module.css';

export default function ArticleCard({
    imageSrc,
    altText = '',
    title,
    description,
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

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    if (variant === 'horizontal') {
        return (
            <article className={styles['article-card--horizontal']}>
                <div className={styles['article-card--horizontal__image-container']}>
                    <img
                        src={imageSource}
                        alt={altText}
                        className={styles['article-card--horizontal__image']}
                    />
                </div>
                <div className={styles['article-card--horizontal__content']}>
                    <h3 className={styles['article-card--horizontal__title']}>{title}</h3>
                    <p className={styles['article-card--horizontal__description']}>
                        {truncateText(description, 200)}
                    </p>
                    {showLink && (
                        <Link
                            href="#"
                            onClick={handleClick}
                            className={styles['article-card--horizontal__link']}
                        >
                            Ver detalles
                        </Link>
                    )}
                </div>
            </article>
        );
    }

    return (
        <article className={styles['article-card--vertical']}>
            <div className={styles['article-card--vertical__image-container']}>
                <img
                    src={imageSource}
                    alt={altText}
                    className={styles['article-card--vertical__image']}
                />
            </div>
            <div className={styles['article-card--vertical__content']}>
                <h3 className={styles['article-card--vertical__title']}>{title}</h3>
                <p className={styles['article-card--vertical__text']}>
                    {truncateText(description, 200)}
                </p>
                {showLink && (
                    <Link
                        href="#"
                        onClick={handleClick}
                        className={styles['article-card--vertical__link']}
                    >
                        Ver detalle
                    </Link>
                )}
            </div>
        </article>
    );
}
