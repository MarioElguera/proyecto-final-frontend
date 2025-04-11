import React from 'react';
import CommentCard from '../CommentCard/CommentCard';
import styles from './CommentList.module.css';

export default function CommentList({ comments = [] }) {
    return (
        <section className={styles.commentList}>
            <h2 className={styles.commentList__title}>Lo que dicen nuestros lectores</h2>
            <div className={styles.commentList__grid}>
                {comments.map((comment) => (
                    <CommentCard
                        key={comment._id}
                        comment={comment.content}          // texto principal
                        author={comment.author.username}   // autor
                    />
                ))}
            </div>
        </section>
    );
}
