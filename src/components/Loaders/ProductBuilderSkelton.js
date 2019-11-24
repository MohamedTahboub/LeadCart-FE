import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ProductBuilderSkelton = ({ message }) => (
  <div className='loading-layer'>
    <div className='loading-message'>{message}</div>
  </div>
);

ProductBuilderSkelton.propTypes = {
  message: PropTypes.string
};
ProductBuilderSkelton.defaultProps = {
  message: 'Setting Up...'
};

export default ProductBuilderSkelton;
