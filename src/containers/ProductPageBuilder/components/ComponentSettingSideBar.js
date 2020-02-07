import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { IoIosClose } from 'react-icons/io';
const {
  SideMenu,
  Tabs,
  EditableField,
  FlexBox,
  Tab,
} = common;
const ComponentSettingSideBar = (props) => {
  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen((open) => !open);
  };

  return (
    <SideMenu
      open={open}
      onClose={toggleMenu}
      position='right'
      withCloseBtn={false}
    >
      <FlexBox spaceBetween center='v-center' className='padding-h-10 padding-v-10'>
        <div className='title-text'>
          Element Title
        </div>
        <IoIosClose
          className='gray-text larger-text item-clickable animate '
        />
      </FlexBox>
      <Tabs active='funnelBlocks' className='padding-v-10 padding-h-10'>
        <Tab id='styles' title='styles'>
          Styles
        </Tab>
        <Tab id='actions' title='actions'>
          Actions
        </Tab>
        <Tab id='settings' title='settings'>
          Settings
        </Tab>
      </Tabs>
    </SideMenu>
  );
};

ComponentSettingSideBar.propTypes = {

};

export default ComponentSettingSideBar;
