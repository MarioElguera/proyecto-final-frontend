import React from 'react';
import styles from './ArticleList.module.css';
import ArticleCard from '../ArticleCard/ArticleCard';

export default function ArticleList({ articles = [], layout = 'featured' }) {
    // layout = 'featured' → modo vertical (Artículos Destacados)
    // layout = 'horizontal' → modo horizontal

    const isFeatured = layout === 'featured';

    return (
        <section
            className={`${styles.articleList} ${isFeatured ? styles['articleList--featured'] : styles['articleList--horizontal']}`}
        >
            <h2 className={styles.articleList__title}>
                {isFeatured ? 'Artículos Destacados' : 'Artículos'}
            </h2>

            <div className={styles.articleList__gallery}>
                {articles.map((article, index) => (
                    <ArticleCard
                        key={index}
                        imageSrc={article.imageSrc}
                        altText={article.altText}
                        title={article.title}
                        description={article.description}
                        link={article.link}
                        variant={isFeatured ? 'vertical' : 'horizontal'}
                    />
                ))}
            </div>
        </section>
    );
}
