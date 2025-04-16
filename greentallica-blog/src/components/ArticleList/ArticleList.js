import React from 'react';
import { useRouter } from 'next/router';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from './ArticleList.module.css';

/**
 * ArticleList
 * Muestra un listado de tarjetas ArticleCard de dos variantes: vertical y horizontal.
 * - Variante "vertical": Distribuye las tarjetas en un grid flexible de 4 columnas en desktop,
 *   3 en pantallas grandes, 2 en tablets y 1 en móviles.
 * - Variante "horizontal": Muestra 2 tarjetas por fila en desktop y 1 en móviles.
 *
 * Las tarjetas se distribuyen mediante flex-wrap y se adaptan al ancho del contenedor padre.
 *
 * Props:
 * - articles: Array de artículos.
 * - title: Título a mostrar (se renderiza en mayúsculas).
 * - layout: "vertical" o "horizontal".
 * - showLinkArticleCard: Booleano para indicar si se muestra el enlace en cada tarjeta.
 */
export default function ArticleList({
    articles = [],
    title = '',
    layout = 'vertical',
    showLinkArticleCard = false,
}) {
    const router = useRouter();
    const isVertical = layout === 'vertical';

    // Se arma la clase del contenedor según la variante
    const articleListClass = `${styles['article-list']} ${isVertical ? styles['article-list--vertical'] : styles['article-list--horizontal']}`.trim();

    return (
        <section className={articleListClass}>
            <h2 className={styles['article-list__title']}>{title.toUpperCase()}</h2>
            <div className={styles['article-list__gallery']}>
                {articles.length ? (
                    articles.map((article) => (
                        // Utilizamos article._id o, de faltar, el índice (aunque se recomienda un identificador único)
                        <div key={article._id || article.index} className={styles['article-list__item']}>
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
