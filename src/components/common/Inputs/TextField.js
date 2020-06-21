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
  uncontrolled = false,
  ...props
}) => {
  const _value = uncontrolled ? value : (value || '');
  return (
    <div className={`text-input-filed-container ${className}`}>
      {prefix && prefix}
      <input
        type={type}
        name={onChange ? (name || '') : name}
        disabled={disabled}
        value={_value}
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
};

TextField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string
};
TextField.defaultProps = {
  className: '',
  type: 'text'
};

export default TextField;
