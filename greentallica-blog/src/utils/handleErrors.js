export function handleApiError(error) {
    console.log("handleApiError => ", error)
    if (!error) return 'Ocurrió un error inesperado. Intenta de nuevo.';

    if (error.response && error.status) {
        const { status, message } = error.response;
        switch (status) {
            case 400:
                return message || 'Solicitud incorrecta.';
            case 401:
                return message || 'No autorizado. Por favor, inicia sesión.';
            case 403:
                return message || 'Acceso prohibido.';
            case 404:
                return message || 'Recurso no encontrado.';
            case 409:
                return message || 'Conflicto en la solicitud.';
            case 422:
                return message || 'Error de validación.';
            case 500:
                return message || 'Error interno del servidor.';
            default:
                return message || 'Ocurrió un error inesperado.';
        }
    }

    // Si no hay status, devolver el mensaje de error o genérico
    return 'Ocurrió un error inesperado.';
}
