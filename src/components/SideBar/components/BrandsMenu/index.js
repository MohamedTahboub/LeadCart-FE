import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { Search } from 'components/Inputs';
import { insensitiveSearch } from 'helpers/common';
import { Button } from 'components/Buttons';
import { NewBrandModal } from '../../../../containers/Account/components/Brands/components';
import { notification } from 'libs';
import * as brandsActions from '../../../../actions/brands';
import BrandAvatar from './BrandAvatar';
import { brandsTypes } from '../../../../propTypes';


const CREATE_NEW_BRAND = uuid();

const { SubMenu, Item: MenuItem, Divider } = Menu;

const BrandsMenu = ({ brands, activeBrand: activeBrandId, onChange, onMenuOpen, createBrand, credits }) => {
  const [brandsFilter, filterBrands] = useState('');
  const [isCreateBrandModalOpen, setCreateModalOpen] = useState(false);
  const [isBrandsOpen, setBrandsOpen] = useState(false);

  const toggleCreateModalOpen = () => setCreateModalOpen(!isCreateBrandModalOpen);
  const _filterBrands = (event) => filterBrands(event.target.value);
  const _onChange = ({ key }) => (key === CREATE_NEW_BRAND) ? toggleCreateModalOpen() : onChange(key);
  const onOpenChange = (openKeys) => {
    setBrandsOpen(openKeys.find((key) => key === 'brands'));
    onMenuOpen(isBrandsOpen);
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

  const activeBrand = brands.find(({ id }) => id === activeBrandId) || {};
  return (
    <div className={classNames('brands-menu', { 'brands-menu-open': isBrandsOpen })} data-testid='brands-menu'>
      <Menu
        className={classNames('brands-navigation', { 'is-open': isBrandsOpen })}
        mode='inline'
        selectedKeys={[activeBrand.id]}
        defaultOpenKeys={[isBrandsOpen && 'brands']}
        inlineIndent={6}
        onOpenChange={onOpenChange}
        onClick={_onChange}
      >
        <SubMenu className='always-active fixed-brands-title' title={<span>{activeBrand.name}</span>} key='brands'>
          <Search placeholder='Search brands...' onChange={_filterBrands} className='minimal-input brands-search' />
          {
            brands.filter(({ name }) => insensitiveSearch(brandsFilter, name))
              .map((brand) => (
                <MenuItem key={brand.id} className={classNames({ active: brand.id === activeBrandId })}>
                  <BrandAvatar brand={brand} className='mr-3' />
                  {brand.name}
                </MenuItem>
              ))
          }
          <Divider />
          <MenuItem key={CREATE_NEW_BRAND} className='center-content'><Button>+ Create new</Button></MenuItem>
        </SubMenu>
      </Menu>
      <div style={{ border: '1px solid #E8E8E8' }} />
      {
        isCreateBrandModalOpen && (
          <NewBrandModal
            onClose={toggleCreateModalOpen}
            onCreate={onCreateBrand}
            credits={credits}
          />
        )
      }
    </div>
  );
};

BrandsMenu.propTypes = {
  brands: PropTypes.arrayOf(brandsTypes.brandType).isRequired,
  activeBrand: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  createBrand: PropTypes.func.isRequired
};
const mapStateToProps = ({ redemption: { credits } = {} }) => ({ credits });
export default connect(mapStateToProps, brandsActions)(BrandsMenu);
