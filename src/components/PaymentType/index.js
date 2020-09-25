import React, { Fragment } from 'react';
import common from 'components/common';


import './style.css';
const { InputRow, Currency } = common;

const { Label, SelectOption, TextField } = InputRow;
const PaymentTypeSelector = ({ value = 'Onetime', onChange }) => (
  <InputRow>
    <Label>Payment Type</Label>
    <SelectOption
      value={value}
      name='payment.type'
      className='small-select-element'
      onChange={onChange}
      options={[
        { label: 'One Time Price', value: 'Onetime' },
        { label: 'Subscription', value: 'Subscription' },
        { label: 'Split Payments', value: 'Split' }
      ]}
    />
  </InputRow>
);

export default ({
  payment = {},
  price = {},
  currency = 'USD',
  onChange
}) => {
  const onFieldChange = ({ target: { name, value } }) => {
    const payload = { payment, price };

    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...payload[key], ...nestedValue };
    }

    onChange({ target: { name, value } });
  };
  const paymentType = payment.type;
  const priceLabel = paymentType === 'Subscription' ? 'Subscription amount' : paymentType === 'Split' ? 'Split Amount (Each)' : 'Price';
  return (
    <Fragment>
      <InputRow>
        <Label>{priceLabel}</Label>
        <TextField
          onBlur={onChange}
          className='default-pricing-field-length'
          name='price.amount'
          type='number'
          defaultValue={price.amount}
          prefix={<Currency value={currency} />}
          uncontrolled
        />
      </InputRow>
      <PaymentTypeSelector value={paymentType} onChange={onFieldChange} />
      {paymentType === 'Subscription'
        && (
          <InputRow>
            <Label>Recurring Period</Label>
            <SelectOption
              onChange={onFieldChange}
              className='small-select-element'
              name='payment.recurringPeriod'
              value={payment.recurringPeriod}
              options={[
                { label: 'Monthly', value: 'MONTH' },
                { label: 'Yearly', value: 'YEAR' }
              ]}
            />
          </InputRow>
        )}
      {paymentType === 'Split'
        && (
          <InputRow>
            <Label>Number of Splits</Label>
            <SelectOption
              onChange={onFieldChange}
              className='small-select-element'
              name='payment.splits'
              value={payment.splits}
              options={[
                { label: 3, value: 3 },
                { label: 6, value: 6 },
                { label: 9, value: 9 },
                { label: 12, value: 12 }
              ]}
            />
          </InputRow>
        )}
    </Fragment>
  );
};
