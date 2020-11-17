import React from 'react';
import { connect } from 'react-redux';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import ReactTooltip from 'rc-tooltip';

import common from 'components/common';
import defaultProductImage from 'assets/images/big-logo-1.png';
import CardContent from './CardContent';

const { Card } = common;

const getMainColor = (sections, pageStyles) => {
  const checkoutSection = sections.find(({ type }) => type === 'checkoutSection');
  const hasThemeColor = Boolean(checkoutSection?.styles?.themeColor);
  const hasPageStylesThemeColor = Boolean(pageStyles.themeColor);
  const hasCompleteOrderButtonStyles = Boolean(checkoutSection?.styles?.completeOrderButton);
  const isOptInHasBackgroundColor = pageStyles?.pageBackgroundSettings?.firstSectionBackground?.backgroundColor;

  if (hasThemeColor)
    return checkoutSection?.styles?.themeColor;
  else if (hasCompleteOrderButtonStyles)
    return checkoutSection?.styles?.completeOrderButton?.background;
  else if (hasPageStylesThemeColor)
    return pageStyles.themeColor;
  else if (isOptInHasBackgroundColor)
    return pageStyles?.pageBackgroundSettings?.firstSectionBackground?.backgroundColor;
  else
    return '#4DA1FF';
};


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
  productId,
  sections,
  pageStyles = {}
}) => {
  const isThankyouPage = category === 'thankyoupage';
  const isCheckoutProduct = category === 'checkout';
  const isUpsellProduct = category === 'upsell';
  const isOptInProduct = category === 'opt-in';
  const hasPrice = isCheckoutProduct || isUpsellProduct;
  const borderBottomColor = getMainColor(sections, pageStyles);

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
      <CardContent {...contentProps} />

      <ReactTooltip overlay='Duplicate' placement='left' mouseEnterDelay={0.3}>
        <HiOutlineDuplicate
          className='product-card-duplicate-icon clickable-product-icon'
          role='presentation'
          onClick={onDuplicate}
          size={22}
        />
      </ReactTooltip>

      <ReactTooltip overlay='Delete' placement='top' mouseEnterDelay={0.3}>
        <MdDelete
          onClick={onDelete}
          className='product-card-delete-icon clickable-product-icon '
          role='presentation'
          size={22}
        />
      </ReactTooltip>

      <ReactTooltip overlay='Edit' placement='top' mouseEnterDelay={0.3}>
        <MdModeEdit
          onClick={onEdit}
          className='product-card-edit-icon clickable-product-icon'
          role='presentation'
          size={22}
        />
      </ReactTooltip>

      <div className='footer-border-bottom' style={{ backgroundColor: borderBottomColor }} />
    </Card>
  );
};

ProductCard.propTypes = {};

const mapStateToProps = ({ funnels }) => ({ funnels });

export default connect(mapStateToProps)(ProductCard);
