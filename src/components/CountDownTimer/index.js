import React, { useEffect, useState } from 'react';
import clx from 'classnames';

import countDownTimerClock from './coundown';
import common from 'components/common';
import './style.css';

const { FlexBox } = common;

const CountDownFrame = ({ titleStyle, label, value, style, show }) => {
  if (!show) return null;

  const className = clx({
    'clock-item margin-v-20 margin-h-20': true,
    [style.format]: style.format,
    [style.shape]: style.shape
  });

  const strValue = String(value).padStart(2, '0');
  return (
    <FlexBox column center='v-center h-center text-center' className={className}>
      <div style={style} className='counter-box'>{strValue}</div>
      <div style={titleStyle} className='counter-label'>{label}</div>
    </FlexBox>
  );
};

const counterInitialState = {
  days: 0,
  minutes: 0,
  hours: 0,
  seconds: 0
};

const CountDownTimer = ({
  titlesStyle,
  options,
  styles = {},
  display = {},
  language,
  ...props
}) => {
  const { valueType, ...value } = options;
  const [state, setState] = useState(counterInitialState);

  const {
    countdownTimer: {
      days: daysLabel,
      hours: hoursLabel,
      minutes: minutesLabel,
      seconds: secondsLabel
    } = {}
  } = language;


  useEffect(() => {
    const timerInstance = countDownTimerClock({ ...value, type: valueType });
    timerInstance.tick(setState);

    return timerInstance.tick;
    //eslint-disable-next-line
  }, [valueType, options]);


  return (
    <div>
      <FlexBox center='h-center'>
        <CountDownFrame
          value={state.days}
          label={daysLabel}
          style={styles}
          titleStyle={titlesStyle}
          show={display.days}
        />
        <CountDownFrame
          value={state.hours}
          label={hoursLabel}
          style={styles}
          titleStyle={titlesStyle}
          show={display.hours}
        />
        <CountDownFrame
          value={state.minutes}
          label={minutesLabel}
          style={styles}
          titleStyle={titlesStyle}
          show={display.minutes}
        />
        <CountDownFrame
          value={state.seconds}
          label={secondsLabel}
          style={styles}
          titleStyle={titlesStyle}
          show={display.seconds}
        />
      </FlexBox>
    </div>
  );
};

CountDownTimer.defaultProps = { options: {} };

export default CountDownTimer;
