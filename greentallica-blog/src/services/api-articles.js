import { handleApiError } from '@/utils/handleErrors';

// Define la URL base de la API
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL + '/articles';

/**
 * Obtiene todos los artículos, opcionalmente filtrados por categoría.
 * @param {string} category - Categoría para filtrar.
 */
export async function getAllArticles(category) {
    let url = `${NEXT_PUBLIC_API_URL}/`;
    if (category) {
        url += `?category=${encodeURIComponent(category)}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los artículos');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Obtiene un artículo por su ID.
 * @param {string|number} id - ID del artículo.
 */
export async function getArticleById(id) {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el artículo');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Obtiene un artículo completo por su ID.
 * @param {string|number} id - ID del artículo.
 */
export async function getFullArticleById(id) {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/${id}/full`);
        if (!response.ok) {
            throw new Error('Error al obtener el artículo completo');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Obtiene la lista de categorías disponibles.
 */
export async function getCategories() {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/categories/list`);
        if (!response.ok) {
            throw new Error('Error al obtener las categorías');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Crea un nuevo artículo.
 * @param {object} article - Datos del nuevo artículo.
 * @param {string} token - Token de autenticación del usuario.
 */
export async function createArticle(article, token) {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(article),
        });

        if (!response.ok) {
            throw new Error('Error al crear el artículo');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Actualiza un artículo existente.
 * @param {string|number} id - ID del artículo.
 * @param {object} article - Datos actualizados del artículo.
 * @param {string} token - Token de autenticación del usuario.
 */
export async function updateArticle(id, article, token) {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(article),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el artículo');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Elimina un artículo.
 * @param {string|number} id - ID del artículo.
 * @param {string} token - Token de autenticación del usuario.
 */
export async function deleteArticle(id, token) {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el artículo');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}
