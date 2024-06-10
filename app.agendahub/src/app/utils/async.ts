export const futureIf = <T>(condition: boolean, callback: () => T, ticks = 100): Promise<T> => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (condition) {
        clearInterval(interval);
        resolve(callback());
      }
    }, ticks);
  });
};

export function defer(cb: () => void, delay = 0) {
  setTimeout(() => {
    cb && cb();
  }, delay);
}
