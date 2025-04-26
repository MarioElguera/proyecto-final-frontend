/**
 * Maneja los errores de una petición HTTP y devuelve un mensaje amigable para el usuario.
 *
 * @param {Object} error - Error capturado durante la petición.
 * @returns {string} - Mensaje de error procesado para mostrar en el frontend.
 */
export function handleApiError(error) {
    if (!error) {
        return 'Ocurrió un error inesperado. Intenta de nuevo.';
    }

    if (error.response && error.status) {
        const { status, message } = error.response;

        const statusMessages = {
            400: 'Solicitud incorrecta.',
            401: 'No autorizado. Por favor, inicia sesión.',
            403: 'Acceso prohibido.',
            404: 'Recurso no encontrado.',
            409: 'Conflicto en la solicitud.',
            422: 'Error de validación de datos.',
            500: 'Error interno del servidor.',
        };

        return message || statusMessages[status] || 'No se pudo cargar la información.';
    }

    return 'No se pudo cargar la información.';
}
