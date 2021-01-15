export const isFunction = (fn) => typeof fn === 'function';
export const notEmptyObj = (obj) => Boolean(typeof obj === 'object' && Object.keys(obj).length);
export const hasKeys = notEmptyObj;
