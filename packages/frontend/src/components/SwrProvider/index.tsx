import useAuthStore from '@/stores/auth.store';
import { App } from 'antd';
import type { AxiosError, AxiosResponse } from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { AXIOS_INSTANCE } from '../../../../shared/mutator';

const SwrProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { setAccessToken } = useAuthStore();
  const { message } = App.useApp();
  const navigate = useNavigate();

  const handleError = useCallback(
    (
      error: AxiosError<{
        error: string;
        message: string;
        statusCode: number;
      }>,
    ) => {
      if (error.status === 401) {
        message.error('Unauthorized');
        setAccessToken(null);
        navigate('/auth');
      } else {
        if (error.status === 403) {
          message.error('Forbidden');
        } else {
          if (error.status === 404) {
            message.error('Not Found');
          } else {
            if (error.status === 500) {
              message.error('Internal Server Error');
            } else {
              if (error.response?.data?.message) {
                message.error(error.response?.data?.message);
              }
            }
          }
        }
      }
      throw error;
    },
    [message, setAccessToken, navigate],
  );

  const handleSuccess = useCallback(
    (response: AxiosResponse<unknown>) => {
      const method = response.config.method;
      if (method?.toUpperCase() === 'POST') {
        message.success('Create successful');
      } else if (method?.toUpperCase() === 'PUT') {
        message.success('Update successful');
      } else if (method?.toUpperCase() === 'DELETE') {
        message.success('Delete successful');
      }
      return response;
    },
    [message],
  );

  useEffect(() => {
    const interceptor = AXIOS_INSTANCE.interceptors.response.use(
      handleSuccess,
      handleError,
    );
    return () => {
      AXIOS_INSTANCE.interceptors.response.eject(interceptor);
    };
  }, [handleError, handleSuccess]);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        revalidateOnMount: true,
        revalidateIfStale: false,
        onError: handleError,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
