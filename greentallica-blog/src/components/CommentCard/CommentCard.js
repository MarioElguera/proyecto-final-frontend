import React from 'react';
import styles from './CommentCard.module.css';

export default function CommentCard({ avatarSrc, altText, comment, author }) {
    return (
        <article className={styles['comment-card']}>
            <div className={styles['comment-card__avatar']}>
            </div>
            <p className={styles['comment-card__text']}>
                <em>“{comment}” <br></br>- {author}</em>
            </p>
        </article>
    );
}
