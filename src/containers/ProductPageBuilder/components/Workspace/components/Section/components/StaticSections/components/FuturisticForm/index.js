import React from 'react';
import common from 'components/common';
import './style.css';
import { Inputs, PaymentGatewayImage } from './components';
import clx from 'classnames';
import { MdLock } from 'react-icons/md';


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
const FlatForm = (props) => {
  return (
    <FlexBox className='white-bg soft-edges p-4'>
      <Tabs active='shipping' className='custom-form-tabs flex' tabsContentClassName='pl-3 flex'>
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
          <FlexBox flex wrappable>
            <InputField
              flex
              label={(
                <FlexBox flex spaceBetween>
                  <span className='label-content'>Shipping Address</span>
                  <span className='label-content primary-text item-clickable'>+ Add Line 2</span>
                </FlexBox>
              )}
              placeholder='Shipping Address'
            />
          </FlexBox>
          <FlexBox flex center='v-center' wrappable>
            <Select
              flex
              label='Country'
              placeholder='Select'
              className='mr-3'
              options={countriesOptions}
            />
            <InputField
              flex
              label='City'
              placeholder='City'
            />
            <InputField
              flex
              label='Zip Code'
              placeholder='0000'
            />
          </FlexBox>
          <FlexBox column flex center='v-center'>
            <OrderButton
              className='mt-5 mb-3'
              prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
            />
            <span className='label-content primary-text item-clickable underlined-text without-hover'>Have a Coupon Code?</span>
          </FlexBox>
        </Tab>

        <Tab title='Payment' id='payment'>
          <RadioGroup
            className='payment-methods-radio-group mx-3 my-4'
            optionClassName='payment-method-radio-input'
            value='Stripe'
            options={[
              {
                label: (
                  <FlexBox flex spaceBetween>
                    <span>Paypal</span>
                    <PaymentGatewayImage name='Paypal' />
                  </FlexBox>
                ),
                value: 'Paypal'
              },
              {
                label: (
                  <FlexBox flex spaceBetween>
                    <span>Credit Card</span>
                    <PaymentGatewayImage name='Stripe' />
                  </FlexBox>
                ),
                value: 'Stripe'
              }
            ]}
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
          <FlexBox column flex center='v-center'>
            <OrderButton
              className='mt-5 mb-3'
              text='Pay Now $315.00'
              prefix={<MdLock color='currentColor' size={16} className='mr-2' />}
            />
            <span className='label-content primary-text item-clickable underlined-text without-hover'> &larr; Back to billing & shipping info</span>
          </FlexBox>

        </Tab>
      </Tabs>
    </FlexBox>
  );
};

FlatForm.propTypes = {};

export default FlatForm;
