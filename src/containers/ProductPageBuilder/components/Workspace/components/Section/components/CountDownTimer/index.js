import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import guaranteeBadge1 from 'assets/images/guaranteeBadges/gur-1.png';
import './style.css';
import common from 'components/common';
import CountDownTimer from 'components/CountDownTimer';

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
      />
    </FlexBox>
  );
};

Timer.propTypes = {};

export default Timer;
