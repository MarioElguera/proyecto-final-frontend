import React from 'react';
import CommentCard from '../CommentCard/CommentCard';
import styles from './CommentList.module.css';

export default function CommentList({ comments = [], title = '' }) {
    return (
        <section className={styles.commentList}>
            <h2 className={styles.commentList__title}>{title.toLocaleUpperCase()}</h2>
            <div className={styles.commentList__grid}>
                {comments.length !== 0 ? (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment._id}
                            comment={comment.content}          // texto principal
                            author={comment.author.username}   // autor
                        />
                    ))
                ) : (
                    <p className={styles['comment-list__no-comments']}>No hay comentarios.</p>
                )}
            </div>
        </section>
    );
}
