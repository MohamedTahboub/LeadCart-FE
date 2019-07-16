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
      <Collapse defaultActiveKey={['1']}>
        <Panel header='Accessability' key='1'>
          <InputRow className='sidebar-row flexColumn alignedStart'>
            <InputRow.Label className='sidebar-input-label'>Product Publishable Link (URL):</InputRow.Label>
            <InputRow.TextField
              name='url'
              onChange={props.onChange}
              value={url}
            />
          </InputRow>
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
