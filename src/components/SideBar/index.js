import React from 'react';

import { Menu, Link } from 'components/common/MainMenu';
import AvatarPreviewBox from 'components/common/AvatarPreviewBox';
import { connect } from 'react-redux';
import common from 'components/common';

import * as logout from 'actions/logout';
import { appInit } from 'actions/appInit';
import CreateProductModal from '../CreateProductModal';
import * as modalsActions from 'actions/modals';
import './style.css';

const { Button } = common;

// const goToPage = ({ history, page }) => {
//   if (!history || history.location.pathname === `/${page}`) return;
//   history && history.push(page);
// };

const currentTab = 'products5' // history.location.pathname

const isActiveTab = tabName => tabName === (currentTab && currentTab.split('#')[0]) ? ['active-menu-item'] : []

const SideBar = ({
  history, user, appInit, logout, toggleCreateProductModal, ...props
}) => {
  // appInit();
  return (
    <div className='side-bar'>
      <AvatarPreviewBox user={user} onSettingClick={() => history.push('/settings/general')} />
      <span onClick={toggleCreateProductModal} className='btn new-product-btn'>
        <i className='fas fa-plus' />
        {' '}
        New Product
      </span>
      <Menu>
        <Link to={{ history, page: '/products' }} classes={isActiveTab('products')}>Products</Link>
        <Link to={{ history, page: '/activities/customers' }}>Activity</Link>
        <Link to={{ history, page: '/coupons' }}>Coupon</Link>
        <Link to={{ history, page: '/upsells' }} classes={['locked-feature']}>Upsells</Link>
        <Link to={{ history, page: '/reports' }} classes={['locked-feature']}>Reports</Link>
        <Link to={{ history, page: '/affiliates' }} classes={['locked-feature']}>Affiliates</Link>
        {user.level === 3 && <Link to={{ history, page: '/agency' }}>Agency</Link>}
        <Link to={{ history, page: '/settings/general' }}>Setting</Link>
        <Link to={{ history, page: 'https://help.leadcart.io' }} external >Help</Link>
      </Menu>

      <Button onClick={logout} classes='logout-btn'>
        <i className='fas fa-sign-out-alt' />
        {' '}
        logout
      </Button>
      <CreateProductModal history={history} />
    </div >
  );
};
const mapStateToProps = ({ user: { user } }) => ({ user });

export default connect(mapStateToProps, { ...logout, ...modalsActions, appInit })(SideBar);
