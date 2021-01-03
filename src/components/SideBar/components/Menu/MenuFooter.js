import React from 'react';
import classNames from 'classnames';

import common from 'components/common';
import { Button } from 'components/Buttons';

const { FlexBox, Title } = common;


const MenuFooter = ({ onLogout, history }) => {
  const pathname = history.location.pathname;

  return (
    <FlexBox className='v-center h-center' column>
      <Title
        className={classNames('underlined mt-2 item-clickable p-1 soft-edges text-center', { 'active-sidebar-main-menu-item min-width-150':  pathname === '/help' })}
        onClick={() => history.push('/help')}
      >
      Help
      </Title>
      <Button className='py-1 px-2 my-2 min-width-150' onClick={onLogout}>Logout</Button>
    </FlexBox>
  );
};

export default MenuFooter;
