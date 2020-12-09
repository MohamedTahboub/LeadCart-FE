import React from 'react';
import PropTypes from 'prop-types';
import { LayoutSwitch } from 'components/common/Layout';

import {
  Common,
  Twilio
} from './components';

const ExternalIntegrationDependencies = (props) => {
  const { integrationKey = 'classic' } = props;

  return (
    <LayoutSwitch active={integrationKey} fallback={<Common {...props} />}>
      <Common {...props} id='classic' />
      <Twilio {...props} id='lc_twilio' />
    </LayoutSwitch>
  );
};

ExternalIntegrationDependencies.propTypes = {};

export default ExternalIntegrationDependencies;
