import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';

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
  subdomain,
  onToggleDarkTheme,
  translations,
  darkTheme,
  product: {
    settings: {
      language = 'default'
    } = {}
  } = {},
  onChange,
  ...props
}) => {
  const isLanguageExist = translations.find(({ value }) => value === language);

  if (!isLanguageExist) language = 'default';

  return (
    <MenuItem>
      <MenuTitle>Settings</MenuTitle>
      <MenuContent>
        <Collapse defaultActiveKey={['1', '2']}>
          <Panel header='Product Settings' key='1'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Translation</InputRow.Label>
              <InputRow.SearchInput
                size='small'
                width={150}
                name='settings.language'
                options={translations}
                value={language}
                defaultValue='English'
                onChange={onChange}
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Auto VAT Calculation:</InputRow.Label>
              <InputRow.SwitchInput
                disabled
                className='sidebar-switch-input onoff-switch-label'
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
                <abbr title='General Data Protection Regulation'>
                  GDPR
                </abbr>
                &ensp;
                Compliance:
              </InputRow.Label>
              <InputRow.SwitchInput
                disabled
                className='sidebar-switch-input onoff-switch-label'
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
};

Settings.propTypes = {
  product: PropTypes.objectOf({}),
  onChange: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  product: {}
};

const mapStateToProps = ({ translations }) => ({
  translations: translations.map((translation) => ({
    label: translation.name,
    value: translation._id || 'default'
  }))
});
export default connect(mapStateToProps)(Settings);
