import {
  usePermission,
  type EnumPermissionOrString,
} from '@/hooks/usePermission';
import { Result } from 'antd';
import { useMemo } from 'react';

type SysPermissionProps = {
  children?: React.ReactNode | ((isAllow: boolean) => React.ReactNode);
  requiredPermissions:
    | EnumPermissionOrString
    | EnumPermissionOrString[]
    | EnumPermissionOrString[][];
  fallback?: boolean;
  fallbackComponent?: React.ReactNode;
};

export default function SysPermission({
  children,
  requiredPermissions,
  fallback = false,
  fallbackComponent = (
    <Result
      status="warning"
      title="403"
      subTitle="You are not allowed to access this page."
    />
  ),
}: SysPermissionProps) {
  const { isPermissionGranted } = usePermission();

  const finalPermissions = useMemo(() => {
    if (Array.isArray(requiredPermissions)) {
      if (
        requiredPermissions.every((permission) => Array.isArray(permission))
      ) {
        return requiredPermissions;
      }
      return [requiredPermissions];
    }
    return [[requiredPermissions]];
  }, [requiredPermissions]);

  const isAllow = useMemo(() => {
    return finalPermissions.some((permission) =>
      permission.every((p) => isPermissionGranted(p)),
    );
  }, [finalPermissions, isPermissionGranted]);

  if (!children) return null;

  if (typeof children === 'function') {
    return children(isAllow);
  }

  return isAllow ? children : fallback ? fallbackComponent : null;
}
