// services/api-comments.js

import { handleApiError } from '@/utils/handleErrors';

// URL base de comentarios
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/comments';

// Función para manejar la respuesta de fetch
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
 * Obtiene todos los comentarios.
 */
export async function getAllComments() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        return await handleResponse(response);
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
        return await handleResponse(response);
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

        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Actualiza un comentario existente.
 * @param {string} commentId - ID del comentario.
 * @param {string} content - Nuevo contenido.
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

        return await handleResponse(response);
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

        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}
