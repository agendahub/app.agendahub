export function until<T = any>(fnCheck: (context: T) => boolean, timeout = 100) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const interval = setInterval(() => {
        if (fnCheck(this as T)) {
          clearInterval(interval);
          originalMethod.apply(this, args);
        }
      }, timeout);
    };

    return descriptor;
  };
}
