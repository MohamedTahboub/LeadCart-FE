import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import productSample from 'data/product.json';
import * as productActions from 'actions/product';
import { notification } from 'libs';
import common from '../common';
import ProductCategories from './ProductCategories';
import { Modal } from '../Modals';

import './style.css';

const { Button } = common;

const updateWithFuturisticForm = (sections = []) => {
  if (!Array.isArray(sections)) return [];
  return sections.map((section) => {
    if (section.type === 'checkoutSection') {
      return {
        ...section,
        styles: { theme: 'futuristic' }
      };
    }
    return section;
  });
};

const ProductCategoryModal = ({ show, onClose, ...props }) => {
  const onSubmit = (category) => () => {
    const product = productSample;
    product.category = category;

    if (category === 'checkout')
      product.sections = updateWithFuturisticForm(product.sections);

    props.createNewProduct(
      product,
      {
        onSuccess: ({ _id, id = _id, category }) => {
          notification.success(`New ${category} Product Created`);
          const stateSuffix = category === 'checkout' ? '?state=new' : '';

          setTimeout(() => {
            props.history.push(`/products/${id}${stateSuffix}`);
          }, 300);
        },
        onFailed: notification.failed
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
      <ProductCategories onSelect={onSubmit} />
    </Modal>
  );
};

ProductCategoryModal.propTypes = { show: PropTypes.bool };

ProductCategoryModal.defaultProps = { show: false };

export default connect(null, productActions)(ProductCategoryModal);
