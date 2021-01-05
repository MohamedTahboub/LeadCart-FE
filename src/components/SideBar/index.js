import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { HeaderLogo } from 'components/common/logos';
import common from 'components/common';
import { notification } from 'libs';
import * as brandsAction from 'actions/brands';
import * as logout from 'actions/logout';
import * as modalsActions from 'actions/modals';
import { appInit } from 'actions/appInit';
import { AvatarPreviewBox, BrandsMenu, Menu, MenuFooter } from './components';

import './style.css';

const { FlexBox } = common;

const SideBar = ({
  history,
  user,
  appInit,
  logout,
  updateActiveBrand,
  brands,
  credits
}) => {
  const pathname = history.location.pathname;
  const [activeLink, setActiveLink] = useState(pathname);

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


  const onNavigate = (link) => () => {
    setActiveLink(link);
    history.push(link);
  };
  const menuProps = {
    user,
    history,
    onNavigate,
    activeLink,
    onLogout: logout,
    credits
  };


  return (
    <FlexBox className='side-bar' column >
      <HeaderLogo onClick={() => history.push('/')} fullWidth />
      <AvatarPreviewBox history={history} brands={brands} user={user} onSettingClick={() => history.push('/settings/brand')} />
      <BrandsMenu brands={brands} activeBrand={user.activeBrand} onChange={onActiveBrandChange} />
      <Menu {...menuProps} />
    </FlexBox>
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
