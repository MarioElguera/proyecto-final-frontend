import React from 'react';
import styles from './ArticleList.module.css';
import ArticleCard from '../ArticleCard/ArticleCard';
import { useRouter } from 'next/router';

export default function ArticleList({ articles = [], layout = 'featured', showLinkArticleCard = false }) {
    // layout = 'featured' → modo vertical (Artículos Destacados)
    // layout = 'horizontal' → modo horizontal
    const isFeatured = layout === 'featured';
    const router = useRouter();

    return (
        <section
            className={`${styles.articleList} ${isFeatured ? styles['articleList--featured'] : styles['articleList--horizontal']}`}
        >
            <h2 className={styles.articleList__title}>
                {isFeatured ? 'Artículos Destacados' : 'Artículos'}
            </h2>

            <div className={styles.articleList__gallery}>
                {articles.length != 0 ? articles.map((article, index) => (
                    <ArticleCard
                        key={index}
                        imageSrc={article.image}
                        altText={article.altText}
                        title={article.title}
                        description={article.content}
                        link={article.link}
                        variant={isFeatured ? 'vertical' : 'horizontal'}
                        showLink={showLinkArticleCard}
                        onLinkClick={() => router.push(`/articles/${article._id}`)}
                    />
                )) : <a>No hay articulos</a>}
            </div>
        </section>
    );
}
