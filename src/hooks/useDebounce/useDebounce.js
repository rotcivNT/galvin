import { useState, useEffect } from 'react';

export const useDebounce = (query, delayTime) => {
  const [debouncedValue, setDebouncedValue] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query);
    }, delayTime);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delayTime]);

  return debouncedValue;
};
