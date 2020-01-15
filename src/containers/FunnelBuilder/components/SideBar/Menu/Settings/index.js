import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import './style.css';

import {
  MenuItem,
  MenuTitle,
  MenuContent,
} from '../MenuElements';

const {
  Collapse,
  InputRow
} = common;
const { Panel } = Collapse;


const Settings = ({
  funnel: { url } = {},
  subdomain,
  onToggleDarkTheme,
  darkTheme,
  ...props
}) => (
  <MenuItem>
    <MenuTitle>Settings</MenuTitle>
    <MenuContent>
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel header='Funnel Settings' key='1'>
          <InputRow className='sidebar-row flexColumn alignedStart'>
            <InputRow.Label className='sidebar-input-label'>Product Publishable Link (URL):</InputRow.Label>
            <InputRow.TextField
              name='url'
              onChange={({ target }) => props.onChange(target)}
              value={url}
            />
          </InputRow>
        </Panel>

        <Panel header='Wizard Settings' key='2'>
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
