import React from 'react';
import clx from 'classnames';
import { isFunction } from 'libs/checks';

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
  const classNames = clx('toggle-bar', className, { active: value });

  const _onToggle = () => {
    if (isFunction(onToggle))
      onToggle({ name, value: !value });
  };
  return (
    <div
      onClick={_onToggle}
      data-before-bar={beforeLabel}
      data-after-bar={afterLabel}
      className={classNames}
      {...props}
    >
      <div className='circle' />
    </div>
  );
};

Toggle.defaultProps = {
  className: '',
  beforeLabel: 'On',
  afterLabel: 'Off'
};
export default Toggle;
