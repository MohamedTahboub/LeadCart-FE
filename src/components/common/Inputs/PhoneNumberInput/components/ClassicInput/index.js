import React from 'react';
import NativeInput from '../NativeInput';

import './style.css';
const CustomPhoneNumber = (props) => {
  return (
    <NativeInput
      className='custom-phone-number-input input-filed-group '
      {...props}
    />
  );
};

CustomPhoneNumber.propTypes = {};

export default CustomPhoneNumber;
