import React, { useState, Fragment, useEffect } from 'react';
import common from 'components/common';
const { InputRow } = common;

const paymentTypesOptions = (type) => ({
  Split: { label: 'Number of Splits', name: 'splits', options: [3, 6, 9] },
  Subscription: { label: 'Recurring time', name: 'recurringPeriod', options: ['Monthly', 'Yearly'] }
}[type] || {});


const PaymentTypeSelector = ({ value = 'Onetime', onChange }) => (
  <InputRow>
    <InputRow.Label>Payment Type</InputRow.Label>
    <InputRow.SelectOption
      value={value}
      name='payment.type'
      onChange={onChange}
      options={[
        { label: 'One Time Price', value: 'Onetime' },
        { label: 'Subscription', value: 'Subscription' },
        { label: 'Split Payments', value: 'Split' },
      ]}
    />
  </InputRow>
);

export default ({
  payment = {},
  price = {},
  onChange
}) => {


  const onFieldChange = ({ target: { name, value } }) => {
    const payload = { payment, price }

    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...payload[key], ...nestedValue };
    }

    onChange({
      target: {
        name, value
      }
    });
  };
  const paymentType = payment.type
  const priceLabel = paymentType === 'Subscription' ? 'Subscription amount' : paymentType === 'Split' ? 'Split amount(each)' : 'Price'
  return (
    <Fragment>
      <InputRow>
        <InputRow.Label>{priceLabel}</InputRow.Label>
        <InputRow.PriceField
          onBlur={onFieldChange}
          currancy='$'
          name='price.amount'
          value={price.amount}
        >
        </InputRow.PriceField>
      </InputRow>
      <PaymentTypeSelector value={paymentType} onChange={onFieldChange} />
      {paymentType === 'Subscription'
        && (
          <InputRow>
            <InputRow.Label>Recurring Period</InputRow.Label>
            <InputRow.SelectOption
              onChange={onFieldChange}
              name='payment.recurringPeriod'
              value={payment.recurringPeriod}
              options={[
                { label: 'Monthly', value: 'MONTH' },
                { label: 'Yearly', value: 'YEAR' },
              ]}
            />
          </InputRow>
        )}
      {paymentType === 'Split'
        && (
          <InputRow>
            <InputRow.Label>Number of Splits</InputRow.Label>
            <InputRow.SelectOption
              onChange={onFieldChange}
              name='payment.splits'
              value={payment.splits}
              options={[
                { label: 3, value: 3 },
                { label: 6, value: 6 },
                { label: 9, value: 9 },
                { label: 12, value: 12 },
              ]}
            />
          </InputRow>
        )}
    </Fragment>
  );
};
