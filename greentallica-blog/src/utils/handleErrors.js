/**
 * Maneja errores HTTP comunes y devuelve mensajes de error personalizados.
 *
 * @param {Error} error - El error capturado (normalmente de una petición fetch o axios).
 * @returns {string} - Mensaje de error amigable para el usuario.
 */
export function handleApiError(error) {
    if (!error.response) {
        // Error de red o servidor caído
        return 'Error de conexión. Por favor, revisa tu conexión a internet o inténtalo más tarde.';
    }

    const { status, data } = error.response;

    switch (status) {
        case 400:
            return data?.message || 'Solicitud incorrecta. Verifica los datos enviados.';
        case 401:
            return 'No autorizado. Por favor, inicia sesión.';
        case 403:
            return 'Acceso prohibido. No tienes permiso para realizar esta acción.';
        case 404:
            return 'Recurso no encontrado.';
        case 409:
            return data?.message || 'Conflicto en la solicitud. Puede que el recurso ya exista.';
        case 422:
            return data?.message || 'Error de validación. Revisa los datos ingresados.';
        case 500:
            return 'Error interno del servidor. Estamos trabajando para solucionarlo.';
        default:
            return data?.message || 'Ocurrió un error inesperado. Intenta de nuevo.';
    }
}
