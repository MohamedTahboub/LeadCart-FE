import React, { useState, Fragment } from 'react';
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
      name='type'
      onChange={onChange}
      options={[
        { label: 'One Time Price', value: 'Onetime' },
        { label: 'Subscription', value: 'Subscription' },
        { label: 'Split Payments', value: 'Split' },
      ]}
    />
  </InputRow>
);

export default ({ payment = {}, price: productPrice, onChange }) => {
  console.log('==========>', payment, price);
  const initState = { ...payment, price: productPrice };

  const [state, setState] = useState({ ...initState });
  const { price, type = 'Onetime' } = state;
  const { label: typelabel, name: typeName, options: typeOptions = [] } = paymentTypesOptions(type) || {};


  const onFieldChange = ({ target: { name, value } }) => {
    const newState = { ...state, [name]: value };
    setState(newState);

    const { name: customField, options: [defaultOption] = [] } = paymentTypesOptions(newState.type);
    onChange({
      price: newState.price,
      payment: {
        type: newState.type || 'Onetime',
        [customField]: newState[customField] || defaultOption
      }
    });
  };

  return (
    <Fragment>
      <InputRow>
        <InputRow.Label>Price</InputRow.Label>
        <InputRow.PriceField
          onChange={onFieldChange}
          currancy='$'
          name='price'
          value={price}
        >
        </InputRow.PriceField>
      </InputRow>
      <PaymentTypeSelector value={type} onChange={onFieldChange} />
      {type !== 'Onetime'
                && (
                  <InputRow>
                    <InputRow.Label>{typelabel}</InputRow.Label>
                    <InputRow.SelectOption
                      onChange={onFieldChange}
                      name={typeName}
                      value={state[typeName]}
                      options={typeOptions.map((f) => ({ label: f, value: f }))}
                    />
                  </InputRow>
                )}
    </Fragment>
  );
};
