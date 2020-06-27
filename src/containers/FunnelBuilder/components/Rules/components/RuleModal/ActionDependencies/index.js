import React from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';

import {
  ExternalIntegration,
  ManualFulfillment,
  SuccessUrls
} from './components';

const { LayoutSwitch } = common;

const ActionDependencies = (props) => {
  const { integrationKey, type, metaData, onChange } = props;

  if (integrationKey !== 'leadcart_fulfillment')
    return <ExternalIntegration {...props} />;

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
