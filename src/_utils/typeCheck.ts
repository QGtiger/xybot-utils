import { objToStr } from './_utils';

export function isDate(obj: any) {
  return objToStr(obj) === 'Date';
}

export function isBlob(val: any): boolean {
  return objToStr(val) === 'Blob';
}

/**
 * 判断是否是函数
 * @param val 入参
 * @returns 是否是function
 */
export function isFn(val: any) {
  const obj2Str = toString.call(val);

  return (
    obj2Str === '[object Function]' ||
    obj2Str === '[object GeneratorFunction]' ||
    obj2Str === '[object AsyncFunction]'
  );
}

/**
 * 判断是否是Number
 * @param val 入参
 * @returns 是否是Number
 */
export function isNum(val: any) {
  return toString.call(val) === '[object Number]';
}

/**
 * 是否是类数组
 * @param val
 * @returns
 */
export function isArrLike(val: any) {
  if (!val) return false;

  const len = val.length;

  return isNum(len) && len >= 0 && !isFn(val);
}

export function isBrowser() {
  return (
    typeof window === 'object' &&
    typeof document === 'object' &&
    document.nodeType === 9
  );
}
