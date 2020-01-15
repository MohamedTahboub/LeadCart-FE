import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';

import './style.css';
// import Sidebars from './Bar';
import {
  GrabbableBlock,
  // SettingMenu
} from './components';
import SettingMenu from './Menu';
const {
  SideMenu,
  Tabs,
  Tab
} = common;

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
    <SideMenu>
      <Tabs>
        <Tab id='funnelBlocks' title='Funnel Blocks'>
          <GrabbableBlock
            demo
            title
            description
          />
        </Tab>
        <Tab id='funnelSettings' title='Settings'>
          <SettingMenu
            {...props}
          />
        </Tab>
      </Tabs>
    </SideMenu>


  );
};
/*
    <Sidebars
      {...props}
      active={activeMenuItem}
      onClick={onActivateMenuItem}
    />

    <div className={`side-menu-container ${open ? 'open' : ''}`}>
      <SettingMenu
        // activeMenu={activeMenuItem}
        {...props}
      />
    </div>
    </div >

*/
SideBar.propTypes = {

};

export default SideBar;
