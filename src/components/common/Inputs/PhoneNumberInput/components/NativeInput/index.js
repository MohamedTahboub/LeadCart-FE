import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumber = (props) => {

  const onChange = (value) => {
    props.onChange && props.onChange({
      target: {
        name: props.name,
        value
      }
    });
  };
  return (
    <PhoneInput
      placeholder='Phone Number'
      {...props}
      disabled={props.disabled}
      onChange={onChange}
    />
  );
};

PhoneNumber.propTypes = {};

export default PhoneNumber;
