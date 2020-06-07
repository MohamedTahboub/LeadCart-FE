import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import productSample from 'data/product.json';
// import hardCodedMessages from 'assets/hardCodedMessages.json';
// import upsellSample from 'data/upsell.json';
import * as productActions from 'actions/product';
import { connect } from 'react-redux';
import { notification } from 'libs';
import common from '../common';
import { CheckoutTemplates, UpsellsTemplates } from './TemplatesList';
import ProductCategories from './ProductCategories';
import { Modal } from '../Modals';

import './style.css';

const {
  Button
} = common;

const getTemplateColor = (template) => {
  const schema = {
    temp1: 'rgb(6, 147, 227)',
    temp2: 'rgb(247, 141, 167)',
    temp3: 'rgb(0, 208, 132)',
    temp4: 'rgb(255, 105, 0)',
    temp5: 'rgb(235, 20, 76)',
    temp6: 'rgb(247, 141, 167)',
  };
  return schema[template] ? schema[template] : schema.temp1;
};

const NextPage = ({ page, ...props }) => {
  switch (page) {
  case 'categories': return <ProductCategories {...props} />;
  case 'checkoutTemplates': return <CheckoutTemplates {...props} />;
  case 'upsellsTemplates': return <UpsellsTemplates {...props} />;
  default: return <ProductCategories {...props} />;
  }
};


const ProductCategoryModal = ({ show, onClose, ...props }) => {
  // const [category, setCategory] = useState('checkout');

  const onSubmit = (category) => () => {
    const product = productSample;
    product.category = category;

    props.createNewProduct(
      product,
      {
        onSuccess: (product) => {
          // setProgress(false)

          notification.success('Product Created');
          setTimeout(() => {
            props.history.push(`/products/${product.id}`);
          }, 300);
        },
        onFailed: (message) => {
          notification.failed(message);
          // setProgress(false)
        }
      }
    );
  };

  return (
    <Modal
      containerClassName=''
      className='transparent-bg'
      isVisible={show}
      hideCloseBtn
      footer={(
        <Button
          onClick={onClose}
          className='percreate-product-modal-cancel-btn'
        >
          Cancel
        </Button>
      )}
    >
      <ProductCategories
        onSelect={onSubmit}
        // onSubmit={onSubmit}
      />
    </Modal>
  );
};

ProductCategoryModal.propTypes = {
  show: PropTypes.bool
};

ProductCategoryModal.defaultProps = {
  show: false,
};

export default connect(null, productActions)(ProductCategoryModal);
