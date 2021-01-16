import React from 'react';
import classNames from 'classnames';
import { IoIosHelpBuoy } from 'react-icons/io';
import { RiLogoutCircleRLine } from 'react-icons/ri';

import common from 'components/common';

const { FlexBox, Title, Button } = common;


const MenuFooter = ({ onLogout, onNavigate, activeLink }) => {

  return (
    <FlexBox className='v-center h-center' column>

      <FlexBox
        className={classNames('v-center h-center  underlined item-clickable p-1 soft-edges ', { 'active-sidebar-main-menu-item min-width-150':  activeLink === '/help' })}
        onClick={onNavigate('/help')}
      >
        <IoIosHelpBuoy className='mr-2' />
        <Title className={classNames(' m-0 text-center', { 'white-text': activeLink === '/help' })}>
          Help
        </Title>
      </FlexBox>

      <Button className='my-2 mr-2 min-width-150 light-btn' onClick={onLogout}>
        <FlexBox className='v-center h-center'>
          <Title>
            Logout
          </Title>
          <RiLogoutCircleRLine />
        </FlexBox>
      </Button>

    </FlexBox>
  );
};

export default MenuFooter;
