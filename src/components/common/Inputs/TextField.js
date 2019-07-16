import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  className,
  type,
  onChange,
  onBlur,
  value,
  ...props
}) => (
  <div {...props} className={`text-input-filed-container ${className}`}>
    <input
      type={type}
      value={value}
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
