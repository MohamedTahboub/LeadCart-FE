import React, { Fragment, useState } from 'react';
import common from 'components/common';
import './style.css';
import clx from 'classnames';
import { MdLock } from 'react-icons/md';
import { useContext } from '../../../../../../../../actions';
import { PricingOptions, ShippingMethods } from '..';
import { PhoneNumberInput } from 'components/common/Inputs';
import { BiHide, BiShow } from 'react-icons/bi';

import {
  CouponCodeForm,
  CustomOrderSummary,
  Inputs,
  MarketingConsent,
  OrderButton,
  PaymentGatewaysOptions,
  TermsAndConditions,
  Title
} from './components';

const { FlexBox, Tabs, Tab, ResizableInput } = common;

const {
  InputField,
  Select
  // RadioGroup
} = Inputs;

const countriesOptions = [{ label: 'United State', value: 'USA' }];
// const citiesOptions = [];


const FlatForm = ({ language, section }) => {
  const [showSecondAddress, setShowSecondAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('shipping');


  const {
    content: { twoStepCheckout: isMultiStepFormEnabled },
    texts = {},
    hidden: isSetHidden,
    styles: { themeColor = '#2d3d68' } = {}
  } = section;
  const {
    state: {
      funnel: { paymentMethods = ['COD'], type } = {},
      product: {
        name,
        price = {},
        payment = {},
        category: productCategory = 'checkout',
        // price = {},
        // payment,
        // addOns = {},
        // pageStyles = {},
        custom: {
          shippingDetails: shippingDetailsEnabled,
          billingAddress: withBillingAddress,
          // declineButtonText = 'No Thanks',
          couponSection: withCouponForm,
          marketingConsent,
          termsAndConditions,
          marketingConsentIsRequired,
          termsAndConditionsIsRequired,
          shippingMethodsEnabled
          // orderSummary
        } = {}
      } = {}
    },
    actions
  } = useContext();
  const hasShippingMethodsEnabled = shippingDetailsEnabled && shippingMethodsEnabled;
  const {
    billingAndShippingBtn = 'Continue to Payment',
    hideCouponCodeLabel = 'Hide Coupon Code',
    shippingMethodBtnText = 'Continue to Payment',
    orderBtn = 'Pay Now',
    haveCouponCodeLabel = 'Have a Coupon Code?',
    couponCodeBtnText = 'Apply',
    transactionGuaranteeMessage = 'Your transaction is secured with SSL encryption',
    backToBillingLinkText = '← Back to billing & shipping info',
    backToShippingMethodText = '← Back to shipping Method',
    addLine2Label = 'Add Line 2',
    removeLine2Label = 'Hide the second Address'
  } = texts;

  const isOptInFunnel = type === 'OPT-IN';
  const isThankyouProduct = productCategory === 'thankyoupage';

  const onToggleSecondAddress = () => setShowSecondAddress((show) => !show);

  if (isThankyouProduct && (isOptInFunnel || isSetHidden)) return null;

  const {
    billingDetails: billingDetailsLabel,
    shippingDetails: shippingDetailsTitle = 'Shipping Details',
    streetAddress: streetAddressLabel,
    streetAddress2: streetAddress2Label = 'Second Address',
    paymentMethods: paymentMethodsTitle = 'Payment Method',
    creditCards: creditCardsTitle = 'Credit Cards',
    payPal: payPalTitle = 'PayPal',
    cashOnDelivery: cashOnDeliveryTitle = 'Cash On Delivery',
    addressLine1Label = 'Address',
    addressLine1Placeholder = 'E.g Street, PO Box, or company name',
    postalCodeLabel = 'Zip Code/Postcode',
    pricingOptionsLabel
  } = language.checkout || {};

  const paymentMethodsLabels = {
    Stripe: creditCardsTitle,
    Paypal: payPalTitle,
    COD: cashOnDeliveryTitle
  };

  // const changeToTab = (tabName) => () => {
  //   setActiveTab(tabName);
  // };

  const onSectionFieldChange = ({ target: { name, value } } = {}) => {
    actions.onSectionSettingChange({
      section: section,
      field: {
        name: name,
        value: value
      }
    });
  };

  const multiStepFormRender = (
    <Tabs active={activeTab} className='custom-form-tabs flex' tabsContentClassName='pl-3 flex' titleColor={themeColor}>
      <Tab id='shipping' title={shippingDetailsEnabled ? 'Billing & Shipping Info' : 'Billing Info'}>
        <FlexBox flex wrappable>
          <InputField
            flex
            label='First Name'
            className='mr-3'
            placeholder='your name'
          />
          <InputField
            flex
            label='Last Name'
            placeholder='last name'
          />
        </FlexBox>

        <FlexBox flex wrappable>
          <InputField
            flex
            label='Email'
            className='mr-3'
            placeholder='Enter your email'
          />
          <PhoneNumberInput
            flex
            disabled
            label='Mobile No'
            placeholder='+1 218-266-6543'
            theme='modern'
          />
        </FlexBox>
        {withBillingAddress && (
          <FlexBox flex wrappable>
            <InputField
              flex
              label={addressLine1Label}
              className='mr-3'
              placeholder={addressLine1Placeholder}
            />
            <InputField
              flex
              label={postalCodeLabel}
              placeholder='00000'
            />
          </FlexBox>
        )}
        {shippingDetailsEnabled && (
          <Fragment>

            <FlexBox flex wrappable>
              <InputField
                flex
                label={(
                  <FlexBox flex spaceBetween>
                    <span className='label-content'>{streetAddressLabel}</span>
                    <span className='label-content primary-text parent-hover' >
                      <ResizableInput
                        onChange={onSectionFieldChange}
                        name={`texts.${!showSecondAddress ? 'addLine2Label' : 'removeLine2Label'}`}
                        value={!showSecondAddress ? addLine2Label : removeLine2Label}
                        style={{ background: 'transparent' }}
                        defaultValue={'Edit'}
                      />
                      {!showSecondAddress ? (
                        <BiShow onClick={onToggleSecondAddress} className='ml-3 item-clickable show-on-parent-hover' />
                      ) : (
                        <BiHide onClick={onToggleSecondAddress} className='ml-3 item-clickable show-on-parent-hover' />
                      )
                      }
                    </span>
                  </FlexBox>
                )}
                placeholder={streetAddressLabel}
              />
            </FlexBox>
            {showSecondAddress && (
              <FlexBox flex>
                <InputField
                  flex
                  label={streetAddress2Label}
                  placeholder={streetAddress2Label}
                />
              </FlexBox>
            )}
            <FlexBox flex center='v-center' wrappable>
              <Select
                flex
                label='Country'
                placeholder='Select'
                className='mr-3'
                options={countriesOptions}
              />

            </FlexBox>
            <FlexBox flex center='v-center' wrappable>
              <InputField
                flex
                label='Postal/ Zip Code'
                placeholder='0000'
              />
              <InputField
                flex
                label='City'
                placeholder='City'
              />
              <InputField
                flex
                label='State/ Province'
                placeholder='State'
              />
            </FlexBox>
          </Fragment>
        )}
        <FlexBox column flex center='v-center'>
          <OrderButton
            className='mt-5 mb-3'
            themeColor={themeColor}
            prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
            name={'texts.billingAndShippingBtn'}
            text={billingAndShippingBtn}
            onChange={onSectionFieldChange}
          />
        </FlexBox>
      </Tab>

      {hasShippingMethodsEnabled && (
        <Tab title='Shipping Methods' id='shippingMethods'>
          <ShippingMethods />
          <FlexBox column flex center='v-center'>
            <OrderButton
              className='mt-5 mb-3'
              themeColor={themeColor}
              prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
              name='texts.shippingMethodBtnText'
              text={shippingMethodBtnText}
              onChange={onSectionFieldChange}
            />
            <span className='label-content primary-text item-clickable underlined-text without-hover'>
              <ResizableInput
                onChange={onSectionFieldChange}
                name={'texts.backToBillingLinkText'}
                value={backToBillingLinkText}
                defaultValue={'Edit'}
                style={{ background: 'transparent' }}
              />
            </span>
          </FlexBox>
        </Tab>
      )}
      <Tab title='Payment' id='payment'>
        <PaymentGatewaysOptions methods={paymentMethods} labels={paymentMethodsLabels} theme='radio' />
        <FlexBox center='h-center' className='small-text gray-text mt-3'>
          <MdLock color='currentColor' size={16} className='mr-2' />
          <span >
            <ResizableInput
              onChange={onSectionFieldChange}
              name={'texts.transactionGuaranteeMessage'}
              value={transactionGuaranteeMessage}
              style={{ background: 'transparent' }}
              defaultValue={'Edit'}
            />
          </span>
        </FlexBox>
        <CouponCodeForm
          haveCouponCodeLabel={haveCouponCodeLabel}
          hideCouponCodeLabel={hideCouponCodeLabel}
          withCouponForm={withCouponForm}
          couponCodeBtnText={couponCodeBtnText}
          onChange={onSectionFieldChange}
          themeColor={themeColor}
        />

        <FlexBox flex>
          <PricingOptions title={pricingOptionsLabel} theme='radio' />
        </FlexBox>
        <FlexBox flex>
          <CustomOrderSummary
            price={price}
            productName={name}
            payment={payment}
            language={language}
          />
        </FlexBox>
        <FlexBox column flex center='v-center'>
          <OrderButton
            className='mt-5 mb-3'
            name='texts.orderBtn'
            text={orderBtn}
            onChange={onSectionFieldChange}
            themeColor={themeColor}
            prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
          />
          <FlexBox column center='v-center' className='my-3'>
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
          <span className='label-content primary-text item-clickable underlined-text without-hover'>
            <ResizableInput
              onChange={onSectionFieldChange}
              name={`texts.${hasShippingMethodsEnabled ? 'backToShippingMethodText' : 'backToBillingLinkText'}`}
              value={hasShippingMethodsEnabled ? backToShippingMethodText : backToBillingLinkText}
              defaultValue={'Edit'}
              style={{ background: 'transparent' }}
            />
          </span>
        </FlexBox>

      </Tab>
    </Tabs>
  );


  const singleStepFormRender = (
    <Fragment>
      <Title className='step-title'>{billingDetailsLabel}</Title>
      <FlexBox flex wrappable>
        <InputField
          flex
          label='First Name'
          className='mr-3'
          placeholder='your name'
        />
        <InputField
          flex
          label='Last Name'
          placeholder='last name'
        />
      </FlexBox>

      <FlexBox flex wrappable>
        <InputField
          flex
          label='Email'
          className='mr-3'
          placeholder='Enter your email'
        />
        <PhoneNumberInput
          flex
          label='Mobile No'
          placeholder='+1 218-266-6543'
          theme='modern'
        />
      </FlexBox>
      {withBillingAddress && (
        <FlexBox flex wrappable>
          <InputField
            flex
            label={addressLine1Label}
            className='mr-3'
            placeholder={addressLine1Placeholder}
          />
          <InputField
            flex
            label={postalCodeLabel}
            placeholder='00000'
          />
        </FlexBox>
      )}
      {shippingDetailsEnabled && (
        <Fragment>
          <Title className='step-title mt-3'>{shippingDetailsTitle}</Title>
          <FlexBox flex wrappable>
            <InputField
              flex
              label={(
                <FlexBox flex spaceBetween>
                  <span className='label-content'>{streetAddressLabel}</span>
                  <span className='label-content primary-text parent-hover' >
                    <ResizableInput
                      onChange={onSectionFieldChange}
                      name={`texts.${!showSecondAddress ? 'addLine2Label' : 'removeLine2Label'}`}
                      value={!showSecondAddress ? addLine2Label : removeLine2Label}
                      style={{ background: 'transparent' }}
                      defaultValue={'Edit'}
                    />
                    {!showSecondAddress ? (
                      <BiShow onClick={onToggleSecondAddress} className='ml-3 item-clickable show-on-parent-hover' />
                    ) : (
                      <BiHide onClick={onToggleSecondAddress} className='ml-3 item-clickable show-on-parent-hover' />
                    )}
                  </span>
                </FlexBox>
              )}
              placeholder={streetAddressLabel}
            />
          </FlexBox>
          {showSecondAddress && (
            <FlexBox flex>
              <InputField
                flex
                label={streetAddress2Label}
                placeholder={streetAddress2Label}
              />
            </FlexBox>
          )}
          <FlexBox flex center='v-center' wrappable>
            <Select
              flex
              label='Country'
              placeholder='Select'
              className='mr-3'
              options={countriesOptions}
            />
          </FlexBox>
          <FlexBox flex center='v-center' wrappable>
            <InputField
              flex
              label='Postal/ Zip Code'
              placeholder='0000'
            />
            <InputField
              flex
              label='City'
              className='ml-2'
              placeholder='City'
            />
          </FlexBox>
          <InputField
            flex
            label='State/ Province'
            placeholder='State'
          />
        </Fragment>
      )}
      {hasShippingMethodsEnabled && (
        <FlexBox column>
          <Title className='step-title mt-3'>Shipping Methods</Title>
          <ShippingMethods />
        </FlexBox>
      )}
      <Title className='step-title mt-3'>{paymentMethodsTitle}</Title>
      <PaymentGatewaysOptions methods={paymentMethods} labels={paymentMethodsLabels} theme='cards' />
      <FlexBox center='h-center' className='small-text gray-text mt-3'>
        <MdLock color='currentColor' size={16} className='mr-2' />
        <span >
          <ResizableInput
            onChange={onSectionFieldChange}
            name={'texts.transactionGuaranteeMessage'}
            value={transactionGuaranteeMessage}
            style={{ background: 'transparent' }}
            defaultValue={'Edit'}
          />
        </span>
      </FlexBox>
      <CouponCodeForm
        haveCouponCodeLabel={haveCouponCodeLabel}
        hideCouponCodeLabel={hideCouponCodeLabel}
        withCouponForm={withCouponForm}
        couponCodeBtnText={couponCodeBtnText}
        onChange={onSectionFieldChange}
        themeColor={themeColor}
      />
      <FlexBox flex>
        <PricingOptions title={pricingOptionsLabel} theme='radio' />
      </FlexBox>
      <FlexBox flex>
        <CustomOrderSummary
          price={price}
          productName={name}
          payment={payment}
          language={language}
        />
      </FlexBox>
      <FlexBox column flex center='v-center'>
        <OrderButton
          className='mt-5 mb-3'
          name='texts.orderBtn'
          text={orderBtn}
          onChange={onSectionFieldChange}
          themeColor={themeColor}
          prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
        />
      </FlexBox>
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
    </Fragment>

  );

  return (
    <FlexBox column className='futuristic-form-container p-4'>
      {isMultiStepFormEnabled ? multiStepFormRender : singleStepFormRender}
    </FlexBox>
  );
};

FlatForm.propTypes = {};

export default FlatForm;
