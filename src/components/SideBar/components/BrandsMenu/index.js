import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Select from 'react-select';
import { IoMdAddCircle } from 'react-icons/io';

import { NewBrandModal } from '../../../../containers/Account/components/Brands/components';
import { notification } from 'libs';
import * as brandsActions from '../../../../actions/brands';
import { brandsTypes } from '../../../../propTypes';
import common from 'components/common';
import TypeBadge from './TypeBadge';

import './style.css';


const { FlexBox, Title, Tooltip } = common;


const BrandsMenu = ({ brands, activeBrand: activeBrandId, onChange, createBrand, credits, brandSelectLoading, ...props }) => {
  const [isCreateBrandModalOpen, setCreateModalOpen] = useState(false);

  const toggleCreateModalOpen = () => setCreateModalOpen(!isCreateBrandModalOpen);

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


  const LabelBrandOption = ({ brand }) => {
    const { id: brandId, logo: brandImg, name: brandName } = brand;
    const isActiveBran = brandId === activeBrandId;

    return (
      <FlexBox className={classNames('sidebar-brand-option v-center', { 'active-brand-option': isActiveBran })} >
        <div className='sidebar-brand-option-img' style={{ backgroundImage: `url(${brandImg})` }} />
        <Title className='sidebar-brand-option-name' >
          {brandName}
        </Title>

        <TypeBadge brand={brand} className='sidebar-brand-option-package' isActiveBran={isActiveBran} />
      </FlexBox>
    );
  };


  const brandsOptions = brands.map((brand) => ({ label: <LabelBrandOption brand={brand} />, value: brand.id }));

  const activeBrand = brands.find(({ id }) => id === activeBrandId) || {};

  const ActiveLabelBrandOption = () => <Title className='sidebar-brand-option-name letter-spacing-0'> {activeBrand.name}</Title>;

  const activeLabelBrandOption = { label: <ActiveLabelBrandOption name={activeBrand.name} />, value: activeBrand.id };


  return (
    <Fragment>
      <FlexBox className='sidebar-brands-menu v-center px-2' >
        <Tooltip mouseEnterDelay={0.3} text='Create New Brand' placement='topRight'>
          <IoMdAddCircle className='create-new-brand-button item-clickable' onClick={toggleCreateModalOpen} size={18} />
        </Tooltip>

        <Select
          className='sidebar-brands-select-container'
          options={brandsOptions}
          value={activeLabelBrandOption}
          classNamePrefix='sidebar-brands-select'
          onChange={({ value }) => onChange(value)}
          isLoading={brandSelectLoading}
        />
      </FlexBox>

      {
        isCreateBrandModalOpen && (
          <NewBrandModal
            onClose={toggleCreateModalOpen}
            onCreate={onCreateBrand}
            credits={credits}
          />
        )
      }
    </Fragment>
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
