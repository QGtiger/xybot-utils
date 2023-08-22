import { isBlob, objToStr, toArr } from 'xybot-utils/_utils';

const defOpts = {
  type: 'text/plain',
};

/**
 *
 * @param data 数据
 * @param options
 * @returns
 */
export function createUrl(data: any, options?: BlobPropertyBag) {
  const finalOpts = Object.assign({}, defOpts, options);
  if (!isBlob(data) && objToStr(data) !== 'File') {
    data = new Blob(toArr(data), finalOpts);
  }

  return URL.createObjectURL(data);
}

export function download(data: any, name: string, type?: string) {
  const el = document.createElement('a');
  el.setAttribute('href', createUrl(data, { type }));
  el.setAttribute('download', name);
  el.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
  });

  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

export * from './MaterialLog';
