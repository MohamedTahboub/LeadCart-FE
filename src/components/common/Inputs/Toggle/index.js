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
  const classNames = clx('toggle-bar', className, { active: value });

  const _onToggle = () => {
    onToggle({ name });
  };
  return (
    <div
      onClick={_onToggle}
      data-before-bar={beforeLabel}
      data-after-bar={afterLabel}
      className={classNames}
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
