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

  const defaultClasses = 'side-bar-menu white-bg bordered lightgray-border-color soft-edges';
  const classes = clx({
    [defaultClasses]: true,
    [className]: className,
    [`${position}-position`]: position,
    open,
  });

  return (
    <div className={classes}>
      <div onClick={onToggle} className='menu-close-btn gray-bg item-clickable'>
        <MdKeyboardArrowLeft />
      </div>
      {children}
    </div>
  );
};

SideMenu.propTypes = {

};

export default SideMenu;
