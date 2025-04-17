const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/events';
import { handleApiError } from '@/utils/handleErrors';
/**
 * Obtener todos los eventos.
 */
export async function getAllEvents() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        if (!response.ok) {
            throw new Error('Error al obtener los eventos');
        }
        return await response.json();
    } catch (error) {
        const mensajeError = handleApiError(error);
        console.error(mensajeError);
        console.error('getAllEvents error:', error.message);
        throw error;
    }
}

/**
 * Obtener un evento por su ID.
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
        const mensajeError = handleApiError(error);
        console.error(mensajeError);
        console.error('getEventById error:', error.message);
        throw error;
    }
}

/**
 * Crear un nuevo evento.
 * @param {Object} eventData - Objeto con los datos del evento (title, text, image, link, author).
 * @param {string} token - JWT del usuario autenticado.
 */
export async function createEvent(eventData, token) {
    console.log("createEvent", eventData, token)
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(eventData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el evento');
        }
        return await response.json();
    } catch (error) {
        const mensajeError = handleApiError(error);
        console.error(mensajeError);
        console.error('createEvent error:', error.message);
        throw error;
    }
}

/**
 * Actualizar un evento existente.
 * @param {string} eventId - ID del evento a actualizar.
 * @param {Object} eventData - Objeto con los datos actualizados del evento.
 * @param {string} token - JWT del usuario autenticado.
 */
export async function updateEvent(eventId, eventData, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(eventData)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el evento');
        }
        return await response.json();
    } catch (error) {
        const mensajeError = handleApiError(error);
        console.error(mensajeError);
        console.error('updateEvent error:', error.message);
        throw error;
    }
}

/**
 * Eliminar un evento.
 * @param {string} eventId - ID del evento a eliminar.
 * @param {string} token - JWT del usuario autenticado.
 */
export async function deleteEvent(eventId, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el evento');
        }
        return await response.json();
    } catch (error) {
        const mensajeError = handleApiError(error);
        console.error(mensajeError);
        console.error('deleteEvent error:', error.message);
        throw error;
    }
}
