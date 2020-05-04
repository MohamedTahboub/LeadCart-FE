import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { HeaderLogo } from 'components/common/logos';
import { Link as PureLink } from 'components/common/MainMenu';
import BrandsMenu from 'components/BrandsMenu';
import AvatarPreviewBox from 'components/common/AvatarPreviewBox';
import { FillerButton } from 'components/Buttons';
import common from 'components/common';
import { Modal } from 'components/Modals';

import * as brandsAction from 'actions/brands';
import * as logout from 'actions/logout';
import * as modalsActions from 'actions/modals';
import { appInit } from 'actions/appInit';
import './style.css';
import { notification } from 'libs';
import { Menu } from 'antd';

import CreateProductModal from '../CreateProductModal';

import { accountSettingsMenus, main as sidebarMenus } from './menus';
import Icons from './icons';

const { SubMenu } = Menu;

const { InputRow, FlexBox } = common;
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
  appInit,
  logout,
  updateActiveBrand,
  brands,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(history.location.pathname);
  const [isBrandsOpen, setBrandsOpen] = useState(false);
  const [isAccountSettingsOpen, setAccountSettingsOpen] = useState(false);

  const onTabChange = (tab) => setActiveTab(tab);
  const menus = sidebarMenus({ brands });

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

  const onActiveBrandChange = (activeBrand) => {
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

  const onMenuOpen = () => setBrandsOpen(!isBrandsOpen);


  const mapMenuItems = (menuItems) => {
    return menuItems.map((menu) => {
      if (menu.sub) {
        const { sub, title, icon, ...rest } = menu;
        const Icon = Icons[icon] || Fragment;
        return (
          <SubMenu
            key={rest.key}
            title={<div className='d-flex align-center-left'><Icon className='svg-icon sideBar-icon' />{title}</div>}
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

  const onNavigate = (menuItem) => {
    history.push(menuItem.item.props.link);
  };
  const onAccountSettingsOpen = (openKeys) => {
    setAccountSettingsOpen(openKeys.includes('accountSettings'));
  };
  return (
    <div className={classNames('side-bar justify-space-between d-col', { 'settings-open': isAccountSettingsOpen && !isBrandsOpen })}>
      <HeaderLogo onClick={() => history.push('/')} fullWidth />
      <AvatarPreviewBox history={history} brands={brands} user={user} onSettingClick={() => history.push('/settings/brand')} />
      <BrandsMenu brands={brands} activeBrand={user.activeBrand} onChange={onActiveBrandChange} onMenuOpen={onMenuOpen} />
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
          {mapMenuItems(accountSettingsMenus())}
        </Menu>
        <div className='upgrade'>
          <FillerButton onClick={logout} className='upgrade-btn' type='primary'>
            Logout
          </FillerButton>

        </div>
      </div>
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
