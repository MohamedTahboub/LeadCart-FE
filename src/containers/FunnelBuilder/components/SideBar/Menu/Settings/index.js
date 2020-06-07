import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import PaymentsGateways from 'components/PaymentGateways';
import currencies from 'data/currencies.json';

import './style.css';
const currenciesList = currencies.map((c) => ({ value: c.code, label: c.name }));
const {
  InputRow,
  FlexBox
} = common;

const {
  // Label,
  TextField,
  // Toggle,
  SearchInput
} = InputRow;

const Label = (props) => (
  <InputRow.Label className='sidebar-input-label bold-text' {...props}>
    {props.children}
  </InputRow.Label>
);

const Settings = ({
  funnel: {
    url,
    paymentMethods,
    currency = 'USD'
  } = {},
  // onToggleDarkTheme,
  // darkTheme,
  onChange,
  ...props
}) => {

  const onFiledChange = ({ target: { name, value } }) => {
    onChange({ name, value });
  };

  return (
    <FlexBox column className='margin-top-10'>
      <FlexBox flex column>
        <FlexBox flex center='v-center'>
          <Label
            description='This will appear on your cart page,this is just for presentation purpose'
          >
            Currency:
          </Label>
          <SearchInput
            size='small'
            width={350}
            options={currenciesList}
            defaultValue={currency}
            name='currency'
            onChange={onFiledChange}
          />
        </FlexBox>
        <FlexBox flex column className='mt-3'>
          <Label>
            Payment Method:
          </Label>
          <PaymentsGateways
            name='paymentMethods'
            selected={paymentMethods}
            onChange={onFiledChange}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox column>
        <Label>
          Funnel Publishable Link (URL):
        </Label>
        <TextField
          className='full-width'
          name='url'
          onChange={onFiledChange}
          value={url}
        />
      </FlexBox>
    </FlexBox>
  );
};

Settings.propTypes = {
  product: PropTypes.objectOf({}),
  onChange: PropTypes.func.isRequired
};

Settings.defaultProps = { product: {} };

export default Settings;
