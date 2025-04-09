import React from 'react';
import CommentCard from '../CommentCard/CommentCard';
import styles from './CommentList.module.css';

export default function CommentList({ comments = [] }) {
    return (
        <section className={styles['comment-list']}>
            <h2 className={styles['comment-list__title']}>Lo que dicen nuestros lectores</h2>
            <div className={styles['comment-list__grid']}>
                {comments.map((comment, index) => (
                    <CommentCard
                        key={comment._id}
                        altText={comment.altText}
                        comment={comment.content}
                        author={comment.author.username}
                    />
                ))}
            </div>
        </section>
    );
}
