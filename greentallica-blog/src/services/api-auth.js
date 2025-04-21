// services/api-auth.js

import { handleApiError } from '@/utils/handleErrors';

// URL base de autenticación
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/auth';

// Función para manejar la respuesta
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
 * Registra un nuevo usuario.
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>} - Datos del usuario registrado.
 */
export async function registerUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Inicia sesión de un usuario.
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>} - Token y datos de sesión.
 */
export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        return await handleResponse(response);
    } catch (error) {
        console.error(handleApiError(error));
        throw error;
    }
}
