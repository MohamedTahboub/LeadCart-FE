import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { useContext } from '../../../../../../actions';
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
import MultipleStepForm from 'components/MultipleStepForm';

const { FlexBox, LayoutSwitch, ResizableTextarea, CheckoutInput } = common;


const StaticSections = ({ language, section }) => {
  const { content: { twoStepCheckout } } = section;
  const {
    state: {
      funnel: { paymentMethods } = {},
      product: {
        name,
        category: productCategory = 'checkout',
        price = {},
        payment,
        addOns = {},
        pageStyles = {},
        custom: {
          orderButtonText = 'Complete Order',
          declineButtonText = 'No Thanks',
          shippingDetails,
          couponSection,
          orderSummary
        } = {}
      } = {}
    },
    actions
  } = useContext();

  const {
    fullName = 'Full Name',
    email
  } = language.checkout || {};

  const onChange = ({ target: { name, value } }) => {
    actions.onProductFieldChange({ name, value });
  };

  return (
    <FlexBox column className='relative-element'>
      <LayoutSwitch active={productCategory}>
        <FlexBox column id='checkout'>
          {
            twoStepCheckout ? (
              <MultipleStepForm steps={shippingDetails ? ['Billing Details', 'Shipping Details', 'Payment Details'] : ['Billing Details', 'Payment Details']}>
                <Fragment>
                  <BillingDetails
                    twoStepCheckout={twoStepCheckout}
                    color={pageStyles.themeColor}
                    language={language}
                  />

                  {orderSummary &&
                    <OrderSummary
                      price={price}
                      productName={name}
                      payment={payment}
                      language={language}
                    />}

                </Fragment>

                {shippingDetails && (
                  <Fragment>
                    <ShippingDetails
                      color={pageStyles.themeColor}
                      language={language}
                    />

                    {orderSummary &&
                      <OrderSummary
                        price={price}
                        productName={name}
                        payment={payment}
                        language={language}
                      />}
                  </Fragment>
                )}

                <Fragment>
                  <PaymentMethods
                    twoStepCheckout={twoStepCheckout}
                    step={addOns.shippingDetails ? 3 : 2}
                    methods={paymentMethods}
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
                </Fragment>
              </MultipleStepForm>

            ) :
              <Fragment>
                <BillingDetails
                  twoStepCheckout={twoStepCheckout}
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
                  twoStepCheckout={twoStepCheckout}
                  step={addOns.shippingDetails ? 3 : 2}
                  methods={paymentMethods}
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
              </Fragment>
          }
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
            color={pageStyles.themeColor}
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
        <FlexBox
          id='opt-in'
          column
        >
          <CheckoutInput
            disabled
            label={fullName}
          />
          <CheckoutInput
            disabled
            label={email}
          />
          <CompleteOrderBtn
            name='custom.orderButtonText'
            className='mt-3 soft-edges py-1'
            text={orderButtonText}
            color={pageStyles.themeColor}
            onChange={onChange}
          />
        </FlexBox>
      </LayoutSwitch>
    </FlexBox>
  );
};

StaticSections.propTypes = { language: PropTypes.objectOf(PropTypes.object).isRequired };

export default StaticSections;
