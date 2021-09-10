import React from 'react';
import { LayoutSwitch } from 'components/common/Layout';

import {
  AcadleDependencies,
  Common,
  Twilio
} from './components';

const ExternalIntegrationDependencies = (props) => {
  const { integrationKey = 'classic' } = props;

  return (
    <LayoutSwitch active={integrationKey} fallback={<Common {...props} />}>
      <Common {...props} id='classic' />
      <Twilio {...props} id='lc_twilio' />
      <AcadleDependencies {...props} id='lc_acadle' />
    </LayoutSwitch>
  );
};

ExternalIntegrationDependencies.propTypes = {};

export default ExternalIntegrationDependencies;
