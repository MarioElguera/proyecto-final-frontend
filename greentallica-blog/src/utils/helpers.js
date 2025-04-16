// utils/helpers.js

/**
 * Formatea una fecha ISO a formato DD/MM/YYYY.
 * @param {string} isoDate - Fecha en formato ISO.
 * @returns {string} La fecha formateada en DD/MM/YYYY.
 */
export function formatDate(isoDate) {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}
