import React, { Fragment, useState } from 'react';
import common from 'components/common';
import './style.css';
import { Inputs, PaymentGatewayImage, Title } from './components';
import clx from 'classnames';
import { MdLock } from 'react-icons/md';
import { useContext } from '../../../../../../../../actions';


const { FlexBox, Tabs, Tab } = common;

const {
  InputField,
  Select,
  RadioGroup
} = Inputs;

const countriesOptions = [{ label: 'United State', value: 'USA' }];
const citiesOptions = [];
const OrderButton = ({ className, text = 'Continue to Payment', prefix = '', suffix = '', ...props }) => {

  return (
    <div className={clx(className, 'form-order-button')} {...props}>{prefix}{text}{suffix}</div>
  );
};
const FlatForm = ({ language, section }) => {
  const [showSecondAddress, setSHowSecondAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('shipping');


  const { content: { twoStepCheckout: isMultiStepFormEnabled }, hidden: isSetHidden } = section;
  const {
    state: {
      funnel: { paymentMethods = ['COD'], type } = {},
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
          shippingDetails: shippingDetailsEnabled,
          couponSection,
          orderSummary
        } = {}
      } = {}
    },
    actions
  } = useContext();


  const isOptInFunnel = type === 'OPT-IN';
  const isThankyouProduct = productCategory === 'thankyoupage';

  const onToggleSecondAddress = () => setSHowSecondAddress((show) => !show);

  if (isThankyouProduct && (isOptInFunnel || isSetHidden)) return null;

  const {
    billingDetails: billingDetailsLabel,
    shippingDetails: shippingDetailsTitle = 'Shipping Details',
    streetAddress: streetAddressLabel,
    streetAddress2: streetAddress2Label = 'Second Address',
    city: cityLabel,
    state: stateLabel,
    postal: postalLabel,
    country: countryLabel,
    paymentMethods: paymentMethodsTitle = 'Payment Method',
    creditCards: creditCardsTitle = 'Credit Cards',
    payPal: payPalTitle = 'PayPal',
    cashOnDelivery: cashOnDeliveryTitle = 'Cash On Delivery'
  } = language.checkout || {};

  const paymentMethodsLabels = {
    Stripe: creditCardsTitle,
    Paypal: payPalTitle,
    COD: cashOnDeliveryTitle
  };

  const renderPaymentMethodsOptions = (paymentMethods.map((payment) => (
    ({
      label: (
        <FlexBox flex spaceBetween>
          <span>{paymentMethodsLabels[payment] || payment}</span>
          <PaymentGatewayImage name={payment} />
        </FlexBox>
      ),
      value: payment
    })
  )));

  const changeToTab = (tabName) => () => {
    setActiveTab(tabName);
  };


  console.log({ shippingDetailsEnabled });

  const multiStepFormRender = (
    <Tabs active={activeTab} className='custom-form-tabs flex' tabsContentClassName='pl-3 flex'>
      <Tab id='shipping' title='Billing & Shipping Info'>
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
          <InputField
            flex
            label='Mobile No'
            placeholder='🇺🇸 +1 218-266-6543'
          />
        </FlexBox>
        {shippingDetailsEnabled && (
          <Fragment>

            <FlexBox flex wrappable>
              <InputField
                flex
                label={(
                  <FlexBox flex spaceBetween>
                    <span className='label-content'>{streetAddressLabel}</span>
                    <span className='label-content primary-text item-clickable' onClick={onToggleSecondAddress}>
                      {!showSecondAddress ? '+ Add Line 2' : 'Remove Second Address!'}
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
            prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
            onClick={changeToTab('payment')}
          />
          <span className='label-content primary-text item-clickable underlined-text without-hover'>Have a Coupon Code?</span>
        </FlexBox>
      </Tab>

      <Tab title='Payment' id='payment'>
        <RadioGroup
          className='payment-methods-radio-group my-4'
          optionClassName='payment-method-radio-input'
          value='Stripe'
          options={renderPaymentMethodsOptions}
          name='published'
        />

        <FlexBox flex wrappable>
          <InputField
            flex
            label='Card Number'
            placeholder='0000 0000 0000 0000'
          />
        </FlexBox>
        <FlexBox flex wrappable>
          <InputField
            flex
            label='Expiry date'
            className='mr-3'
            // type='date'
            placeholder='MM/YY'
          />
          <InputField
            flex
            label='CVV'
            type='password'
            placeholder='🔒 ****'
            inputProps={{ disabled: true }}
          />
        </FlexBox>
        <FlexBox center='h-center' className='small-text gray-text mt-3'>
          <MdLock color='currentColor' size={16} className='mr-2' />
          <span >
            Your transaction is secured with SSL encryption
          </span>
        </FlexBox>
        <FlexBox column flex center='v-center'>
          <OrderButton
            className='mt-5 mb-3'
            text='Pay Now $315.00'
            prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
          />
          <span onClick={changeToTab('shipping')} className='label-content primary-text item-clickable underlined-text without-hover'>
            &larr; Back to billing & shipping info
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
        <InputField
          flex
          label='Mobile No'
          placeholder='🇺🇸 +1 218-266-6543'
        />
      </FlexBox>
      {shippingDetailsEnabled && (
        <Fragment>
          <Title className='step-title mt-3'>{shippingDetailsTitle}</Title>
          <FlexBox flex wrappable>
            <InputField
              flex
              label={(
                <FlexBox flex spaceBetween>
                  <span className='label-content'>{streetAddressLabel}</span>
                  <span className='label-content primary-text item-clickable' onClick={onToggleSecondAddress}>
                    {!showSecondAddress ? '+ Add Line 2' : 'Remove Second Address!'}
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

      {isMultiStepFormEnabled && (
        <FlexBox column flex center='v-center'>
          <OrderButton
            className='mt-5 mb-3'
            prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
            onClick={changeToTab('payment')}
          />
          <span className='label-content primary-text item-clickable underlined-text without-hover'>Have a Coupon Code?</span>
        </FlexBox>
      )}

      <RadioGroup
        className='payment-methods-radio-group my-4'
        optionClassName='payment-method-radio-input'
        value='Stripe'
        options={renderPaymentMethodsOptions}
        name='published'
      />

      <Title className='step-title mt-3'>{paymentMethodsTitle}</Title>
      <FlexBox flex wrappable>
        <InputField
          flex
          label='Card Number'
          placeholder='0000 0000 0000 0000'
        />
      </FlexBox>
      <FlexBox flex wrappable>
        <InputField
          flex
          label='Expiry date'
          className='mr-3'
          // type='date'
          placeholder='MM/YY'
        />
        <InputField
          flex
          label='CVV'
          type='password'
          placeholder='🔒 ****'
          inputProps={{ disabled: true }}
        />
      </FlexBox>
      <FlexBox center='h-center' className='small-text gray-text mt-3'>
        <MdLock color='currentColor' size={16} className='mr-2' />
        <span >
          Your transaction is secured with SSL encryption
        </span>
      </FlexBox>
      <FlexBox column flex center='v-center'>
        <OrderButton
          className='mt-5 mb-3'
          text='Pay Now $315.00'
          prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
        />
        {isMultiStepFormEnabled ? (
          <span onClick={changeToTab('shipping')} className='label-content primary-text item-clickable underlined-text without-hover'>
            &larr; Back to billing & shipping info
          </span>
        ) : (
          <span className='label-content primary-text item-clickable underlined-text without-hover'>Have a Coupon Code?</span>
        )}
      </FlexBox>
    </Fragment>

  );

  return (
    <FlexBox column className='futuristic-form-container white-bg soft-edges p-4'>
      {isMultiStepFormEnabled ? multiStepFormRender : singleStepFormRender}
    </FlexBox>
  );
};

FlatForm.propTypes = {};

export default FlatForm;