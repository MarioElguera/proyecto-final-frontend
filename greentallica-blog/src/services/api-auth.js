import { handleApiError } from '@/utils/handleErrors';
import { handleResponse } from '@/utils/handleResponse';

// URL base de autenticación
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + 'auth';

/**
 * Registra un nuevo usuario.
 *
 * @param {Object} credentials - { username: string, password: string }
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
        throw handleApiError(error);
    }
}

/**
 * Inicia sesión de un usuario.
 *
 * @param {Object} credentials - { username: string, password: string }
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
        throw handleApiError(error);
    }
}
