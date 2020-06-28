import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import clx from 'classnames';

import './style.css';

const SideMenu = ({
  className,
  position,
  children,
  onChange,
  withCloseBtn = true,
  ...props
}) => {
  const [open, setOpen] = useState(true);

  const onToggle = () => {
    setOpen((open) => {
      if (typeof onChange === 'function') onChange(open);

      return !open;
    });
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const defaultClasses = 'side-bar-menu white-bg soft-edges soft-shadow';
  const classes = clx({
    [defaultClasses]: true,
    [className]: className,
    [`${position}-position`]: position,
    open
  });

  const iconRotateClass = clx({
    'animate': true,
    'rotate-180': !open
  });

  return (
    <div className={classes}>
      {withCloseBtn && (
        <div
          onClick={onToggle}
          className='menu-close-btn gray-color white-bg item-clickable'
          role='presentation'
        >
          <FaAngleDoubleLeft className={iconRotateClass} />
        </div>
      )
      }
      {children}
    </div>
  );
};

export default SideMenu;
