import React from 'react';


export const Button = ({
  classes, children, onClick, ...props
}) => (
  <span onClick={onClick} className={`btn  ${classes || ''}`}>
          {children}
  </span>
);
export const MiniButton = ({
  iconClass, children, classes, ...props
}) => (
  <span className={`mini-btn  ${classes || ''}`}>
          {iconClass && <i className={`fas ${iconClass}`} />}
    {children}
  </span>
);
export const SmallButton = ({
  iconClass, children, classes, ...props
}) => (
  <span className={`small-btn  ${classes || ''}`}>
    {iconClass && <i className={`fas ${iconClass}`} />}
    {children}
  </span>
);

export const DeleteButton = ({ iconType, ...props }) => (
  <span className='btn delete-btn x-small-btn'>
    <i className={`fas fa-${iconType}-alt `} />
  </span>
);

export const ActivationSwitchInput = (props) => (
  <label className='switch-slider-input activability-switch'>
    <input type='checkbox' />
    <span className='slider-input slider-round' />
  </label>
);

export const EditButton = ({ classes = [], children, ...props }) => (
  <span className={`edit-btn ${classes.join(' ')}`}>
    <i className='fas fa-edit' />
    {children}
  </span>
);

