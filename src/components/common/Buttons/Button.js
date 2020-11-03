import React, { useState } from 'react';
import clx from 'classnames';
import { isFunction } from 'libs/checks';

const Button = ({
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

  const _onClick = (args) => {
    if (isFunction(onClick))
      onClick(args);

  };
  return (
    <button
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={_onClick}
      {...props}
      {...customProps}
      className={classNames}
    >
      {customProps.children ? customProps.children : children}
    </button>
  );
};

export default Button;
