import React from 'react';
import common from 'components/common';
import ReactTooltip from 'react-tooltip';
import { SiMinutemailer } from 'react-icons/si';
import { GrAnnounce } from 'react-icons/gr';

import { getPriceFormat, trimExtraText } from 'libs';
import defaultProductImage from 'assets/images/big-logo-1.png';

const { Card } = common;


const ProductCard = ({
  onDelete,
  onDuplicate,
  name,
  category,
  currency,
  price: { amount, format } = {},
  onEdit,
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

  const isThankyouPage = category === 'thankyoupage';
  const isCheckoutProduct = category === 'checkout';
  const isUpsellProduct = category === 'upsell';
  const isOptInProduct = category === 'opt-in';
  const hasPrice = isCheckoutProduct || isUpsellProduct;


  return (
    <Card className='product-card'>
      <div
        style={coverImageStyle}
        className='product-image-container'
      >
        <div className='head'>
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
          {isCheckoutProduct &&
           <i
             data-tip='Checkout Product'
             data-type='info'
             role='presentation'
             className='fas fa-shopping-cart product-category-icon'
           />}

          {isUpsellProduct &&
            <i
              data-tip='Upsell Product'
              data-type='info'
              className='fas fa-chart-line product-category-icon'
              role='presentation'
            />
          }

          {isThankyouPage &&
          <GrAnnounce
            data-tip='Thank you Page'
            data-type='info'
            role='presentation'
            className='product-category-icon'
          />
          }

          {isOptInProduct &&
          <SiMinutemailer
            data-tip='Opt-in Page'
            data-type='info'
            role='presentation'
            className='product-category-icon'
          />
          }
        </div>
      </div>
      <div className='product-content'>
        <div className='title-text'>
          <span data-tip={trimExtraText(name, 70)} data-type='info' data-multiline>
            {name}
          </span>
        </div>

        {hasPrice &&
        <div className='price-text text-center'>
          {price}
        </div>
        }

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
