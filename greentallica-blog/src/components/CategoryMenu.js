// src/components/CategoryMenu.js
import React from 'react';

export default function CategoryMenu({ categories = [], onSelectCategory }) {
    return (
        <div className="category-menu-container">
            {categories.map((cat) => (
                <div
                    key={cat.slug}
                    className="category-card"
                    onClick={() => onSelectCategory?.(cat.slug)}
                >
                    <img src={cat.image} alt={cat.name} />
                    <div className="category-title">{cat.name}</div>
                </div>
            ))}
        </div>
    );
}
