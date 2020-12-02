import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { useContext } from '../../../../../../../../actions';
import OrderReceipt from '../Receipt';

import {
  BillingDetails,
  CompleteOrderBtn,
  CouponSection,
  OrderSummary,
  PaymentMethods,
  PricingOptions,
  ShippingDetails,
  ShippingMethods
} from '..';
import MultipleStepForm from 'components/MultipleStepForm';
import {
  MarketingConsent,
  TermsAndConditions,
  Title
} from '../FuturisticForm/components';
import { CycleStepTitle } from 'components/common/Titles';

const { FlexBox, LayoutSwitch, ResizableTextarea, CheckoutInput } = common;

const getStepsNames = (shippingDetails, shippingMethodsEnabled) => {
  const defaultSteps = ['Billing Details']

  if (shippingDetails)
    defaultSteps.push('Shipping Details')

  if (shippingMethodsEnabled)
    defaultSteps.push('Shipping Methods')


  defaultSteps.push('Payment Details')
  return defaultSteps;

}
const ClassicForm = ({ language, section }) => {
  const { content: { twoStepCheckout }, texts = {}, hidden: isSetHidden } = section;
  const {
    state: {
      funnel: { paymentMethods, type } = {},
      product: {
        name,
        category: productCategory = 'checkout',
        price = {},
        payment,
        pageStyles = {},
        custom: {
          orderButtonText = 'Complete Order',
          declineButtonText = 'No Thanks',
          shippingDetails,
          couponSection,
          orderSummary,
          marketingConsent,
          marketingConsentIsRequired,
          termsAndConditions,
          termsAndConditionsIsRequired,
          shippingMethodsEnabled
        } = {}
      } = {}
    },
    actions
  } = useContext();

  const {
    fullName = 'Full Name',
    email
  } = language.checkout || {};

  const isOptInFunnel = type === 'OPT-IN';
  const isThankyouProduct = productCategory === 'thankyoupage';

  const onChange = ({ target: { name, value } }) => {
    actions.onProductFieldChange({ name, value });
  };


  const onSectionFieldChange = ({ target: { name, value } } = {}) => {
    actions.onSectionSettingChange({
      section: section,
      field: {
        name: name,
        value: value
      }
    });
  };


  if (isThankyouProduct && (isOptInFunnel || isSetHidden)) return null;


  const termsAndMarketingConsentRender = (
    <FlexBox column center='v-center h-center' className='mt-3'>
      <MarketingConsent
        onChange={onSectionFieldChange}
        texts={texts}
        enabled={marketingConsent}
        isRequired={marketingConsentIsRequired}
      />
      <TermsAndConditions
        onChange={onSectionFieldChange}
        texts={texts}
        enabled={termsAndConditions}
        isRequired={termsAndConditionsIsRequired}
      />
    </FlexBox>
  );

  const renderShippingMethod = (
    (shippingMethodsEnabled && shippingDetails) && (
      <FlexBox column>
        <CycleStepTitle step='3'>Shipping Methods</CycleStepTitle>
        <ShippingMethods />
      </FlexBox>
    )
  )

  const stepsNames = getStepsNames(shippingDetails, shippingMethodsEnabled);

  return (
    <FlexBox column className='relative-element p-3'>
      <LayoutSwitch active={productCategory}>
        <FlexBox column id='checkout'>
          {
            twoStepCheckout ? (
              <MultipleStepForm steps={stepsNames}>
                <Fragment>
                  <BillingDetails
                    twoStepCheckout={twoStepCheckout}
                    color={pageStyles.themeColor}
                    language={language}
                  />
                  <PricingOptions format={price.format} />
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
                    <PricingOptions format={price.format} />
                    {orderSummary &&
                      <OrderSummary
                        price={price}
                        productName={name}
                        payment={payment}
                        language={language}
                      />}
                  </Fragment>
                )}
                {renderShippingMethod}
                <Fragment>
                  <PaymentMethods
                    twoStepCheckout={twoStepCheckout}
                    step={shippingDetails ? (renderShippingMethod ? 4 : 3) : 2}
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
                  {termsAndMarketingConsentRender}
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
                <PricingOptions format={price.format} />
                {renderShippingMethod}
                <PaymentMethods
                  twoStepCheckout={twoStepCheckout}
                  step={shippingDetails ? (renderShippingMethod ? 4 : 3) : 2}
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
                {termsAndMarketingConsentRender}
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

ClassicForm.propTypes = { language: PropTypes.objectOf(PropTypes.object).isRequired };

export default ClassicForm;
