import { useContext } from 'react';
import { BaseContext } from './BaseContextProvider';

export function useBaseContext() {
  const context = useContext(BaseContext);
  if (!context) {
    return {
      readOnly: false,
    };
  }
  return context;
}
