import { isArrLike } from './typeCheck';

/**
 * 转化为数组，如果是类数组也转化下
 * @param val
 * @returns
 */
export function toArr(val: any) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (isArrLike(val) && typeof val !== 'string') return [...val];
  return [val];
}
