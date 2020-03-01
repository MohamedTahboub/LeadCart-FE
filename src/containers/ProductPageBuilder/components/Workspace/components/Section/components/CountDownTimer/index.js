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
    styles = {},
    content: {
      valueType,
      value = Date.now() + 10000,
    } = {}
  } = section;

  const classNames = clx({
    'image-section': true,
    [className]: className,
  });

  const sectionStyle = {
    ...styles,
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
  };

  const style = {
    height: `${styles.height}px`,
    width: `${styles.width}px`
    // backgroundImage: `url(${imageSrc})`,
    // backgroundPosition: 'center',
    // backgroundSize: '100% 100%',
    // backgroundRepeat: 'no-repeat'
  };

  return (
    <FlexBox
      center='h-center'
      className={classNames}
      style={{ ...sectionStyle }}
    >
      <CountDownTimer
        type={valueType}
        value={value}
      />
    </FlexBox>
  );
};

GuaranteeSection.propTypes = {

};

export default GuaranteeSection;
