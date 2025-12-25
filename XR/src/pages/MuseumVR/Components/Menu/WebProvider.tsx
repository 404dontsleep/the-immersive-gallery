import { MenuMode, useMenuStore } from '@/stores/menu.store';
import { Fullscreen } from '@react-three/uikit';
import { Button } from '@react-three/uikit-default';
import { useEffect } from 'react';
import { MenuIcon } from '@react-three/uikit-lucide';

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
  return (
    <Fullscreen>
      <OpenMenuButton />
      {children}
    </Fullscreen>
  );
}

function OpenMenuButton() {
  const { goBack, currentMenu } = useMenuStore();
  if (currentMenu) return null;
  return (
    <Button
      positionType={'absolute'}
      positionTop={20}
      positionRight={20}
      onClick={() => goBack()}
      variant="outline"
    >
      <MenuIcon height={20} width={20} />
    </Button>
  );
}
