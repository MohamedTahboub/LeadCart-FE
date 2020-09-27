import React from 'react';
import common from 'components/common';

import {
  ExternalIntegration,
  LicensesDistribution,
  ManualFulfillment,
  PrivateLeadcartFulfillment,
  RevokeAccessFulfillment,
  SuccessUrls,
  WebhooksForm
} from './components';

const { LayoutSwitch } = common;

const ActionDependencies = (props) => {
  const { integrationKey, type, metaData = {}, onChange } = props;

  const passedProps = {
    ...metaData,
    onChange
  };
  if (integrationKey === 'WEBHOOKS')
    return <WebhooksForm id='WEBHOOKS' {...passedProps} />;

  if (integrationKey !== 'leadcart_fulfillment')
    return <ExternalIntegration {...props} />;

  return (
    <LayoutSwitch active={type}>
      <SuccessUrls id='SUCCESS_URLS' {...passedProps} />
      <LicensesDistribution id='CODES_DISTRIBUTION' {...passedProps} />
      <ManualFulfillment id='MANUAL_FULFILLMENT' {...passedProps} />
      <RevokeAccessFulfillment id='REVOKE_LEADCART_ACCESS' {...passedProps} />
      <PrivateLeadcartFulfillment id='LEADCART_FULFILLMENT' {...passedProps} metaData={metaData} />
    </LayoutSwitch>
  );
};

ActionDependencies.propTypes = {};

export default ActionDependencies;
