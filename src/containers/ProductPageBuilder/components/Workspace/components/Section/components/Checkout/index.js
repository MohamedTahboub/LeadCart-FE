import React from 'react';
import PropTypes from 'prop-types';

import common from 'components/common';
import { useContext } from '../../../../../../actions';
import { BillingDetails, CompleteOrderBtn, CouponSection, OrderSummary, PaymentMethods, ShippingDetails } from './components';

const { FlexBox } = common;


const Checkout = ({ onSetting, language }) => {
  const {
    state: {
      product: {
        name,
        price = {},
        payment = { methods: ['Paypal', 'Stripe'] },
        addOns = {},
        pageStyles = {},
        custom: {
          orderButtonText = 'Complete Order',
          shippingDetails,
          couponSection
        } = {}
      } = {}
    },
    actions
  } = useContext();


  const onSectionSettings = () => {
    const meta = {
      type: 'staticSectionSetting',
      menuTitle: 'Payment & Pricing Settings'
    };
    onSetting(meta);
  };

  const onChange = ({ target: { name, value } }) => {
    actions.onProductFieldChange({ name, value });
  };

  return (
    <FlexBox column className='relative-element'>
      <FlexBox column id='checkout'>
        <BillingDetails
          color={pageStyles.themeColor}
          language={language}
        />
        {shippingDetails && (
          <ShippingDetails
            color={pageStyles.themeColor}
            language={language}
          />
        )}
        <PaymentMethods
          step={addOns.shippingDetails ? 3 : 2}
          methods={payment.methods}
          language={language}
        />
        {couponSection && (
          <CouponSection
            color={pageStyles.themeColor}
            language={language}
          />
        )}
        <OrderSummary
          price={price}
          productName={name}
          payment={payment}
          language={language}
        />
        <CompleteOrderBtn
          name='custom.orderButtonText'
          text={orderButtonText}
          color={pageStyles.themeColor}
          onChange={onChange}
        />
      </FlexBox>
    </FlexBox>
  );
};

Checkout.propTypes = {
  language: PropTypes.objectOf(PropTypes.object).isRequired,
  onSetting: PropTypes.func.isRequired
};

export default Checkout;
