import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { SettingsHandle } from '../common';
import { useContext } from '../../../../actions';
import OrderReceipt from './components/Receipt';

import './style.css';
import {
  BillingDetails,
  CompleteOrderBtn,
  CouponSection,
  OrderSummary,
  PaymentMethods,
  ShippingDetails
} from './components';

const { FlexBox, LayoutSwitch, ResizableTextarea } = common;


const StaticSections = ({ onSetting, language }) => {
  const {
    state: {
      product: {
        name,
        category: productCategory = 'checkout',
        price = {},
        payment = { methods: ['Paypal', 'Stripe'] },
        addOns = {},
        styles = {},
        custom: {
          orderButtonText = 'Complete Order',
          declineButtonText = 'No Thanks',
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
      <SettingsHandle onClick={onSectionSettings} />
      <LayoutSwitch active={productCategory}>
        <FlexBox column id='checkout'>
          <BillingDetails
            color={styles.themeColor}
            language={language}
          />
          {shippingDetails && (
            <ShippingDetails
              color={styles.themeColor}
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
              color={styles.themeColor}
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
            color={styles.themeColor}
            onChange={onChange}
          />
        </FlexBox>
        <FlexBox
          id='upsell'
          className='pt-4'
          column
          center='h-center'
        >
          <CompleteOrderBtn
            name='custom.orderButtonText'
            text={orderButtonText}
            color={styles.themeColor}
            onChange={onChange}
          />
          <ResizableTextarea
            onChange={onChange}
            name='custom.declineButtonText'
            value={declineButtonText}
            style={{
              minWidth: '400px',
              outlineStyle: 'none',
              textDecoration: 'underline'
            }}
            className='medium-text blush-gray max-w-500 margin-v-20 aligned-center'
          />
        </FlexBox>
        <FlexBox
          id='thankyoupage'
          style={{ justifyContent: 'center' }}
          className='medium-text blush-gray max-w-500 margin-v-20 aligned-center'
        >
          <OrderReceipt />
        </FlexBox>
      </LayoutSwitch>
    </FlexBox>
  );
};

StaticSections.propTypes = {
  language: PropTypes.objectOf(PropTypes.object).isRequired,
  onSetting: PropTypes.func.isRequired
};

export default StaticSections;
