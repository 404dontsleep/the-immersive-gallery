import { useEffect } from 'react';
import { AXIOS_INSTANCE } from '../../../shared/mutator';
import { type FormInstance } from 'antd';

export function useAxiosInterceptor(formInstance: FormInstance) {
  useEffect(() => {
    const interceptor = AXIOS_INSTANCE.interceptors.response.use(
      (response) => response,
      (error) => {
        try {
          if (formInstance && error.response?.status === 422) {
            formInstance.setFields(error.response.data.errors);
          }
        } catch (error) {
          console.error(error);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      AXIOS_INSTANCE.interceptors.response.eject(interceptor);
    };
  }, [formInstance]);
}
