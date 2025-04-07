// components/NewsList.jsx
import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import styles from './NewsList.module.css';

export default function NewsList({ news }) {
    return (
        <div className={styles.newsList}>
            {news.map((item) => (
                <NewsCard key={item.id} newsItem={item} />
            ))}
        </div>
    );
}
