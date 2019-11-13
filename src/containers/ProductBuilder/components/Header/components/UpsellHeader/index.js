import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DefaultHeader } from '..';


import common from 'components/common';

const {
  Button,
} = common;


const CheckoutHeader = ({
  product,
  onChange,
  subdomain,
  displayType,
  onDisplayChange,
  onSave,
  history,
  ...props
}) => {


  return (
    <DefaultHeader
      showDisplayModes
      onChange={onChange}
      history={history}
      product={product}
    >
      <div className='header-buttons'>
        <Button onClick={onSave} className='primary-btn '>
          <i className='fas fa-save' />
          Save
        </Button>
      </div>
    </DefaultHeader>
  );
}

CheckoutHeader.propTypes = {

};

export default CheckoutHeader;
