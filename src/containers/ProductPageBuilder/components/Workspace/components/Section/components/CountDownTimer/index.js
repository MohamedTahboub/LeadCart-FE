import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import guaranteeBadge1 from 'assets/images/guaranteeBadges/gur-1.png';
import './style.css';
import common from 'components/common';
import CountDownTimer from 'components/CountDownTimer';

const {
  FlexBox,
} = common;
const GuaranteeSection = ({
  className,
  section = {},
}) => {
  const {
    styles = { theme: 'formal-circles' },
    content: {
      valueType,
      value,
    } = {},
    options
  } = section;

  const classNames = clx({
    [className]: className,
  });

  const sectionStyle = {
    // ...styles,
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
  };

  const style = {
    height: `${styles.height}px`,
    width: `${styles.width}px`
  };

  const [format, shape] = styles.theme.split('-');
  const countDownStyles = {
    format,
    color: styles.clockColor,
    // fontSize: styles.fontSize,
    shape,
    backgroundColor: styles.backgroundColor,
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

GuaranteeSection.propTypes = {

};

export default GuaranteeSection;
