import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import currencies from 'data/currencies.json';
import PaymentType from 'components/PaymentType';
import PaymentGateway from 'components/PaymentGateways';
import './style.css';

import {
  MenuItem,
  MenuTitle,
  MenuContent,
} from '../MenuElements';

const { InputRow } = common;
const currenciesList = currencies.map((c) => ({ value: c.code, label: c.name }));

const formatOptions = [
  {
    label: '(1134.65)',
    value: 'amount'
  },
  {
    label: '(1135)',
    value: 'amount_no_decimals'
  },
  {
    label: '(1,134.65)',
    value: 'amount_with_comma_separator'
  },
  {
    label: '(1,135)',
    value: 'amount_with_comma_separator_no_decimals'
  }
];
const Settings = ({
  product: {
    price = {},
    payment
  } = {},
  subdomain,
  ...props
}) => (
  <MenuItem>
    <MenuTitle>Settings</MenuTitle>
    <MenuContent className='normal-padding'>
      <div className='sub-menu-title'>Product Price & Currency:</div>
      <InputRow>
        <InputRow.Label>Currency</InputRow.Label>
        <InputRow.SearchInput
          size='small'
          width={350}
          options={currenciesList}
          defaultValue={price.currency || 'USD'}
          name='price.currency'
          onChange={props.onChange}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>Price Format</InputRow.Label>
        <InputRow.SearchInput
          size='small'
          width={350}
          options={formatOptions}
          defaultValue={price.format || 'amount'}
          name='price.format'
          onChange={props.onChange}
          // dropdownClassName='price-format-options'
        />
      </InputRow>
      <PaymentType
        payment={payment}
        onChange={props.onChange}
        price={price}
      />
      <div className='sub-menu-title'>Product Payment Methods:</div>
      <PaymentGateway {...props} payment={payment} />
    </MenuContent>
  </MenuItem>
);

Settings.propTypes = {
  product: PropTypes.objectOf({}),
  onChange: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  product: {}
};

export default Settings;
