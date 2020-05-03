import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components/Inputs';
import { Menu } from 'antd';
import classNames from 'classnames';
import { insensitiveSearch } from 'helpers/common';
import { Button } from 'components/Buttons';
import { CreateModal } from '../../containers/Account/components/Brands/components';
import { notification } from 'libs';
import { connect } from 'react-redux';
import * as brandsActions from '../../actions/brands';
import { v4 as uuid } from 'uuid';
import BrandAvatar from './BrandAvatar';

import { brandsTypes } from '../../propTypes';

const CREATE_NEW_BRAND = uuid();

const { SubMenu, Item: MenuItem, Divider } = Menu;

const BrandsMenu = ({ brands, activeBrand: activeBrandId, onChange, onMenuOpen, createBrand }) => {
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
    <div className='brands-menu'>
      <Menu
        className={classNames('brands-navigation', { 'is-open': isBrandsOpen })}
        mode='inline'
        selectedKeys={[activeBrand]}
        defaultOpenKeys={[isBrandsOpen && 'brands']}
        inlineIndent={6}
        onOpenChange={onOpenChange}
        onClick={_onChange}
      >
        <SubMenu className='always-active' title={<span>{activeBrand.name}</span>} key='brands'>
          <Input.Search placeholder='Search brands...' onChange={_filterBrands} className='minimal-input'/>
          {
            brands.filter(({ name }) => insensitiveSearch(brandsFilter, name))
              .map((brand) => (
                <MenuItem key={brand.id}>
                  <BrandAvatar brand={brand} className='mr-3'/>
                  {brand.name}
                </MenuItem>
              ))
          }
          <Divider />
          <MenuItem key={CREATE_NEW_BRAND} className='center-content'><Button>+ Create new</Button></MenuItem>
        </SubMenu>
      </Menu>
      <div style={{ border: '1px solid #E8E8E8' }}/>
      {
        isCreateBrandModalOpen && (
          <CreateModal onClose={toggleCreateModalOpen} onCreate={onCreateBrand} />
        )
      }
    </div>
  );
};

BrandsMenu.propTypes = {
  brands: PropTypes.arrayOf(brandsTypes.brandType).isRequired,
  // Active brand id
  activeBrand: PropTypes.string.isRequired,
  // On brand change
  onChange: PropTypes.func.isRequired,
  // Brand creator
  createBrand: PropTypes.func.isRequired
};

export default connect(null, brandsActions)(BrandsMenu);
