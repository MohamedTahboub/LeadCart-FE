import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import './style.css';

const {
  Collapse,
  InputRow,
  FlexBox
} = common;


const Settings = ({
  funnel: { url } = {},
  subdomain,
  onToggleDarkTheme,
  darkTheme,
  ...props
}) => (
  <FlexBox column className='margin-top-10'>
    <FlexBox column>
      <InputRow.Label className='sidebar-input-label'>Funnel Publishable Link (URL):</InputRow.Label>
      <InputRow.TextField
        className='full-width'
        name='url'
        onChange={({ target }) => props.onChange(target)}
        value={url}
      />
    </FlexBox>
    <FlexBox center='v-center' spaceBetween className='margin-top-10'>
      <InputRow.Label className='sidebar-input-label'>Builder Dark Theme:</InputRow.Label>
      <InputRow.SwitchInput
        value={darkTheme}
        onToggle={onToggleDarkTheme}
        className='sidebar-switch-input onoff-switch-label'
      />
    </FlexBox>
  </FlexBox>
);

Settings.propTypes = {
  product: PropTypes.objectOf({}),
  onChange: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  product: {}
};

export default Settings;
