import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { SettingsHandle } from '../common';

import './style.css';
import {
  BillingDetails,
  CompleteOrderBtn,
  OrderSummary,
  PaymentMethods,
} from '../../components';

const { FlexBox } = common;


const StaticSections = ({ onSetting, language }) => {
  const onSectionSettings = () => {
    const meta = {
      type: 'staticSectionSettings',
      menuTitle: 'Payment & Pricing Settings'
    };
    onSetting(meta);
  };

  return (
    <FlexBox column className='relative-element'>
      <SettingsHandle onClick={onSectionSettings} />
      <BillingDetails
      // color={color}
        language={language}
      />
      <PaymentMethods
        step={2}
        // onOptionSelected={onOptionSelected}
        methods={['Paypal', 'Stripe']}
        // onShowSetting
        // onFieldChange
        language={language}
      />
      <OrderSummary
        price={32}
        productName='Growth hacking'
        // payment={product.payment}
        language={language}
      />
      <CompleteOrderBtn
      // text={product.pagePreferences && product.pagePreferences.orderButtonText}
      // color={color}
      // onChange={onChange}
        language={language}
      />
    </FlexBox>
  );
};

StaticSections.propTypes = {

};

export default StaticSections;
