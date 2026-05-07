import { useCallback, useEffect, useState } from 'react';

export const useErrorMessage = (delay = 3000) => {
  const [error, setError] = useState<string | null>(null);

  const showErrorMessage = useCallback((message: string | null) => {
    setError(message);
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), delay);

      return clearTimeout(timer);
    }
  }, [error, delay]);

  return [error, showErrorMessage] as const;
};
