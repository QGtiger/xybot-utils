/* eslint-disable no-param-reassign */
import { isDate } from 'xybot-utils';

const zhCNI18N = [
  ['刚刚', '刚刚'],
  ['%s 秒前', '%s 秒后'],
  ['1 分钟前', '1 分钟后'],
  ['%s 分钟前', '%s 分钟后'],
  ['1 小时前', '1 小时后'],
  ['%s 小时前', '%s 小时后'],
  ['1 天前', '1 天后'],
  ['%s 天前', '%s 天后'],
  ['1 周前', '1 周后'],
  ['%s 周前', '%s 周后'],
  ['1 月前', 'in 1 月后'],
  ['%s 月前', '%s 月后'],
  ['1 年前', '1 年后'],
  ['%s 年前', '%s 年后'],
];

const secArr = [60, 60, 24, 7, 365 / 7 / 12, 12];
const secArrLen = secArr.length;

function format(diff: number, i: number, ago: boolean) {
  return zhCNI18N[i][ago ? 0 : 1].replace('%s', diff + '');
}

const invalidDateKey = 'Invalid Date';
function isInvalidDate(date: any): boolean {
  if (date + '' === invalidDateKey) return true;
  return false;
}

export function timeAge(date: any, now?: any) {
  if (!isDate(date)) date = new Date(date);
  if (isInvalidDate(date)) return;

  now = now || new Date();
  if (!isDate(now)) now = new Date(now);
  if (isInvalidDate(now)) return;

  let diff = (now - date) / 1000;
  let i = 0;
  const ago = diff > 0;

  diff = Math.abs(diff);

  while (diff >= secArr[i] && i < secArrLen) {
    diff /= secArr[i];
    i++;
  }

  diff = Math.floor(diff);
  i *= 2;

  if (diff > (i === 0 ? 9 : 1)) i += 1;

  return format(diff, i, ago);
}
