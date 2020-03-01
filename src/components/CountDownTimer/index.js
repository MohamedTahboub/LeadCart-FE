import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import './style.css';
import countDownTimerClock from './coundown';

const {
  FlexBox
} = common;

const CountDownFrame = ({ label, value, style }) => (
  <FlexBox column center='v-center h-center' className='margin-v-20 margin-h-20'>
    <div className='counter-box'>{value}</div>
    <div className='counter-label'>{label}</div>
  </FlexBox>
);

const counterInitialState = {
  days: 0,
  minutes: 0,
  minutes: 0,
  seconds: 0
};
const CountDownTimer = ({ options, ...props }) => {
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
        <CountDownFrame value={state.days} label='Days' style={styleType} />
        <CountDownFrame value={state.minutes} label='Hours' style={styleType} />
        <CountDownFrame value={state.minutes} label='Minutes' style={styleType} />
        <CountDownFrame value={state.seconds} label='Seconds' style={styleType} />
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
