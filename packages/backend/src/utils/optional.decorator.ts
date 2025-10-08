export default function Optional<T extends any[]>(
  decorator: (...args: T) => MethodDecorator,
  enabled: boolean,
  ...args: T
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    if (enabled) {
      decorator(...args)(target, propertyKey, descriptor);
    }
  };
}
