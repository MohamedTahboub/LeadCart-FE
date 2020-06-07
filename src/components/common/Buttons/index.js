import React, { useState } from 'react';
import ids from 'shortid';
import PropTypes from 'prop-types';
import clx from 'classnames';

import './style.css';

export const Button = ({
  className = '',
  children,
  onClick,
  onprogress,
  circle,
  active,
  disabled,
  onHoverProps = {},
  ...props
}) => {
  const [customProps, setProps] = useState({});

  const onMouseOver = () => {
    setProps(onHoverProps);
  };

  const onMouseLeave = () => {
    setProps({});
  };

  const classNames = clx({
    'btn': true,
    [className]: className,
    [customProps.className]: customProps.className,
    'btn-disabled': disabled,
    'spinner': onprogress,
    circle,
    active
  });

  return (
    <button
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      {...props}
      {...customProps}
      className={classNames}
    >
      {customProps.children ? customProps.children : children}
    </button>
  );
};
export const MiniButton = ({
  iconClass,
  children,
  className = '',
  tooltip,
  onClick,
  active,
  // toolTip,
  ...props
}) => (
  <span
    data-tip={tooltip}
    onClick={onClick}
    className={`mini-btn  ${className} ${active ? 'active' : ''}`}
  >
    {iconClass && (
      <i
        className={`fas ${iconClass} scale-12`}
      />
    )}
    {children}
  </span>
);
export const SmallButton = ({ iconClass, children, className = '', disabled, onClick, ...props }) => (
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

export const ActivationSwitchInput = ({
  active,
  disabled,
  note,
  className = 'activability-switch',
  onToggle,
  ...props
}) => {
  // const id = ids.generate();
  const [id] = useState(ids.generate());
  return (
    <div className='activations-switch-input'>
      <label htmlFor={id} className={`custom-switch-input ${className}`}>
        <input id={id} type='checkbox' onChange={onToggle} checked={active} />
        <span className='slider-input slider-round' />
      </label>
      {note && <span className='input-note switch-activations'>{note}</span>}
    </div>
  );
};

export const EditButton = ({ className = '', onClick, children, ...props }) => (
  <span onClick={onClick} className={`edit-btn ${className}`} role='presentation'>
    <i className='fas fa-edit' />
    {children}
  </span>
);


export const FloatButton = ({
  className,
  children,
  onClick,
  position = {}
}) => {
  const style = { top: 0, left: 20, ...position };
  return (
    <div style={style} onClick={onClick} className={`float-btn ${className}`}>
      {children}
    </div>
  );
};


export const RefreshButton = ({
  onClick,
  loading
}) => (
  <SmallButton
    onClick={onClick}
    disabled={loading}
    className='btn refresh-btn primary-color'
  >
    <i className={`fas fa-sync-alt ${loading ? 'rotate' : ''}`} />
      Sync Now
  </SmallButton>
);

RefreshButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
RefreshButton.defaultProps = { loading: false };
