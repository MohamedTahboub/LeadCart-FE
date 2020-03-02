import React from 'react';
import common from 'components/common';

import './style.css';
import ProgressBar from 'components/ProgressBar';

const {
  CycleStepTitle,
  CheckoutInput,
  FloatButton
} = common;


export default ({
  section = {},
  ...props
}) => {
  const { styles = {}, content = {} } = section;


  const style = {
    // ...styles,
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    marginLeft: `${styles.marginLeft}px`,
    marginRight: `${styles.marginRight}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
    paddingLeft: `${styles.paddingLeft}px`,
    paddingRight: `${styles.paddingRight}px`,
  };

  const progressBarStyles = {
    barBackground: styles.barBackground,
    barColor: styles.barBackGround
  };
  return (
    <div className='product-template-billing' style={style}>
      <ProgressBar
        type={content.type}
        value={content.value}
        styles={progressBarStyles}
      />
    </div>
  );
};
