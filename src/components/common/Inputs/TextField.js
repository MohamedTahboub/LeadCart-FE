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
  value,
  ...props
}) => (
  <div className={`text-input-filed-container ${className}`}>
    {prefix && prefix}
    <input
      type={type}
      name={name}
      disabled={disabled}
      value={value}
      className='text-input-filed'
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  </div>
);

TextField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};
TextField.defaultProps = {
  className: '',
  type: 'text',
};

export default TextField;
