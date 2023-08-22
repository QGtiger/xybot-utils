/**
 * title: timeAge 格式化
 * description: timeAge 格式化
 */

import React from 'react';
import { timeAge } from 'xybot-utils';

export default () => {
  const now = new Date();
  return [now.setFullYear(now.getFullYear() - 2)].map((t) => {
    const nt = new Date(t);
    return (
      <p key={t}>
        {nt.toLocaleDateString()}: {timeAge(t)}
      </p>
    );
  });
};
