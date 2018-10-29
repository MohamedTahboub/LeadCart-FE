import React from 'react';

import { Menu, Link } from 'components/common/MainMenu';
import AvatarPreviewBox from 'components/common/AvatarPreviewBox';
import { connect } from 'react-redux';
import common from 'components/common';

import * as logout from 'actions/logout';

import './style.css';

const { Button } = common;

const goToPage = ({ history, page }) => {
  if (!history || history.location.pathname === `/${page}`) return;
  history && history.push(page);
};

const SideBar = ({
  history, user, logout, ...props
}) => (
  <div className='side-bar'>
    <AvatarPreviewBox user={user} />
    <span onClick={() => goToPage({ history, page: '/product/new#details' })} className='btn new-product-btn'>
      <i className='fas fa-plus' />
              {' '}
                New Product
            </span>
    <Menu>
      <Link to={{ history, page: '/products' }} classes={['active-menu-item']}>Products</Link>
      <Link to={{ history, page: '/activities#customers' }}>Activity</Link>
      <Link to={{ history, page: '/coupons' }}>Coupon</Link>
      <Link to={{ history, page: '/upsells#upsells' }} classes={['locked-feature']}>Upsells</Link>
      <Link to={{ history, page: '/reports' }} classes={['locked-feature']}>Reports</Link>
              <Link to={{ history, page: '/affiliates' }} classes={['locked-feature']}>Affiliates</Link>
      <Link to={{ history, page: '/agency' }}>Agency</Link>
              <Link to={{ history, page: '/setting' }}>Setting</Link>
      <Link to={{ history, page: '/help' }}>Help</Link>
    </Menu>

    <Button onClick={logout} classes='logout-btn'>
      <i className='fas fa-sign-out-alt' />
      {' '}
                logout
    </Button>
  </div>
);
const mapStateToProps = ({ user: { user } }) => ({ user });

export default connect(mapStateToProps, logout)(SideBar);
