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
  name,
  ...props
}) => {
  const classNames = clx('classic-toggle', className);

  const _onToggle = () => {
    onToggle({ name });
  };
  return (
    <div className={classNames}>
      <input
        type='checkbox'
        defaultChecked={defaultValue}
        checked={value}
        name={name}
        {...props}
      />
      <div
        onClick={_onToggle}
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
