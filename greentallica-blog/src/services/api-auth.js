// services/auth.js

import { handleApiError } from '@/utils/handleErrors';

// URL base de autenticación
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL + '/auth';

/**
 * Registra un nuevo usuario.
 * @param {Object} credentials - Objeto con `username` y `password`.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export async function registerUser(credentials) {
    try {
        // Realiza la petición al endpoint de registro
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        // Si la respuesta no es exitosa, lanza error
        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar usuario');
        }

        return data;
    } catch (error) {
        // Manejo del error con función utilitaria
        console.error(handleApiError(error));
        throw error;
    }
}

/**
 * Inicia sesión de usuario.
 * @param {Object} credentials - Objeto con `username` y `password`.
 * @returns {Promise<Object>} - Token y datos del usuario si es válido.
 */
export async function loginUser(credentials) {
    try {
        // Realiza la petición al endpoint de login
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        // Si la respuesta no es exitosa, lanza error
        if (!response.ok) {
            throw new Error(data.message || 'Error al iniciar sesión');
        }

        return data;
    } catch (error) {
        // Manejo del error con función utilitaria
        console.error(handleApiError(error));
        throw error;
    }
}
