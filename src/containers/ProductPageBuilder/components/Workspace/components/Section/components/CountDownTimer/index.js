import React from 'react';
import clx from 'classnames';

import common from 'components/common';
import CountDownTimer from 'components/CountDownTimer';
import './style.css';

const { FlexBox } = common;

const Timer = ({
  className,
  section = {}
}) => {
  const {
    styles = { theme: 'formal-circles' },
    content: {
      valueType,
      value
    } = {},
    options
  } = section;

  const classNames = clx({ [className]: className });

  const sectionStyle = {
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`
  };

  const [format, shape] = styles.theme ? styles.theme.split('-') : [];
  const countDownStyles = {
    format,
    color: styles.clockColor,
    // fontSize: styles.fontSize,
    shape,
    backgroundColor: styles.backgroundColor
  };
  const showElements = {
    days: styles.showDays,
    hours: styles.showHours,
    minutes: styles.showMinutes,
    seconds: styles.showSeconds
  };


  return (
    <FlexBox
      center='h-center'
      className={classNames}
      style={{ ...sectionStyle }}
    >
      <CountDownTimer
        styles={countDownStyles}
        // type={valueType}
        options={value}
        titlesStyle={{ color: styles.backgroundColor }}
        display={showElements}
      />
    </FlexBox>
  );
};

export default Timer;
