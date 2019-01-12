import React from 'react';


export const Button = ({
  classes, children, onClick, disabled, ...props
}) => (
  <span onClick={onClick} className={`btn  ${classes || ''}  ${disabled ? ' btn-disabled' : ''}`}>
    {children}
  </span>
);
export const MiniButton = ({
  iconClass, children, classes, onClick, ...props
}) => (
  <span onClick={onClick} className={`mini-btn  ${classes || ''}`}>
    {iconClass && <i className={`fas ${iconClass}`} />}
    {children}
  </span>
);
export const SmallButton = ({
  iconClass, children, classes, disabled, onClick, ...props
}) => (
  <span onClick={onClick} className={`small-btn  ${classes || ''} ${disabled ? ' btn-disabled' : ''}`}>
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
    <input type='checkbox' onClick={onToggle} checked={active ? 'checked' : ''} />
    <span className='slider-input slider-round' />
  </label>
);

export const EditButton = ({ classes = [], children, ...props }) => (
  <span className={`edit-btn ${classes.join(' ')}`}>
    <i className='fas fa-edit' />
    {children}
  </span>
);

