import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import clx from 'classnames';

import './style.css';

const SideMenu = ({
  className,
  position,
  children,
  onChange,
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
    open,
  });

  const iconRotateClass = clx({
    'animate': true,
    'rotate-180': !open
  });

  return (
    <div className={classes}>
      <div
        onClick={onToggle}
        className='menu-close-btn gray-color white-bg item-clickable'
        role='presentation'
      >
        <MdKeyboardArrowLeft className={iconRotateClass} />
      </div>
      {children}
    </div>
  );
};

SideMenu.propTypes = {

};

export default SideMenu;
