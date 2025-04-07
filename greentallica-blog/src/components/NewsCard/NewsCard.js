// components/NewsCard.jsx
import React from 'react';
import styles from './NewsCard.module.css';

export default function NewsCard({ newsItem }) {
    return (
        <article className={styles.card}>
            <img
                src={newsItem.image}
                alt={newsItem.title}
                className={styles.cardImage}
            />
            <h2 className={styles.cardTitle}>{newsItem.title}</h2>
            <p className={styles.cardText}>{newsItem.description}</p>
            <a href={`/news/${newsItem.id}`} className={styles.cardLink}>
                Read more
            </a>
        </article>
    );
}
