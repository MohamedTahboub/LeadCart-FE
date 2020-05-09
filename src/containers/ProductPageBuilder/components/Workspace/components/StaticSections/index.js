import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { SettingsHandle } from '../common';
import { useContext } from '../../../../actions';

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
        type: productType = 'checkout',
        price = {},
        payment = { methods: ['Paypal', 'Stripe'] },
        addOns = {},
        styles = {},
        content = {},
        custom = {},
        orderButtonText = 'Complete Order',
        declineBtnText = 'No Thanks'
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
      <LayoutSwitch active={productType}>
        <Fragment id='checkout'>
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
            text={orderButtonText}
            color={styles.themeColor}
            onChange={onChange}
          />
        </Fragment>
        <FlexBox
          id='upsell'
          className='pt-4'
          column
          center='h-center'
        >
          <CompleteOrderBtn
            text={orderButtonText}
            color={styles.themeColor}
            onChange={onChange}
          />
          <ResizableTextarea
            onChange={onChange}
            name='content.declineBtnText'
            value={declineBtnText}
            style={{ minWidth: '400px', outlineStyle: 'none' }}
            className='medium-text blush-gray max-w-500 margin-v-20 underlined-text aligned-center'
          />
        </FlexBox>
      </LayoutSwitch>
    </FlexBox>
  );
};

StaticSections.propTypes = {};

export default StaticSections;
