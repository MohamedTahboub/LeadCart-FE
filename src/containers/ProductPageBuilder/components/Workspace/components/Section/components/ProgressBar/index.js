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
  const {
    styles = {},
    content = {}
  } = section;


  const styleColors = {
    borderColor: styles.borderColor,
    barColor: styles.barColor,
    textColor: styles.textColor,
  };
  return (
    <ProgressBar
      value={content.value}
      theme={styles.theme}
      colors={styleColors}
    />
  );
};
