import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { IoIosClose } from 'react-icons/io';
import { useContext } from '../../actions';
import SubSettings from './components';

const {
  SideMenu,
  Tabs,
  EditableField,
  FlexBox,
  Tab,
} = common;

const SettingSideBar = (props) => {
  const { state: { modals: { sectionSetting } = {} }, actions } = useContext();


  const toggleMenu = () => {
    console.log('What');
    actions.toggleSectionSettingModal(sectionSetting);
  };


  return (
    <SideMenu
      open={sectionSetting && sectionSetting.type}
      position='right'
      withCloseBtn={false}
    >
      <FlexBox spaceBetween center='v-center' className='padding-h-10 padding-v-10'>
        <div className='title-text capitalized-text'>
                    Section Properties
        </div>
        <IoIosClose
          onClick={toggleMenu}
          className='gray-text larger-text item-clickable animate '
        />
      </FlexBox>
      <SubSettings type={sectionSetting && sectionSetting.type} />
    </SideMenu>
  );
};

SettingSideBar.propTypes = {

};

export default SettingSideBar;
