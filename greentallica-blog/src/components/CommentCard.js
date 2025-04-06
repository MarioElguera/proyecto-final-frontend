import React from 'react';

export default function CommentCard({ avatarSrc, altText, comment, author }) {
    return (
        <article className="testimonios__item">
            <div className="testimonios__avatar">
                <img
                    src={avatarSrc}
                    alt={altText}
                    className="testimonios__avatar-imagen"
                />
            </div>
            <p className="testimonios__texto">
                "{comment}"
            </p>
            <p className="testimonios__autor">
                - {author}
            </p>
        </article>
    );
}
