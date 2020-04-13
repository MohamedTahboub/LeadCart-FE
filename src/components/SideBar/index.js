import React, { useState, Fragment } from 'react';
import { HeaderLogo } from 'components/common/logos';
import { Menu, Link as PureLink } from 'components/common/MainMenu';
import AvatarPreviewBox from 'components/common/AvatarPreviewBox';
import { connect } from 'react-redux';
import common from 'components/common';
import * as brandsAction from 'actions/brands';


import * as logout from 'actions/logout';
import * as modalsActions from 'actions/modals';
import './style.css';
import { appInit } from 'actions/appInit';
import { notification } from 'libs';
import CreateProductModal from '../CreateProductModal';

import Icons from './icons';

const { Button, InputRow, FlexBox } = common;
const { SelectOption } = InputRow;

const BrandSelect = ({
  brands,
  value: activeBrand,
  onChange
}) => {
  const options = brands.map(({ name: label, id: value }) => ({ label, value }));
  return (
    <Fragment>
      <span className='tiny-text'>
        Active Brand:
      </span>
      <SelectOption
        value={activeBrand}
        name='activeBrand'
        onChange={onChange}
        options={options}
        disabled={!options.length}
        className='min-width-100 max-width-200'
      />
    </Fragment>
  );
};
BrandSelect.defaultProps = {
  brands: []
};

const SideBar = ({
  history,
  user,
  appInit,
  logout,
  updateActiveBrand,
  brands,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(history.location.pathname);

  const onTabChange = (tab) => setActiveTab(tab);

  const Link = ({
    to: page,
    className = '',
    children,
    icon,
    external
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
          onTabChange={onTabChange}
        >
          {children}
        </PureLink>
      </FlexBox>
    );
  };

  const onActiveBrandChange = ({ target: { value: activeBrand } }) => {
    updateActiveBrand({ activeBrand }, {
      onSuccess: () => {
        appInit({}, {
          onSuccess: () => {
            const brand = brands.find(({ id }) => id === activeBrand) || {};
            notification.success(`You Now On the ${brand.name}`);
          },
          onFailed: (message) => {
            notification.failed(message);
          }
        });
      },
      onFailed: (message) => {
        notification.failed(message);
      }
    });
  };
  return (
    <div className='side-bar'>
      <HeaderLogo onClick={() => history.push('/')} fullWidth />
      <AvatarPreviewBox user={user} onSettingClick={() => history.push('/settings/brand')} />
      <BrandSelect
        onChange={onActiveBrandChange}
        value={user.activeBrand}
        brands={brands}
      />
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
        <Link icon='settings' to='/settings/brand'>Brand Settings</Link>
        <Link icon='settings' to='/settings/account'>Account</Link>
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
const mapStateToProps = ({ brands, user: { user } }) => ({ user, brands });

export default connect(
  mapStateToProps,
  {
    ...logout,
    ...modalsActions,
    ...brandsAction,
    appInit
  }
)(SideBar);
