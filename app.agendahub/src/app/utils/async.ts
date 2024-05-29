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
