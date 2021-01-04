import React from 'react';
import classNames from 'classnames';

import common from 'components/common';

const { FlexBox, Title, Button } = common;


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
      <Button className='my-2 min-width-150 light-btn' onClick={onLogout}>Logout</Button>
    </FlexBox>
  );
};

export default MenuFooter;
