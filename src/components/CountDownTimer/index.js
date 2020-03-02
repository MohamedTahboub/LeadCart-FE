import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';

import './style.css';
import countDownTimerClock from './coundown';

const {
  FlexBox
} = common;

const CountDownFrame = ({ label, value, style }) => {
  const className = clx({
    'clock-item margin-v-20 margin-h-20': true,
    [style.format]: style.format,
    [style.shape]: style.shape,
  });
  const strValue = String(value).padStart(2, '0');
  return (
    <FlexBox column center='v-center h-center' className={className}>
      <div style={style} className='counter-box'>{strValue}</div>
      <div style={{ color: style.color }} className='counter-label'>{label}</div>
    </FlexBox>
  );
};

const counterInitialState = {
  days: 0,
  minutes: 0,
  minutes: 0,
  seconds: 0
};
const CountDownTimer = ({ options, styles = {}, ...props }) => {
  const { valueType, styleType, ...value } = options;
  const [state, setState] = useState(counterInitialState);


  useEffect(() => {
    const timerInstance = countDownTimerClock({ ...value, type: valueType });
    timerInstance.tick(setState);

    return timerInstance.tick;
  }, [options]);

  return (
    <div>
      <FlexBox>
        <CountDownFrame
          value={state.days}
          label='Days'
          style={styles}
        />
        <CountDownFrame
          value={state.minutes}
          label='Hours'
          style={styles}
        />
        <CountDownFrame
          value={state.minutes}
          label='Minutes'
          style={styles}
        />
        <CountDownFrame
          value={state.seconds}
          label='Seconds'
          style={styles}
        />
      </FlexBox>
    </div>
  );
};

CountDownTimer.propTypes = {

};
CountDownTimer.defaultProps = {
  options: {}
};

export default CountDownTimer;
