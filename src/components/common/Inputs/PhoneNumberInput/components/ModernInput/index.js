import React from 'react';
// import PropTypes from 'prop-types';
import NativeInput from '../NativeInput';
import clx from 'classnames';
import { FlexBox } from 'components/common/boxes';
import './style.css';

const CustomPhoneNumber = ({
  value,
  onChange,
  onBlur,
  type,
  label,
  name,
  placeholder,
  className,
  autoComplete,
  disabled,
  prefix,
  error,
  valid,
  inputProps = {},
  inputClassName,
  labelClassName,
  ...props
}) => {

  return (
    <FlexBox column className={clx('input-field-container', className, { error: error && !valid })} {...props}>
      {label && (
        <FlexBox className={clx('label-content', labelClassName, { 'valid-input': valid })}>
          {label}
        </FlexBox>
      )}
      <FlexBox>
        {prefix}
      </FlexBox>
      <NativeInput
        className={clx('input-field-element custom-phone-input', inputClassName)}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
        {...inputProps}
        // {...props}
      />
    </FlexBox>

  );
};

CustomPhoneNumber.propTypes = {};

export default CustomPhoneNumber;
