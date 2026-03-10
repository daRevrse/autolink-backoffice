/**
 * Formate un montant en Franc CFA (XOF)
 * @param {number|string} amount 
 * @returns {string}
 */
export const formatFCFA = (amount) => {
  if (amount === undefined || amount === null || amount === '') return '0 F';
  const val = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : amount;
  return new Intl.NumberFormat('fr-FR').format(val) + ' F';
};

/**
 * Formate une date ISO en string lisible (DD/MM/YYYY)
 * @param {string} isoString 
 * @returns {string}
 */
export const formatDate = (isoString) => {
  if (!isoString) return '—';
  try {
    const date = new Date(isoString);
    return new Intl.NumberFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date).replace(/\./g, '/');
  } catch (e) {
    return isoString;
  }
};

/**
 * Formate une date ISO en string lisible avec heure (DD/MM/YYYY HH:mm)
 * @param {string} isoString 
 * @returns {string}
 */
export const formatDateTime = (isoString) => {
  if (!isoString) return '—';
  try {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (e) {
    return isoString;
  }
};
