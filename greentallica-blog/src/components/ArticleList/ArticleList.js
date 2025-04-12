import React from 'react';
import { useRouter } from 'next/router';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from './ArticleList.module.css';

/**
 * ArticleList
 * Muestra un listado de tarjetas ArticleCard en dos variantes: vertical y horizontal.
 * - Variante "vertical": se muestran las tarjetas en un grid flexible (se adapta automáticamente a 4, 3, 2 o 1 por fila según el ancho).
 * - Variante "horizontal": siempre se muestran 2 tarjetas por cada fila (usando flex-wrap y cálculo del 50%).
 *
 * Las tarjetas se distribuyen sin necesidad de media queries, gracias al uso de flex-wrap.
 *
 * Props:
 * - articles: Array de artículos.
 * - title: Título a mostrar (se renderiza en mayúsculas).
 * - layout: "vertical" o "horizontal".
 * - showLinkArticleCard: Booleano para indicar si se debe mostrar el enlace en cada tarjeta.
 */
export default function ArticleList({ articles = [], title = '', layout = 'vertical', showLinkArticleCard = false }) {
    const router = useRouter();
    const isVertical = layout === 'vertical';

    // Se arma la clase del contenedor según la variante
    const articleListClass = `${styles['article-list']} ${isVertical ? styles['article-list--vertical'] : styles['article-list--horizontal']}`.trim();

    return (
        <section className={articleListClass}>
            <h2 className={styles['article-list__title']}>{title.toUpperCase()}</h2>
            <div className={styles['article-list__gallery']}>
                {articles.length !== 0 ? (
                    articles.map((article, index) => (
                        <div key={index} className={styles['article-list__item']}>
                            <ArticleCard
                                imageSrc={article.image}
                                altText={article.altText}
                                title={article.title}
                                description={article.content}
                                link={article.link}
                                variant={isVertical ? 'vertical' : 'horizontal'}
                                showLink={showLinkArticleCard}
                                onLinkClick={() => router.push(`/articles/${article._id}`)}
                            />
                        </div>
                    ))
                ) : (
                    <p className={styles['article-list__no-articles']}>No hay artículos</p>
                )}
            </div>
        </section>
    );
}
