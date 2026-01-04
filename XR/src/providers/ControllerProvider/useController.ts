import { useContext } from 'react';
import { ControllerContext } from './context';

export function useController() {
  const context = useContext(ControllerContext);
  if (!context) {
    throw new Error('useController must be used within a ControllerProvider');
  }
  return context;
}
