import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import './style.css';

const {
  InputRow,
  FlexBox
} = common;

const { Label, TextField, Toggle } = InputRow;


const Settings = ({
  funnel: { url } = {},
  onToggleDarkTheme,
  darkTheme,
  onChange,
  ...props
}) => (
  <FlexBox column className='margin-top-10'>
    <FlexBox column>
      <Label className='sidebar-input-label'>
          Funnel Publishable Link (URL):
      </Label>
      <TextField
        className='full-width'
        name='url'
        onChange={onChange}
        value={url}
      />
    </FlexBox>
    <FlexBox center='v-center' spaceBetween className='margin-top-10'>
      <Label className='sidebar-input-label'>
          Builder Dark Theme:
      </Label>
      <Toggle
        value={darkTheme}
        onToggle={onToggleDarkTheme}
      />
    </FlexBox>
  </FlexBox>
);

Settings.propTypes = {
  product: PropTypes.objectOf({}),
  onChange: PropTypes.func.isRequired
};

Settings.defaultProps = { product: {} };

export default Settings;
