import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

const { Card } = common;

const getProductImage = ({ image, asset } = {}) => {
  if (asset && asset.type === 'image') return asset.link;
  return image;
};

const ProductCard = ({
  onDelete,
  onDuplicate,
  pagePreferences,
  onEdit,
  active,
  ...props
}) => {
  const productImage = getProductImage(pagePreferences);

  const {
    name,
    price: { amount: price } = {}
  } = pagePreferences;

  const coverImageStyle = {
    backgroundImage: ` linear-gradient(
              to bottom,
              rgba(0,0,0, 0),
              rgba(0,0,0, .1)
            ),url(${productImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <Card className='product-card'>
      <div
        style={coverImageStyle}
        className='product-image-container'
      >
        <div className='head'>
          <span
            data-tip={`${active ? 'active' : 'inactive'}  product`}
            className={`status ${active ? 'active' : ''}`}
          />
          <span
            data-tip='Duplicate'
            className='duplicate-btn'
          >
            <i className='fas fa-copy scale-12' />
          </span>
        </div>
      </div>
      <div className='product-content'>
        <div className='title-text'>Name</div>
        <div className='price-text'>$33.3</div>
      </div>
      <div className='footer'>
        <i className='fas fa-edit' />
        <i className='fas fa-trash-alt' />
      </div>
    </Card>
  );
};

ProductCard.propTypes = {

};

export default ProductCard;
