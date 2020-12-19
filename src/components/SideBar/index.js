import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Menu } from 'antd';
import moment from 'moment';

import { HeaderLogo } from 'components/common/logos';
import BrandsMenu from 'components/BrandsMenu';
import AvatarPreviewBox from 'components/common/AvatarPreviewBox';
import { NewBrandModal } from '../../containers/Account/components/Brands/components';
import { FillerButton } from 'components/Buttons';
import common from 'components/common';
import { notification } from 'libs';
import { accountSettingsMenus, main as sidebarMenus } from './menus';
import Icons from './icons';

import * as brandsAction from 'actions/brands';
import * as logout from 'actions/logout';
import * as modalsActions from 'actions/modals';

import { appInit } from 'actions/appInit';
import './style.css';


const { SubMenu } = Menu;
const { InputRow } = common;
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
        className='min-width-100 max-width-150'
      />
    </Fragment>
  );
};
BrandSelect.defaultProps = { brands: [] };

const SideBar = ({
  history,
  user,
  credits,
  appInit,
  logout,
  updateActiveBrand,
  createBrand,
  brands
}) => {
  const [isBrandsOpen, setBrandsOpen] = useState(false);
  const [isAccountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [isCreateBrandModalOpen, setCreateModalOpen] = useState(false);


  const toggleCreateModalOpen = () => setCreateModalOpen(!isCreateBrandModalOpen);

  const menus = sidebarMenus({ brands, user, history });

  const onActiveBrandChange = (activeBrand) => {
    updateActiveBrand({ activeBrand }, {
      onSuccess: () => {
        appInit({
          chartsFilters: {
            date: {
              min: moment().subtract(7, 'days').endOf('day').format('YYYY-MM-DD'),
              max: moment().format('YYYY-MM-DD')
            }
          }
        }, {
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

  const onMenuOpen = () => setBrandsOpen(!isBrandsOpen);

  const mapMenuItems = (menuItems) => {
    return menuItems.map((menu) => {
      if (menu.sub) {
        const { sub, title, icon, ...rest } = menu;
        const Icon = Icons[icon] || Fragment;
        return (
          <SubMenu
            key={rest.key}
            title={(
              <div className='d-flex align-center-left'>
                <Icon className='svg-icon sideBar-icon' />
                {title}
              </div>
            )}
            {...rest}
          >
            {mapMenuItems(sub)}
          </SubMenu>
        );
      } else if (menu.divider) {
        return <Menu.Divider key={Math.random()} />;
      } else {
        const { title, icon, ...rest } = menu;
        const Icon = Icons[icon] || Fragment;

        return (
          <Menu.Item
            key={rest.key}
            className='d-flex align-center-left'
            {...rest}
          >
            <Icon className='svg-icon sideBar-icon' />{title}
          </Menu.Item>
        );
      }
    });
  };

  const onCreateBrand = (brand, cb) => {
    const actions = {
      onSuccess: () => {
        notification.success(`${brand.name} Brand Created`);
        cb();
      },
      onFailed: (message) => {
        notification.failed(message);
        cb();
      }
    };
    createBrand(brand, actions);
  };


  const onNavigate = (menuItem) => {
    history.push(menuItem.item.props.link);
  };
  const onAccountSettingsOpen = (openKeys) => {
    setAccountSettingsOpen(openKeys.includes('accountSettings'));
  };
  return (
    <Fragment>

      <div className={classNames('side-bar justify-space-between d-col', { 'settings-open': isAccountSettingsOpen && !isBrandsOpen })}>
        <HeaderLogo onClick={() => history.push('/')} fullWidth />
        <AvatarPreviewBox history={history} brands={brands} user={user} onSettingClick={() => history.push('/settings/brand')} />
        <BrandsMenu
          brands={brands}
          activeBrand={user.activeBrand}
          onChange={onActiveBrandChange}
          onMenuOpen={onMenuOpen}
          toggleCreateModalOpen={toggleCreateModalOpen}
        />
        <Menu
          className='side-bar-navigation'
          mode='inline'
          selectedKeys={[user.activeBrand]}
          defaultOpenKeys={menus.map(({ key }) => key)}
          onClick={onNavigate}
        >
          {mapMenuItems(menus)}
        </Menu>
        <div className='tail-actions'>
          <Menu mode='inline' className={classNames({ 'h-0': isBrandsOpen })} onClick={onNavigate} onOpenChange={onAccountSettingsOpen}>
            {mapMenuItems(accountSettingsMenus({ credits }))}
          </Menu>
          <div className='upgrade'>
            <FillerButton onClick={logout} className='upgrade-btn' type='primary'>
              Logout
            </FillerButton>
          </div>
        </div>
      </div>
      {isCreateBrandModalOpen && (
        <NewBrandModal
          onClose={toggleCreateModalOpen}
          onCreate={onCreateBrand}
          credits={credits}
        />
      )}
    </Fragment>


  );
};
const mapStateToProps = ({
  brands,
  user: { user },
  redemption: { credits = 0 } = {}
}) => ({ user, brands, credits });

export default connect(
  mapStateToProps,
  {
    ...logout,
    ...modalsActions,
    ...brandsAction,
    appInit
  }
)(SideBar);
