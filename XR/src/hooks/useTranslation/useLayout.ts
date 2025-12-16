import { useEffect, useState } from 'react';

export enum Orientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

export function useLayout() {
  const getOrientation = () => {
    if (typeof window === 'undefined') return Orientation.PORTRAIT;
    return window.innerWidth > window.innerHeight
      ? Orientation.LANDSCAPE
      : Orientation.PORTRAIT;
  };

  const [orientation, setOrientation] = useState<Orientation>(getOrientation());

  useEffect(() => {
    const handleResize = () => {
      setOrientation(getOrientation());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return orientation;
}
