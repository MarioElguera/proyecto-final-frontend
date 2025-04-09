const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/comments';

/**
 * Obtener todos los comentarios (opcional)
 */
export async function getAllComments() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (!response.ok) {
            throw new Error('Error al obtener los comentarios');
        }
        return await response.json();
    } catch (error) {
        console.error('getAllComments error:', error.message);
        throw error;
    }
}

/**
 * Obtener comentarios de un artículo específico
 * @param {string} articleId
 */
export async function getCommentsByArticle(articleId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${articleId}`);
        if (!response.ok) {
            throw new Error('Error al obtener los comentarios del artículo');
        }
        return await response.json();
    } catch (error) {
        console.error('getCommentsByArticle error:', error.message);
        throw error;
    }
}

/**
 * Crear un nuevo comentario
 * @param {string} articleId
 * @param {string} content
 * @param {string} token - JWT del usuario autenticado
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
        console.error('createComment error:', error.message);
        throw error;
    }
}

/**
 * Actualizar un comentario
 * @param {string} commentId
 * @param {string} content
 * @param {string} token
 */
export async function updateComment(commentId, content, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el comentario');
        }
        return await response.json();
    } catch (error) {
        console.error('updateComment error:', error.message);
        throw error;
    }
}

/**
 * Eliminar un comentario
 * @param {string} commentId
 * @param {string} token
 */
export async function deleteComment(commentId, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el comentario');
        }
        return await response.json();
    } catch (error) {
        console.error('deleteComment error:', error.message);
        throw error;
    }
}
