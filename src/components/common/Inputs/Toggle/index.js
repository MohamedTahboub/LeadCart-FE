import React from 'react';
import clx from 'classnames';

import './style.css';

const Toggle = ({
  className,
  onToggle,
  defaultValue,
  beforeLabel,
  afterLabel,
  value,
  ...props
}) => {
  const classNames = clx('classic-toggle', className);
  return (
    <div className={classNames}>
      <input
        type='checkbox'
        defaultChecked={defaultValue}
        checked={value}
        {...props}
      />
      <div
        onClick={onToggle}
        data-before-bar={beforeLabel}
        data-after-bar={afterLabel}
        className='toggle-bar'
      >
        <div className='circle' />
      </div>
    </div>
  );
};

Toggle.defaultProps = {
  className: '',
  beforeLabel: 'On',
  afterLabel: 'Off'
};
export default Toggle;
