import React from 'react';

import './style.css';

export default ({
  type = 'text',
  error,
  name,
  onChange,
  placeholder,
  label = 'Label',
  className = ''
}) => (
  <div className={`custom-input-field ${className}`}>
    {error && <span className='input-feild-error'>{error}</span>}
    <input
      type={type}
      name={name}
      onChange={onChange}
      id={name}
      placeholder={placeholder}
    />
    <label htmlFor={name}>{label}</label>
  </div>
);
