import { useState, useEffect } from 'react';

/**
 * Hook pour débouncer une valeur
 * @param {any} value - La valeur à débouncer
 * @param {number} delay - Le délai en ms (par défaut 500ms)
 * @returns {any} - La valeur débouncée
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
