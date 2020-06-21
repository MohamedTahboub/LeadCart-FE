import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  className,
  type = 'text',
  disabled,
  onChange,
  onBlur,
  name,
  prefix,
  suffix,
  error,
  value,
  id,
  defaultValue,
  ...props
}) => (
  <div className={`text-input-filed-container ${className}`}>
    {prefix && prefix}
    <input
      type={type}
      name={name}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      className={`text-input-filed ${error ? 'error' : ''}`}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
      {...props}
    />
    {suffix && suffix}
  </div>
);

TextField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
};
TextField.defaultProps = {
  className: '',
  type: 'text',
  value: ''
};

export default TextField;
