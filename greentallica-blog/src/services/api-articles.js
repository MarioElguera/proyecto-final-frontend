import { handleApiError } from '@/utils/handleErrors';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/articles';

// Función genérica para manejar respuestas
async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data?.message || 'Error desconocido');
        error.status = response.status;
        error.response = data;
        throw error;
    }

    return data;
}

/**
 * Obtener todos los artículos (con filtro opcional por categoría).
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
 * Obtener un artículo por su ID.
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
 * Obtener un artículo completo (detalle + comentarios).
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
 * Obtener lista de categorías.
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
 * Crear un nuevo artículo.
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
 * Actualizar un artículo.
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
 * Eliminar un artículo.
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
