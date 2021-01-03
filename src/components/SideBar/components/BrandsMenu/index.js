import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Select from 'react-select';

import { Button } from 'components/Buttons';
import { NewBrandModal } from '../../../../containers/Account/components/Brands/components';
import { notification } from 'libs';
import * as brandsActions from '../../../../actions/brands';
import { brandsTypes } from '../../../../propTypes';
import common from 'components/common';


import './style.css';

const CREATE_NEW_BRAND = uuid();

const { FlexBox, Title } = common;

const BrandsMenu = ({ brands, activeBrand: activeBrandId, onChange, createBrand, credits }) => {
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

    return (
      <FlexBox className={classNames('sidebar-brand-option v-center', { 'active-brand-option': brandId === activeBrandId })} onClick={() => onChange(brandId)} >
        <div className='sidebar-brand-option-img' style={{ backgroundImage: `url(${brandImg})` }} />
        <Title className='sidebar-brand-option-name' >
          {brandName}
        </Title>
      </FlexBox>
    );
  };


  const CreateNewBrandButton = () => (
    <FlexBox className='v-center h-center' >
      <Button className='create-new-brand-button' onClick={toggleCreateModalOpen} >+ Create new</Button>
    </FlexBox>
  );

  const brandsOptions = brands.map((brand) => ({ label: <LabelBrandOption brand={brand} />, value: brand.id })).concat([{ label: <CreateNewBrandButton />, value: CREATE_NEW_BRAND }]);

  const activeBrand = brands.find(({ id }) => id === activeBrandId) || {};
  const ActiveLabelBrandOption = () => <Title className='sidebar-brand-option-name'> {activeBrand.name}</Title>;
  const activeLabelBrandOption = { label: <ActiveLabelBrandOption name={activeBrand.name} />, value: activeBrand.id };


  return (
    <Fragment>
      <Select className='sidebar-brands-select-container' options={brandsOptions} value={activeLabelBrandOption} classNamePrefix='sidebar-brands-select' />
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
