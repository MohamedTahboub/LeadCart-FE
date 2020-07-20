import React from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';

import {
  ExternalIntegration,
  ManualFulfillment,
  PrivateLeadcartFulfillment,
  SuccessUrls,
  WebhooksForm
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
      <WebhooksForm id='WEBHOOKS' {...passedProps} />
      <PrivateLeadcartFulfillment id='LEADCART_FULFILLMENT' {...passedProps} metaData={metaData} />
    </LayoutSwitch>
  );
};

ActionDependencies.propTypes = {};

export default ActionDependencies;
