import { EnumPermission, useAuthControllerMe } from '@api';
import { useMemo } from 'react';

export type EnumPermissionOrString = EnumPermission | (string & {});

export function usePermission() {
  const { data, isLoading, error } = useAuthControllerMe();

  const permissions = useMemo(() => {
    return data?.permissions ?? [];
  }, [data]);

  const isPermissionGranted = (permission: EnumPermissionOrString) => {
    return permissions.includes(permission) ?? false;
  };

  return {
    permissions,
    isPermissionGranted,
    isLoading,
    error,
  };
}
