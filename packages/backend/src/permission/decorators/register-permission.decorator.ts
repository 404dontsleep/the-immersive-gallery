import 'reflect-metadata';

export const REGISTER_PERMISSIONS_KEY = Symbol('REGISTER_PERMISSIONS_KEY');
export const GUARD_PERMISSIONS_KEY = Symbol('GUARD_PERMISSIONS_KEY');
export const DESCRIPTION_PERMISSIONS_KEY = Symbol(
  'DESCRIPTION_PERMISSIONS_KEY',
);

export enum DefaultParentName {
  Unspecified = 'Unspecified',
  Admin = 'Admin',
  User = 'User',
  Root = 'Root',
}
export const DefaultPermissionName = {
  View: 'View',
  Create: 'Create',
  Update: 'Update',
  Delete: 'Delete',
} as const;

export const RegistedPermission = {};

export type RegisterPermissionType = {
  [key: string]: string[];
};
export type RegisterPermissionDescriptionType = {
  [key: string]: string;
};

export function RegisterPermissionMethod(options: {
  name?:
    | keyof typeof DefaultPermissionName
    | (string & `${Uppercase<string>}${string}`);
  description?: string;
  parentNames?: string[];
}): MethodDecorator {
  return target => {
    const existing: RegisterPermissionType =
      Reflect.getMetadata(REGISTER_PERMISSIONS_KEY, target.constructor) || {};
    if (!existing[options.name]) {
      existing[options.name] = options.parentNames || [];
    }
    Reflect.defineMetadata(
      REGISTER_PERMISSIONS_KEY,
      existing,
      target.constructor,
    );

    // Description
    const description: RegisterPermissionDescriptionType =
      Reflect.getMetadata(DESCRIPTION_PERMISSIONS_KEY, target.constructor) ||
      {};

    const existingDescription = description[options.name];
    if (!existingDescription) {
      description[options.name] = options.description;
    }
    Reflect.defineMetadata(
      DESCRIPTION_PERMISSIONS_KEY,
      description,
      target.constructor,
    );
  };
}

export function RegisterPermission(options: {
  name: string;
  description?: string;
  parentNames?: string[];
}): ClassDecorator {
  const parentNames = [DefaultParentName.Root, ...(options.parentNames || [])];
  return target => {
    const name = options.name || target.name;
    const registeredPermissions: RegisterPermissionType =
      Reflect.getMetadata(REGISTER_PERMISSIONS_KEY, target) || {};
    const test = Object.keys(registeredPermissions)
      .map(key => ({
        [`${name}.${key}`]: [...registeredPermissions[key], options.name],
      }))
      .flat();

    const finalRegisteredPermissions: RegisterPermissionType = {};
    test.forEach(item => {
      Object.assign(finalRegisteredPermissions, item);
    });

    finalRegisteredPermissions[name] = parentNames.includes(
      DefaultParentName.Root,
    )
      ? [...parentNames, DefaultParentName.Root]
      : parentNames;

    Reflect.defineMetadata(
      REGISTER_PERMISSIONS_KEY,
      finalRegisteredPermissions,
      target,
    );

    // Description
    const description: RegisterPermissionDescriptionType =
      Reflect.getMetadata(DESCRIPTION_PERMISSIONS_KEY, target) || {};
    const newDescription = Object.keys(description).map(key => ({
      [`${name}.${key}`]: description[key],
    }));
    const finalDescription = {};
    newDescription.forEach(item => {
      Object.assign(finalDescription, item);
    });
    if (!finalDescription[name]) {
      finalDescription[name] = options.description;
    }

    Object.keys(finalRegisteredPermissions).forEach(key => {
      RegistedPermission[key] = key;
    });

    Reflect.defineMetadata(
      DESCRIPTION_PERMISSIONS_KEY,
      finalDescription,
      target,
    );
  };
}

export function RequirePermission(permissionName: string): MethodDecorator {
  return (_target, _propertyKey, descriptor) => {
    Reflect.defineMetadata(
      GUARD_PERMISSIONS_KEY,
      permissionName,
      descriptor.value,
    );
  };
}