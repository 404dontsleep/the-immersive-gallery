import { MenuMode, useMenuStore } from '@/stores/menu.store';
import { Fullscreen } from '@react-three/uikit';
import { useEffect } from 'react';

export type WebProviderProps = {
  children: React.ReactNode;
};

export default function WebProvider({ children }: WebProviderProps) {
  const { setMode } = useMenuStore();
  useEffect(() => {
    setMode(MenuMode.WEB);
    return () => {
      setMode(MenuMode.XR);
    };
  }, [setMode]);
  return <Fullscreen>{children}</Fullscreen>;
}
