import React from 'react';
import PropTypes from 'prop-types';
import creditsImage from 'assets/images/payment-cards.png';
import paypalImage from 'assets/images/paypal-thumbnail.png';
import cashOnDeliveryImage from 'assets/images/cod_icon.png';
import razorpayLogo from 'assets/images/brands/razorpay-logo.svg';
import clx from 'classnames';

import './style.css';

const getPaymentImageByName = (name) => {
  const images = {
    Paypal: paypalImage,
    Stripe: creditsImage,
    COD: cashOnDeliveryImage,
    Razorpay: razorpayLogo
  };
  return images[name];
};

const PaymentGatewayImage = ({ className, name, image, ...props }) => {

  const imageSrc = getPaymentImageByName(name) || image;
  const classes = clx('payment-gateway-image', className);

  if (!imageSrc) return null;
  return (
    <img
      src={imageSrc}
      alt='paypal brand'
      className={classes}
    />
  );
};

PaymentGatewayImage.propTypes = {};

export default PaymentGatewayImage;
