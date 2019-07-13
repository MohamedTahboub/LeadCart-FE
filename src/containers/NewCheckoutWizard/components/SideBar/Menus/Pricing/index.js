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
const { Panel } = Collapse;
const currenciesList = currencies.map((c) => ({ value: c.code, label: c.name }));

const Settings = ({
  product: { url, price = {}, payment } = {},
  subdomain,
  ...props
}) => (
  <MenuItem>
    <MenuTitle>Settings</MenuTitle>
    <MenuContent>
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel header='Price' key='1'>
          <InputRow>
            <InputRow.Label>Currency</InputRow.Label>
            <InputRow.SearchInput
              size='small'
              options={currenciesList}
              defaultValue={price.currency || 'USD'}
              name='price.currency'
              onChange={props.onChange}
            />
          </InputRow>
          <PaymentType
            payment={payment}
            onChange={props.onChange}
            price={price}
          />
        </Panel>
        <Panel header='Payment Gateways' key='2'>
          <PaymentGateway {...props} payment={payment} />
        </Panel>
      </Collapse>
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
