// services/auth.js

const API_BASE_URL = 'http://localhost:5000/auth';
import { handleApiError } from '@/utils/handleErrors';
/**
 * Registra un nuevo usuario.
 * @param {Object} credentials - Objeto con `username` y `password`.
 * @returns {Promise<Object>} - Mensaje de éxito si el registro es exitoso.
 */
export async function registerUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        return data;

    } catch (error) {
        const mensajeError = handleApiError(error);
        console.error(mensajeError);
        console.error('Error registering user:', error.message);
        throw error;
    }
}

/**
 * Inicia sesión con un usuario existente.
 * @param {Object} credentials - Objeto con `username` y `password`.
 * @returns {Promise<string>} - Token JWT si el login es exitoso.
 */
export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;

    } catch (error) {
        const mensajeError = handleApiError(error);
        console.error(mensajeError);
        console.error('Error logging in:', error.message);
        throw error;
    }
}
