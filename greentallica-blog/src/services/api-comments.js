import { handleApiError } from '@/utils/handleErrors';

// URL base de comentarios
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/comments';

/**
 * Obtiene todos los comentarios.
 */
export async function getAllComments() {
    console.log("Entra al getAllcometns");
    try {
        const response = await fetch(`${API_BASE_URL}/`);

        if (!response.ok) {
            throw new Error('Error al obtener los comentarios');
        }

        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Obtiene los comentarios de un artículo específico.
 * @param {string} articleId - ID del artículo.
 */
export async function getCommentsByArticle(articleId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${articleId}`);

        if (!response.ok) {
            throw new Error('Error al obtener los comentarios del artículo');
        }

        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Crea un nuevo comentario en un artículo.
 * @param {string} articleId - ID del artículo.
 * @param {string} content - Contenido del comentario.
 * @param {string} token - Token de autenticación.
 */
export async function createComment(articleId, content, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${articleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            throw new Error('Error al crear el comentario');
        }

        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Actualiza un comentario existente.
 * @param {string} commentId - ID del comentario.
 * @param {string} content - Nuevo contenido del comentario.
 * @param {string} token - Token de autenticación.
 */
export async function updateComment(commentId, content, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el comentario');
        }

        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Elimina un comentario.
 * @param {string} commentId - ID del comentario.
 * @param {string} token - Token de autenticación.
 */
export async function deleteComment(commentId, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el comentario');
        }

        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}
