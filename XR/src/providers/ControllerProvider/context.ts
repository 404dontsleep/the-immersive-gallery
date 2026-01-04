import { createContext } from 'react';
import type { ControllerState } from './types';

export const ControllerContext = createContext<ControllerState | null>(null);
