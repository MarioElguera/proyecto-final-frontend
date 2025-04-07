// services/api.js

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/articles';

/**
 * Fetch all articles.
 */
export async function getAllArticles() {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch articles');
    }
    return response.json();
}

/**
 * Fetch a single article by its ID.
 * @param {string|number} id - Article ID.
 */
export async function getArticleById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch article');
    }
    return response.json();
}

/**
 * Fetch the full details of an article by its ID.
 * @param {string|number} id - Article ID.
 */
export async function getFullArticleById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}/full`);
    if (!response.ok) {
        throw new Error('Failed to fetch full article');
    }
    return response.json();
}

/**
 * Fetch the list of categories.
 */
export async function getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories/list`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
}

/**
 * Create a new article.
 * @param {object} article - Article data.
 * @param {string} token - User authentication token.
 */
export async function createArticle(article, token) {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(article),
    });
    if (!response.ok) {
        throw new Error('Failed to create article');
    }
    return response.json();
}

/**
 * Update an existing article.
 * @param {string|number} id - Article ID.
 * @param {object} article - Updated article data.
 * @param {string} token - User authentication token.
 */
export async function updateArticle(id, article, token) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(article),
    });
    if (!response.ok) {
        throw new Error('Failed to update article');
    }
    return response.json();
}

/**
 * Delete an article.
 * @param {string|number} id - Article ID.
 * @param {string} token - User authentication token.
 */
export async function deleteArticle(id, token) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete article');
    }
    return response.json();
}
