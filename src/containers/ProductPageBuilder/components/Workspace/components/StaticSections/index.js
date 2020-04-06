import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { SettingsHandle } from '../common';
import { useContext } from '../../../../actions';

import './style.css';
import {
  BillingDetails,
  CompleteOrderBtn,
  OrderSummary,
  PaymentMethods,
  ShippingDetails,
  CouponSection
} from '../../components';

const { FlexBox } = common;


const StaticSections = ({ onSetting, language }) => {
  const {
    state: {
      product: {
        name,
        price = {},
        payment = { methods: ['Paypal', 'Stripe'] },
        addOns = {},
        styles = {},
        custom = {},
        orderButtonText = 'Complete Order'
      } = {},
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

  const onChange = ({ target }) => {
    actions.onProductFieldChange(target);
  };

  return (
    <FlexBox column className='relative-element'>
      <SettingsHandle onClick={onSectionSettings} />
      <BillingDetails
        color={styles.themeColor}
        language={language}
      />
      {custom.shippingDetails && (
        <ShippingDetails
          color={styles.themeColor}
          language={language}
        />
      )}
      <PaymentMethods
        step={addOns.shippingDetails ? 3 : 2}
        // onOptionSelected={onOptionSelected}
        methods={payment.methods}
        // onShowSetting
        // onFieldChange
        language={language}
      />
      {custom.couponSection && (
        <CouponSection
          color={styles.themeColor}
          language={language}
        />
      )}
      <OrderSummary
        price={price}
        // productName='Growth hacking'
        productName={name}
        payment={payment}
        language={language}
      />
      <CompleteOrderBtn
        name='orderButtonText'
        text={orderButtonText}
        color={styles.themeColor}
        onChange={onChange}
        language={language}
      />
    </FlexBox>
  );
};

StaticSections.propTypes = {

};

export default StaticSections;
