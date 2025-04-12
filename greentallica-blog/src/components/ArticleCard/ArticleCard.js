import React from 'react';
import Link from 'next/link';
import styles from './ArticleCard.module.css';

/**
 * Componente ArticleCard
 * - Muestra una tarjeta de artículo en dos variantes: 'horizontal' y 'vertical'.
 * - En la variante horizontal, la imagen queda a la izquierda y el contenido a la derecha.
 * - El texto se trunca para que no sobrepase un número de líneas y así mantener el botón visible.
 */
export default function ArticleCard({
    imageSrc,
    altText = '',
    title,         // Texto principal
    description,   // Texto secundario
    variant = 'vertical',
    showLink = false,
    onLinkClick = () => { },
}) {
    // Verifica si la imagen está en Base64; si no, usa la proporcionada o un placeholder.
    const isBase64 = imageSrc?.startsWith('data:image');
    const imageSource = isBase64 ? imageSrc : imageSrc || '/images/placeholder.jpg';

    // Manejador del clic en el link
    const handleClick = (e) => {
        e.preventDefault();
        onLinkClick(e);
    };

    // VERSIÓN HORIZONTAL (con truncado de texto)
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
                    <p className={styles['article-card--horizontal__description']}>{description}</p>
                    {showLink && (
                        <Link href="#" onClick={handleClick} className={styles['article-card--horizontal__link']}>
                            Ver detalles
                        </Link>
                    )}
                </div>
            </article>
        );
    }

    // VERSIÓN VERTICAL (Featured)
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
                <p className={styles['article-card--vertical__text']}>{description}</p>
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
