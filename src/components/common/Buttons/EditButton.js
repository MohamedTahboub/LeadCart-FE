import React from 'react';

const EditButton = ({ className = '', onClick, children, ...props }) => (
  <span onClick={onClick} className={`edit-btn ${className}`} role='presentation'>
    <i className='fas fa-edit' />
    {children}
  </span>
);

export default EditButton;
