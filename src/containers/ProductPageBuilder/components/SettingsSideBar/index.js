import React, { useEffect } from 'react';
import common from 'components/common';
import { IoIosClose } from 'react-icons/io';
import clx from 'classnames';
import { useContext } from '../../actions';
import SubSettings from './components';
import { RiListSettingsLine } from 'react-icons/ri';
import { updateIntercomVisibilityWidget } from 'libs/intercom';


const {
  SideMenu,
  FlexBox,
  Tooltip
} = common;

const defaultTitle = 'Section Properties';

const PageSettingToggleButton = ({ onToggle }) => {

  return (
    <FlexBox onClick={onToggle} center='v-center h-center' className='page-settings-modal-close-btn'>
      <Tooltip mouseEnterDelay={1} text='Page Layout Settings'>
        <RiListSettingsLine className='icon-btn gray-text mr-1' />
      </Tooltip>
    </FlexBox>
  );
};

const SettingSideBar = ({currency}) => {
  const { state: { modals: { sectionSetting } = {} }, actions } = useContext();

  const toggleMenu = () => {
    actions.toggleSectionSettingModal(sectionSetting);
  };

  const menuTitle = (sectionSetting && sectionSetting.menuTitle) ? sectionSetting.menuTitle : defaultTitle;

  const classNames = clx({
    'width-320': sectionSetting && (sectionSetting.type === 'pageSetting'
      || sectionSetting.type === 'checkoutSection')
  });

  const onTogglePageSettings = () => {
    const meta = {
      type: 'pageSetting',
      menuTitle: 'Page & Layouts Settings'
    };
    actions.toggleSectionSettingModal(meta);
  };

  const isOpen = sectionSetting && sectionSetting.type;

  useEffect(() => {
    updateIntercomVisibilityWidget(!isOpen);
  }, [isOpen]);

  return (
    <SideMenu
      open={isOpen}
      position='right'
      withCloseBtn={false}
      className={classNames}
    >
      <PageSettingToggleButton onToggle={onTogglePageSettings} />
      <FlexBox spaceBetween center='v-center' className='padding-h-10 padding-v-10'>
        <div className='title-text capitalized-text'>
          {menuTitle}
        </div>
        <IoIosClose
          onClick={toggleMenu}
          className='gray-text larger-text item-clickable animate '
        />
      </FlexBox>
      <SubSettings type={sectionSetting && sectionSetting.type} currency={currency}/>
    </SideMenu>
  );
};

SettingSideBar.propTypes = {};

export default SettingSideBar;
