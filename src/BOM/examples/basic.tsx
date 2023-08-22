/**
 * description: Material UI 样式增强器
 */

import React from 'react';
import { MaterialButtonLog, MaterialConsole } from 'xybot-utils';

const YellowMaterialConsole = new MaterialButtonLog({
  type: 'orange',
  logName: '橙色Console',
});

export default () => {
  return (
    <>
      <button
        type="button"
        className="test"
        onClick={() => {
          MaterialConsole.log('Material UI Log');
        }}
      >
        default style
      </button>
      <button
        type="button"
        onClick={() => {
          YellowMaterialConsole.log('233');
        }}
      >
        console
      </button>
    </>
  );
};
