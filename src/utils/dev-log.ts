export const devLog = (...args: any[]) => {
  if (location.hostname === 'localhost') {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};
