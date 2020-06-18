import React from 'react';

const DeleteButton = ({ iconType = 'trash', onClick, ...props }) => (
  <span onClick={onClick} className='delete-trash-btn'>
    <i className={`fas fa-${iconType}-alt `} />
  </span>
);

export default DeleteButton;
