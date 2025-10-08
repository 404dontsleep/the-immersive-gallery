export interface SysConfigProvide {
  key: string;
  description: string;
  value: any;
  allowPermission: string[];
}

export const defineConfig = ({
  key,
  description,
  value,
  allowPermission,
}: {
  key: string;
  description: string;
  value: any;
  allowPermission: string[];
}): SysConfigProvide => {
  if (!key) {
    throw new Error('Key is required');
  }
  if (!description) {
    throw new Error('Description is required');
  }
  if (!value) {
    throw new Error('Value is required');
  }
  if (!allowPermission) {
    throw new Error('Allow permission is required');
  }
  return {
    key: key,
    description: description,
    value: value,
    allowPermission: allowPermission,
  };
};
