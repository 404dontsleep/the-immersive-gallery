import { ConfigProvider } from 'antd';
import { createContext } from 'react';
import { useBaseContext } from './useBaseContext';
import merge from 'lodash/merge';
export type BaseContextProviderProps = {
  readOnly?: boolean;
};

const BaseContext = createContext<BaseContextProviderProps>({});

const BaseContextProvider = ({
  children,
  ...props
}: BaseContextProviderProps & { children: React.ReactNode }) => {
  const parentContext = useBaseContext();
  return (
    <BaseContext.Provider value={merge(parentContext, props)}>
      <ConfigProvider
        typography={{
          className: 'mx-3',
        }}
      >
        {children}
      </ConfigProvider>
    </BaseContext.Provider>
  );
};

export default BaseContextProvider;
export { BaseContext };
