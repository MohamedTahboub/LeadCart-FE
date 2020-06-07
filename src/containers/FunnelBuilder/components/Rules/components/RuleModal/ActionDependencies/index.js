import React from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';

import {
  ManualFulfillment,
  SuccessUrls
} from './components';

const { LayoutSwitch } = common;

const ActionDependencies = ({ integrationKey, type, metaData, onChange }) => {
  console.log('integrationKey', integrationKey, type);
  if (integrationKey !== 'leadcart_fulfillment')
    return null;

  const passedProps = {
    ...metaData,
    onChange
  };


  return (
    <LayoutSwitch active={type}>
      <SuccessUrls id='SUCCESS_URLS' {...passedProps} />
      <ManualFulfillment id='MANUAL_FULFILLMENT' {...passedProps} />
    </LayoutSwitch>
  );
};

ActionDependencies.propTypes = {};

export default ActionDependencies;
