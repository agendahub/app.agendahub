export function defer(timeout = 0) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, timeout);
    };

    return descriptor;
  };
}