import React from 'react';
import { connect } from 'react-redux';
import { HiOutlineDuplicate } from 'react-icons/hi';
import ReactTooltip from 'rc-tooltip';

import common from 'components/common';
import defaultProductImage from 'assets/images/big-logo-1.png';
import CardFooter from './CardFooter';
import CardContent from './CardContent';

const { Card } = common;

const ProductCard = ({
  onDelete,
  onDuplicate,
  name,
  category,
  currency,
  price: { amount, format } = {},
  onEdit,
  thumbnail = defaultProductImage,
  funnels,
  productId
}) => {
  const isThankyouPage = category === 'thankyoupage';
  const isCheckoutProduct = category === 'checkout';
  const isUpsellProduct = category === 'upsell';
  const isOptInProduct = category === 'opt-in';
  const hasPrice = isCheckoutProduct || isUpsellProduct;

  const footerProps = { onDelete, onEdit };
  const contentProps = {
    name,
    category,
    currency,
    amount,
    format,
    thumbnail,
    funnels,
    productId,
    isThankyouPage,
    isCheckoutProduct,
    isUpsellProduct,
    isOptInProduct,
    hasPrice
  };


  return (
    <Card className='product-card m-2'>
      <ReactTooltip overlay='Duplicate' placement='left' mouseEnterDelay={0.3}>
        <HiOutlineDuplicate
          className='fas fa-copy  product-card-duplicate-icon clickable-product-icon'
          role='presentation'
          onClick={onDuplicate}
          size={22}
        />
      </ReactTooltip>

      <CardContent {...contentProps} />
      <CardFooter {...footerProps} />
    </Card>
  );
};

ProductCard.propTypes = {};

const mapStateToProps = ({ funnels }) => ({ funnels });

export default connect(mapStateToProps)(ProductCard);
