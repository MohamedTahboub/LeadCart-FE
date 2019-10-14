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
const languages = [
  { value: 'en', label: 'English' }
];
const {
  Collapse, InputRow, MediumCard, Title
} = common;
const { Panel } = Collapse;
const currenciesList = currencies.map((c) => ({ value: c.code, label: c.name }));

const Settings = ({
  product: { url, price = {}, payment } = {},
  subdomain,
  onToggleDarkTheme,
  darkTheme,
  ...props
}) => (
  <MenuItem>
    <MenuTitle>Settings</MenuTitle>
    <MenuContent>
      <Collapse defaultActiveKey={['1']}>
        <Panel header='Product Builder Settings' key='1'>
          <InputRow className='sidebar-row'>
            <InputRow.Label className='sidebar-input-label'>Dark Theme</InputRow.Label>
            <InputRow.SwitchInput
              value={darkTheme}
              onToggle={onToggleDarkTheme}
              className='sidebar-switch-input onoff-switch-label'
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
