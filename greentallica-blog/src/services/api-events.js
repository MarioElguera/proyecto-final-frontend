import { handleApiError } from '@/utils/handleErrors';

// URL base de eventos
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/events';

/**
 * Obtiene todos los eventos.
 */
export async function getAllEvents() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (!response.ok) {
            throw new Error('Error al obtener los eventos');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Obtiene un evento por su ID.
 * @param {string} eventId - ID del evento.
 */
export async function getEventById(eventId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${eventId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el evento');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Crea un nuevo evento.
 * @param {Object} eventData - Datos del evento (title, text, image, link, author).
 * @param {string} token - Token JWT del usuario autenticado.
 */
export async function createEvent(eventData, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            throw new Error('Error al crear el evento');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Actualiza un evento existente.
 * @param {string} eventId - ID del evento.
 * @param {Object} eventData - Datos actualizados del evento.
 * @param {string} token - Token JWT del usuario autenticado.
 */
export async function updateEvent(eventId, eventData, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el evento');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Elimina un evento.
 * @param {string} eventId - ID del evento.
 * @param {string} token - Token JWT del usuario autenticado.
 */
export async function deleteEvent(eventId, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el evento');
        }
        return await response.json();
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}
