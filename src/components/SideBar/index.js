import React, { useState, Fragment } from 'react';
import { HeaderLogo } from 'components/common/logos';
import { Menu, Link as PureLink } from 'components/common/MainMenu';
import AvatarPreviewBox from 'components/common/AvatarPreviewBox';
import { connect } from 'react-redux';
import common from 'components/common';

// import { ReactComponent as ProductsIcon } from '../../assets/images/icons/products.svg';

import * as logout from 'actions/logout';
import * as modalsActions from 'actions/modals';
import './style.css';
import { appInit } from 'actions/appInit';
import CreateProductModal from '../CreateProductModal';

import Icons from './icons';

const { Button, InputRow, FlexBox } = common;

const BrandSelect = ({ value }) => (
  <Fragment>
    <span className='tiny-text'>Active Brand:</span>
    <InputRow.SearchInput
      width={120}
      disabled
      size='small'
      options={[{ label: value, value }]}
      value={value}
    />
  </Fragment>
);
const currentTab = 'products5'; // history.location.pathname

const isActiveTab = (tabName) => (tabName === (currentTab && currentTab.split('#')[0]) ? ['active'] : []);

// console.log(Icons)
const SideBar = ({
  history,
  user,
  appInit,
  logout,
  toggleCreateProductModal,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(history.location.pathname);

  const onTabChange = (tab) => setActiveTab(tab);

  const Link = ({
    to: page, className = '', children, icon, external
  }) => {
    const Icon = Icons[icon] || null;

    return (
      <FlexBox
        center='v-center'
        spaceBetween
        className={`sideBar-item ${className} ${activeTab === page ? 'active' : ''}`}
      >
        <Icon className='svg-icon sideBar-icon' />
        <PureLink
          to={{ history, page }}
          external={external}
          // className={className}
          onTabChange={onTabChange}
        // active={activeTab === page}
        >
          {children}
        </PureLink>
      </FlexBox>
    );
  };


  return (
    <div className='side-bar'>
      <HeaderLogo onClick={() => history.push('/')} fullWidth />
      <AvatarPreviewBox user={user} onSettingClick={() => history.push('/settings/brand')} />
      <BrandSelect value={user.subDomain} />
      <Menu>
        <Link icon='dashboard' to='/'>Dashboard</Link>
        <Link icon='products' to='/products'>Products</Link>
        <Link icon='funnels' to='/funnels'>Funnels</Link>
        <Link icon='integrations' to='/integrations'>Integrations</Link>
        <Link icon='coupons' to='/coupons'>Coupons</Link>
        <Link icon='transactions' to='/transactions'>Transactions</Link>
        <Link icon='customers' to='/customers'>Customers</Link>
        <Link icon='affiliates' to='/affiliates' className='locked-feature'>Affiliates</Link>
        {user.packageType === 'Agency' && (
          <Link
            icon='subAccounts'
            to='/sub-accounts'
          >
            Sub-Accounts
          </Link>
        )}
        <Link icon='settings' to='/settings/brand'>Settings</Link>
        <Link icon='help' to='https://help.leadcart.io' external>Help</Link>
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

export default connect(
  mapStateToProps,
  {
    ...logout,
    ...modalsActions,
    appInit
  }
)(SideBar);
