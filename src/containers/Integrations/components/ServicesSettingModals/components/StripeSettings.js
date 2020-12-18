import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import Toggle from 'components/common/Inputs/Toggle';

const { FlexBox } = common;

const StripeSettings = (props) => {
  return (
    <FlexBox column>
      <FlexBox>
        <span className='bold-text gray-text' />
        <Toggle />
      </FlexBox>
    </FlexBox>
  );
};

StripeSettings.propTypes = {};

export default StripeSettings;
