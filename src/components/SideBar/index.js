import React, { useState } from 'react';
import { HeaderLogo } from 'components/common/logos';
import { Menu, Link as PureLink } from 'components/common/MainMenu';
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
  const [activeTab, setActiveTab] = useState(history.location.pathname)
  const onTabChange = (tab) => setActiveTab(tab)

  const navigateToProducts = () => {
    history.push('/products')
    setActiveTab('/products')
  }
  const Link = ({ to: page, className, children, external }) => (
    <PureLink
      to={{ history, page }}
      external={external}
      className={className}
      onTabChange={onTabChange}
      active={activeTab === page}
    >
      {children}
    </PureLink>)
  return (
    <div className='side-bar'>
      <HeaderLogo onClick={() => history.push('/')} />
      <AvatarPreviewBox user={user} onSettingClick={() => history.push('/settings/general')} />
      <Menu>
        <Link to='/products' className={isActiveTab('products')}>Products</Link>
        <Link to='/activities'>Activity</Link>
        <Link to='/customers'>Customers Lab</Link>
        <Link to='/coupons'>Coupon</Link>
        <Link to='/upsells' >Upsells</Link>
        <Link to='/fulfillments' >Fulfillments</Link>
        <Link to='/funnels' className='locked-feature'>Funnels</Link>
        <Link to='/affiliates' className='locked-feature'>Affiliates</Link>
        {user.packageType === 'Agency' && <Link to='/agency'>Agency</Link>}
        <Link to='/settings/general'>Setting</Link>
        <Link to='https://help.leadcart.io' external >Help</Link>
      </Menu>

      <Button onClick={logout} className='logout-btn'>
        <i className='fas fa-sign-out-alt' />
        {' '}
        logout
      </Button>
      <CreateProductModal history={history} />
    </div>
  );
};
const mapStateToProps = ({ user: { user } }) => ({ user });

export default connect(mapStateToProps, { ...logout, ...modalsActions, appInit })(SideBar);
