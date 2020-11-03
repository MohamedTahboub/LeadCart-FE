import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import creditsImage from 'assets/images/payment-cards.png';
import paypalImage from 'assets/images/paypal-thumbnail.png';
import cashOnDeliveryImage from 'assets/images/cod_icon.png';
import razorpayLogo from 'assets/images/brands/razorpay-logo.svg';
import PaymentGatewayImage from '../PaymentGatewayImage';
import { RadioGroup } from '../Inputs';

const { FlexBox, CheckCard, LayoutSwitch } = common;

const getPaymentImageByName = (name) => {
  const images = {
    Paypal: paypalImage,
    Stripe: creditsImage,
    COD: cashOnDeliveryImage,
    Razorpay: razorpayLogo
  };
  return images[name];
};

const PaymentGatewaysOptions = ({ methods = ['COD'], labels: paymentMethodsLabels = {}, theme = 'cards' }) => {
  const [active, setActive] = useState(methods[0]);


  const paymentMethods = methods.map((method) => ({
    image: getPaymentImageByName(method),
    name: method,
    label: paymentMethodsLabels[method] || method
  }));

  const onChange = (name) => {
    setActive(name);
  };

  return (
    <LayoutSwitch active={theme}>
      <FlexBox id='cards'>
        {paymentMethods.map((payment) => (
          <CheckCard
            {...payment}
            key={payment.name}
            active={active === payment.name}
            className='ml-3'
            onClick={() => onChange(payment.name)}
          />
        ))}
      </FlexBox>
      <PaymentGatewaysRadio id='radio' methods={paymentMethods} onSelect={onChange} active={active} />
    </LayoutSwitch>

  );
};

const PaymentGatewaysRadio = ({ methods, onSelect, active }) => {

  const renderPaymentMethodsOptions = (methods.map((payment) => (
    ({
      label: (
        <FlexBox flex spaceBetween>
          <span>{payment.label}</span>
          <PaymentGatewayImage name={payment.name} />
        </FlexBox>
      ),
      value: payment.image,
      name: payment.name
    })
  )));

  return (
    <RadioGroup
      className='payment-methods-radio-group my-4'
      optionClassName='payment-method-radio-input'
      options={renderPaymentMethodsOptions}
      onChange={onSelect}
      name='published'
      value={active}
    />
  );
};
PaymentGatewaysOptions.propTypes = {};

export default PaymentGatewaysOptions;
