import { useEffect } from 'react';

export function useKeyboard(handlers: Record<string, () => void>) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (handlers[e.key]) {
        e.preventDefault();
        handlers[e.key]();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handlers]);
}
