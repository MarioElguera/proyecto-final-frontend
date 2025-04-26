import { handleApiError } from '@/utils/handleErrors';
import { handleResponse } from '@/utils/handleResponse';

// URL base de eventos
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/events';

/**
 * Obtiene todos los eventos.
 *
 * @returns {Promise<Array>} - Lista de eventos.
 */
export async function getAllEvents() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        return await handleResponse(response);
    } catch (error) {
        throw handleApiError(error);
    }
}

/**
 * Obtiene un evento por su ID.
 *
 * @param {string} eventId - ID del evento.
 * @returns {Promise<Object>} - Datos del evento.
 */
export async function getEventById(eventId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${eventId}`);
        return await handleResponse(response);
    } catch (error) {
        throw handleApiError(error);
    }
}

/**
 * Crea un nuevo evento.
 *
 * @param {Object} eventData - Datos del nuevo evento.
 * @param {string} token - Token JWT de autenticación.
 * @returns {Promise<Object>} - Evento creado.
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
        return await handleResponse(response);
    } catch (error) {
        throw handleApiError(error);
    }
}

/**
 * Actualiza un evento existente.
 *
 * @param {string} eventId - ID del evento.
 * @param {Object} eventData - Datos actualizados del evento.
 * @param {string} token - Token JWT de autenticación.
 * @returns {Promise<Object>} - Evento actualizado.
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
        return await handleResponse(response);
    } catch (error) {
        throw handleApiError(error);
    }
}

/**
 * Elimina un evento.
 *
 * @param {string} eventId - ID del evento.
 * @param {string} token - Token JWT de autenticación.
 * @returns {Promise<Object>} - Resultado de eliminación.
 */
export async function deleteEvent(eventId, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/${eventId}`, {
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
