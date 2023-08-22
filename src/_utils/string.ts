/**
 * 首字符大写
 * @param str 字符串
 * @returns 首字符大写
 */
export function upperFirst(str: string) {
  if (str.length < 1) return str;

  return str[0].toUpperCase() + str.slice(1);
}
