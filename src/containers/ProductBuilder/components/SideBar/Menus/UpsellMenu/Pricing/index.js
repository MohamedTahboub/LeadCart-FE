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
  MenuFlexContent
} from '../MenuElements';

const {
  Collapse, InputRow, MediumCard, Title
} = common;
// const { Panel } = Collapse;
const currenciesList = currencies.map((c) => ({ value: c.code, label: c.name }));

const Settings = ({
  product: {
    url,
    price = {},
    payment
  } = {},
  subdomain,
  ...props
}) => (
  <MenuItem>
    <MenuTitle>Pricing</MenuTitle>
    <MenuContent className='normal-padding'>
      <div className='sub-menu-title'>Upsell Price:</div>
      <PaymentType
        payment={payment}
        onChange={props.onChange}
        price={price}
      />
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
