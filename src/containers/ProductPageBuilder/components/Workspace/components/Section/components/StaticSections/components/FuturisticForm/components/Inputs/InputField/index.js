import React from 'react';
import common from 'components/common';
import clx from 'classnames';

import './style.css';
const { FlexBox } = common;

const InputField = ({
  value,
  onChange,
  onBlur,
  type,
  label,
  placeholder,
  className,
  disabled,
  inputProps = {},
  inputClassName,
  labelClassName,
  ...props
}) => {


  return (
    <FlexBox column className={clx('input-field-container', className)} {...props}>
      {label && (
        <FlexBox className={clx('label-content', labelClassName)}>
          {label}
        </FlexBox>
      )}
      <input
        className={clx('input-field-element', inputClassName)}
        placeholder={placeholder}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        {...inputProps}
      />
    </FlexBox>
  );
};

InputField.propTypes = {};
InputField.defaultProp = { disabled: true };

export default InputField;
