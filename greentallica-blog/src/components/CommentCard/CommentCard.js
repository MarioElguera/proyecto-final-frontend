import React from 'react';
import styles from './CommentCard.module.css';

export default function CommentCard({ comment, author }) {
    return (
        <article className={styles.commentCard}>
            <p className={styles.commentCard__text}>{comment}</p>
            <p className={styles.commentCard__author}>{author}</p>
        </article>
    );
}
