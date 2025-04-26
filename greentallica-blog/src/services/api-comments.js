import { handleApiError } from '@/utils/handleErrors';
import { handleResponse } from '@/utils/handleResponse';

// URL base de comentarios
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/comments';

/**
 * Obtiene todos los comentarios.
 *
 * @returns {Promise<Array>} - Lista de comentarios.
 */
export async function getAllComments() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        return await handleResponse(response);
    } catch (error) {
        throw handleApiError(error);
    }
}

/**
 * Obtiene los comentarios de un artículo específico.
 *
 * @param {string} articleId - ID del artículo.
 * @returns {Promise<Array>} - Comentarios del artículo.
 */
export async function getCommentsByArticle(articleId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${articleId}`);
        return await handleResponse(response);
    } catch (error) {
        throw handleApiError(error);
    }
}

/**
 * Crea un nuevo comentario en un artículo.
 *
 * @param {string} articleId - ID del artículo.
 * @param {string} content - Contenido del comentario.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} - Comentario creado.
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
        return await handleResponse(response);
    } catch (error) {
        throw handleApiError(error);
    }
}

/**
 * Actualiza un comentario existente.
 *
 * @param {string} commentId - ID del comentario.
 * @param {string} content - Nuevo contenido.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} - Comentario actualizado.
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
        return await handleResponse(response);
    } catch (error) {
        throw handleApiError(error);
    }
}

/**
 * Elimina un comentario.
 *
 * @param {string} commentId - ID del comentario.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} - Resultado de la eliminación.
 */
export async function deleteComment(commentId, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
            },
        });
        return await handleResponse(response);
    } catch (error) {
        throw handleApiError(error);
    }
}
