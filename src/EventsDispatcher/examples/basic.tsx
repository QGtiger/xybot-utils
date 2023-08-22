/**
 * title: 事件派发器
 * description: 事件派发器
 */

import React, { useEffect } from 'react';
import { EventsDispatcher } from 'xybot-utils';

const emitIns = new EventsDispatcher();

export default () => {
  useEffect(() => {
    emitIns.addEventListener('onClick', function (e) {
      console.log('event invoke: ', e.type);
    });
    return () => {
      emitIns.removeAllEventListener();
    };
  }, []);
  return (
    <button
      type="button"
      className="test"
      onClick={() => {
        emitIns.dispathcEvent({ type: 'onClick' });
      }}
    >
      test
    </button>
  );
};
