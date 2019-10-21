import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.css';
import Sidebars from './Bar';
import Menus from './Menus';


const SideBar = (props) => {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [open, setOpen] = useState(false);


  const onOpen = () => {
    setOpen(true);
    if (props.onSidebarChange) props.onSidebarChange(true);
  };
  const onClose = () => {
    setOpen(false);
    if (props.onSidebarChange) props.onSidebarChange(false);
  };

  const onActivateMenuItem = (item) => {
    if (item === activeMenuItem) {
      if (open) {
        onClose();
        return setActiveMenuItem('');
      }

      onOpen();
    } else {
      onOpen();
    }

    setActiveMenuItem(item);
  };
  return (
    <div className='checkout-nav-sidebar'>

      <Sidebars
        {...props}
        active={activeMenuItem}
        onClick={onActivateMenuItem}
      />

      <div className={`side-menu-container ${open ? 'open' : ''}`}>
        <Menus
          activeMenu={activeMenuItem}
          {...props}
        />
      </div>
    </div>
  );
};

SideBar.propTypes = {

};

export default SideBar;
