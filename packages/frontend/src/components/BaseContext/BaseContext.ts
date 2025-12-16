import { createContext } from 'react';

export type BaseContextProviderProps = {
  readOnly?: boolean;
};
const BaseContext = createContext<BaseContextProviderProps>({});
export default BaseContext;
