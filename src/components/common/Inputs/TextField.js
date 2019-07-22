import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  className,
  type,
  onChange,
  onBlur,
  name,
  value,
  ...props
}) => (
  <div className={`text-input-filed-container ${className}`}>
    <input
      type={type}
      name={name}
      defaultValue={value}
      className='text-input-filed'
      onChange={onChange}
      onBlur={onBlur}
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
