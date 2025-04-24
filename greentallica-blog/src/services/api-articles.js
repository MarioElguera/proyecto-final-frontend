import { handleApiError } from '@/utils/handleErrors';
import { handleResponse } from '@/utils/handleResponse';

// URL base de articulos
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/articles';
console.log("url api .env => ", process.env.NEXT_PUBLIC_API_URL);
console.log("API_BASE_URL => ", API_BASE_URL);


/**
 * Obtiene todos los artículos, opcionalmente filtrados por categoría.
 * @param {string} [category] - Categoría para filtrar.
 * @returns {Promise<Object[]>}
 */
export async function getAllArticles(category) {
    let url = `${API_BASE_URL}/`;
    if (category) {
        url += `?category=${encodeURIComponent(category)}`;
    }

    try {
        const response = await fetch(url);
        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Obtiene un artículo por su ID.
 * @param {string} id - ID del artículo.
 * @returns {Promise<Object>}
 */
export async function getArticleById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Obtiene un artículo completo (detalle + comentarios).
 * @param {string} id - ID del artículo.
 * @returns {Promise<Object>}
 */
export async function getFullArticleById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/full`);
        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Obtiene la lista de categorías disponibles.
 * @returns {Promise<string[]>}
 */
export async function getCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/list`);
        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Crea un nuevo artículo.
 * @param {Object} article - Datos del artículo.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>}
 */
export async function createArticle(article, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(article),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Actualiza un artículo existente.
 * @param {string} id - ID del artículo.
 * @param {Object} article - Datos actualizados del artículo.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>}
 */
export async function updateArticle(id, article, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(article),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Elimina un artículo por ID.
 * @param {string} id - ID del artículo.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>}
 */
export async function deleteArticle(id, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}
