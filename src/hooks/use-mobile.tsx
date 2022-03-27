import { useEffect, useState } from 'react';

export function useMobile(): boolean {
  const mediaQuery = window.matchMedia('(max-width: 600px)');

  const [isMobile, setIsMobile] = useState(mediaQuery.matches);
  useEffect(() => {
    const handler = () => {
      return setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addListener(handler);

    return () => mediaQuery.removeListener(handler);
  }, []);

  return isMobile;
}
