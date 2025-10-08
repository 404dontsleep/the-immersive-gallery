import { useEffect } from 'react';

export default function useLoop(callback: () => void, delay: number) {
  useEffect(() => {
    const interval = setInterval(callback, delay);
    return () => clearInterval(interval);
  }, [callback, delay]);
}
