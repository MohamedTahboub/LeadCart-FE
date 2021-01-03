import React, { Fragment, useState } from 'react';
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


const { InputRow, FlexBox, Title } = common;
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
  brands
}) => {
  const [isBrandsOpen, setBrandsOpen] = useState(false);

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

  return (
    <FlexBox className='side-bar' column >
      <HeaderLogo onClick={() => history.push('/')} fullWidth />
      <AvatarPreviewBox history={history} brands={brands} user={user} onSettingClick={() => history.push('/settings/brand')} />
      <BrandsMenu brands={brands} activeBrand={user.activeBrand} onChange={onActiveBrandChange} onMenuOpen={onMenuOpen} />
      <Menu user={user} history={history} />
      <MenuFooter history={history} onLogout={logout} />
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
