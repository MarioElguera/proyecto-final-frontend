import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './ArticleCard.module.css'

/**
 * Componente visual para mostrar un artículo como tarjeta.
 * Admite dos variantes: 'horizontal' y 'vertical'.
 *
 * @param {string} imageSrc - URL o base64 de la imagen del artículo.
 * @param {string} altText - Texto alternativo de la imagen.
 * @param {string} title - Título del artículo.
 * @param {string} description - Descripción corta o contenido.
 * @param {string} variant - 'vertical' o 'horizontal'.
 * @param {boolean} showLink - Muestra un link "Ver detalles".
 * @param {function} onLinkClick - Callback al hacer click en el link.
 */
export default function ArticleCard({
    imageSrc,
    altText = '',
    title,
    description,
    variant = 'vertical',
    showLink = false,
    onLinkClick = () => { },
}) {
    const isBase64 = imageSrc?.startsWith('data:image')

    const handleClick = (e) => {
        e.preventDefault()
        onLinkClick(e)
    }

    const truncateText = (text, maxLength) => text?.length > maxLength ? `${text.slice(0, maxLength)}…` : text

    const Img = () => (
        <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 600px) 100vw, 30vw"
            style={{ objectFit: 'cover' }}
            placeholder={isBase64 ? 'blur' : undefined}
            blurDataURL={isBase64 ? imageSrc : undefined}
            unoptimized={isBase64}
        />
    )

    if (variant === 'horizontal') {
        return (
            <article className={styles['article-card--horizontal']}>
                <div className={styles['article-card--horizontal__image-container']}                >
                    <Img />
                </div>
                <div className={styles['article-card--horizontal__content']}>
                    <h3 className={styles['article-card--horizontal__title']}                    >
                        {title}
                    </h3>
                    <p className={styles['article-card--horizontal__description']}                    >
                        {truncateText(description, 100)}
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
        )
    }

    // vertical
    return (
        <article className={styles['article-card--vertical']}>
            <div className={styles['article-card--vertical__image-container']}>
                <Img />
            </div>
            <div className={styles['article-card--vertical__content']}>
                <h3 className={styles['article-card--vertical__title']}>
                    {title}
                </h3>
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
    )
}
