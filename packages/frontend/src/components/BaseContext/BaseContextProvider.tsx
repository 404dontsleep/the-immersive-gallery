import { ConfigProvider } from 'antd';
import { createContext } from 'react';
export type BaseContextProviderProps = {
  readOnly?: boolean;
};

const BaseContext = createContext<BaseContextProviderProps>({});

const BaseContextProvider = ({
  children,
  ...props
}: BaseContextProviderProps & { children: React.ReactNode }) => {
  return (
    <BaseContext.Provider value={props}>
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
