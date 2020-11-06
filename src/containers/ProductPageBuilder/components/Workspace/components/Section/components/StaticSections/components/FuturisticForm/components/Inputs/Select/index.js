import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
import './style.css';

const { InputRow, FlexBox } = common;
const { SelectOption } = InputRow;

const Select = ({
  className,
  labelClassName,
  label,
  onChange,
  inputClassName,
  name,
  value,
  disabled,
  options,
  style,
  ...props
}) => {


  return (
    <FlexBox column className={clx('select-field-container', className, { disabled })} {...props}>
      <FlexBox className={clx('label-content', labelClassName)}>
        {label}
      </FlexBox>
      <SelectOption
        onChange={onChange}
        className={clx('select-input', inputClassName)}
        name={name}
        value={value}
        disabled={disabled}
        options={options}
        style={style}
      />
    </FlexBox>
  );
};

Select.propTypes = {};

export default Select;
