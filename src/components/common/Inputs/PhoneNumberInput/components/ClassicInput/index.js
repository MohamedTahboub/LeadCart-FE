import React from 'react';
import NativeInput from '../NativeInput';
import clx from 'classnames';

import './style.css';
const CustomPhoneNumber = (props) => {
  const { className, disabled } = props;
  return (
    <NativeInput
      {...props}
      className={clx('custom-phone-number-input checkout-input-field-container', className, { disabled })}
    />
  );
};

CustomPhoneNumber.propTypes = {};

export default CustomPhoneNumber;
