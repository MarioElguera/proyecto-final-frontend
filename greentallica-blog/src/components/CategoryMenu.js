// src/components/CategoryMenu.js
import React from 'react';

export default function CategoryMenu({ categories = [], onSelectCategory }) {
    return (
        <div className="category-menu-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
                <div
                    key={cat.slug}
                    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                    onClick={() => onSelectCategory?.(cat.slug)}
                >
                    <video
                        src={cat.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-white text-xl font-semibold underline">{cat.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
