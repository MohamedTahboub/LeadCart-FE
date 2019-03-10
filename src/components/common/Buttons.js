import React from 'react';


export const Button = ({
  className = '', children, onClick, disabled, ...props
}) => (
  <span onClick={onClick} className={`btn  ${className || ''}  ${disabled ? 'btn-disabled' : ''}`}>
    {children}
  </span>
);
export const MiniButton = ({
  iconClass, children, className = '', onClick, ...props
}) => (
  <span onClick={onClick} className={`mini-btn  ${className}`}>
    {iconClass && <i className={`fas ${iconClass}`} />}
    {children}
  </span>
);
export const SmallButton = ({
  iconClass, children, className = '', disabled, onClick, ...props
}) => (
  <span onClick={onClick} className={`small-btn  ${className} ${disabled ? ' btn-disabled' : ''}`}>
    {iconClass && <i className={`fas ${iconClass}`} />}
    {children}
  </span>
);

export const DeleteButton = ({ iconType = 'trash', onClick, ...props }) => (
  <span onClick={onClick} className='delete-trash-btn'>
    <i className={`fas fa-${iconType}-alt `} />
  </span>
);

export const ActivationSwitchInput = ({ active, onToggle, ...props }) => (
  <label className='switch-slider-input activability-switch'>
    <input type='checkbox' onChange={onToggle} defaultChecked={active} />
    <span className='slider-input slider-round' />
  </label>
);

export const EditButton = ({
  className = '', onClick, children, ...props
}) => (
  <span onClick={onClick} className={`edit-btn ${className}`}>
    <i className='fas fa-edit' />
    {children}
  </span>
);

