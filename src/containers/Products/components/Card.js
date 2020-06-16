import React from 'react';
import common from 'components/common';
import ReactTooltip from 'react-tooltip';
import { getPriceFormat, trimExtraText } from 'libs';
import defaultProductImage from 'assets/images/big-logo-1.png';
const { Card } = common;


const ProductCard = ({
  onDelete,
  onDuplicate,
  name,
  category,
  price: { amount, currency, format } = {},
  onEdit,
  available: active,
  thumbnail = defaultProductImage
}) => {

  const coverImageStyle = {
    backgroundImage: ` linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.14),
              rgba(0,0,0, .1)
            ),url(${thumbnail})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };


  const price = getPriceFormat(amount, currency, format);

  return (
    <Card className='product-card'>
      <div
        style={coverImageStyle}
        className='product-image-container'
      >
        <div className='head'>
          {
          /*<span
            data-tip={`${active ? 'active' : 'inactive'}  product`}
            data-type='info'
            className={`status ${active ? 'active' : ''}`}
          />
        */}
          <span
            data-tip='Duplicate'
            data-type='info'
            className='duplicate-btn'
            onClick={onDuplicate}
            role='presentation'
          >
            <i className='fas fa-copy scale-12 duplicate-icon' />
          </span>
        </div>
        <div className='product-category'>
          {category === 'checkout' ? (
            <i
              data-tip='Checkout Product'
              data-type='info'
              role='presentation'
              className='fas fa-shopping-cart'
            />
          ) : (
            <i
              data-tip='Upsell Product'
              data-type='info'
              className='fas fa-chart-line'
              role='presentation'
            />
          )}
        </div>
      </div>
      <div className='product-content'>
        <div className='title-text'>
          <span data-tip={trimExtraText(name, 70)} data-type='info' data-multiline>
            {name}
          </span>
        </div>
        <div className='price-text text-center'>
          {price}
        </div>
      </div>
      <div className='footer'>
        <i
          data-tip='Edit'
          data-type='info'
          onClick={onEdit}
          className='fas fa-edit'
          role='presentation'
        />
        <i
          data-tip='Delete'
          data-type='error'
          onClick={onDelete}
          className='fas fa-trash-alt'
          role='presentation'
        />
      </div>
      <ReactTooltip delayShow={300}/>
    </Card>
  );
};

ProductCard.propTypes = {};

export default ProductCard;
