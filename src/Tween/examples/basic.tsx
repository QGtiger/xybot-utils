/**
 * description: Material UI 样式增强器
 */

import React, { useMemo, useRef } from 'react';
import { Tween } from 'xybot-utils';

export default () => {
  const box = useRef<any>();

  const tween = useMemo(() => {
    const obj = { t: 0 };
    const tween = new Tween(obj);
    tween.addEventListener('update', function () {
      box.current!.style.transform = `translateX(${obj.t}px)`;
    });
    return tween;
  }, []);

  const move = () => {
    tween
      .to(
        {
          t: 200,
        },
        2000,
        'inCubic',
      )
      .play();
  };

  const pause = () => {
    tween.pause();
  };

  return (
    <>
      <div
        className="box"
        ref={box}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#000000',
        }}
      ></div>
      <button
        type="button"
        className="test"
        onClick={() => {
          move();
        }}
      >
        Move
      </button>
      <button type="button" onClick={pause}>
        pause
      </button>
    </>
  );
};
