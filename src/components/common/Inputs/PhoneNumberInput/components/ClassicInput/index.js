import React from 'react';
import NativeInput from '../NativeInput';
import clx from 'classnames';

import './style.css';
const CustomPhoneNumber = (props) => {
  return (
    <NativeInput
      className={clx('custom-phone-number-input checkout-input-field-container', { disabled: props.disabled })}
      {...props}
    />
  );
};

CustomPhoneNumber.propTypes = {};

export default CustomPhoneNumber;
