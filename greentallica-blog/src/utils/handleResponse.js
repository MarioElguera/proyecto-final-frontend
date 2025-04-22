/**
 * Maneja la respuesta de una petición fetch.
 *
 * @param {Response} response - Objeto de respuesta de fetch.
 * @returns {Promise<Object>} - Datos parseados si todo salió bien.
 * @throws {Error} - Error enriquecido si la respuesta no fue exitosa.
 */
export async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data?.message || 'Error desconocido');
        error.status = response.status;
        error.response = data;
        throw error;
    }

    return data;
}
