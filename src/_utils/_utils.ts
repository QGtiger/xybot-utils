export const toString = Object.prototype.toString;

export function objToStr(val: any) {
  return toString.call(val).slice(8, -1);
}
