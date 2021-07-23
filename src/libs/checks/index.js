export const isFunction = (fn) => typeof fn === 'function';
export const notEmptyObj = (obj) => Boolean(typeof obj === 'object' && Object.keys(obj).length);
export const hasKeys = notEmptyObj;
export const objectHasLength = (obj) => (
  typeof obj === 'object'
  && !Array.isArray(obj)
  && Boolean(Object.keys(obj).length)
);
