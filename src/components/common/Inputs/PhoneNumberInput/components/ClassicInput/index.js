import React from 'react';
import NativeInput from '../NativeInput';

import './style.css';
const CustomPhoneNumber = (props) => {
  return (
    <NativeInput
      className='custom-phone-number-input checkout-input-field-container disabled'
      {...props}
    />
  );
};

CustomPhoneNumber.propTypes = {};

export default CustomPhoneNumber;
