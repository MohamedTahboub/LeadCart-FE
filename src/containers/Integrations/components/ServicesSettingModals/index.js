import React from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';
import { LayoutSwitch } from 'components/common/Layout';
import { StripeSettings } from './components';
// import './style.css';

const { MainTitle } = common;
const ServicesSettingsModal = ({
  open,
  onConnectClosed,
  service
}) => (
  <Modal
    className='integrations-modal'
    isVisible={open}
    onClose={onConnectClosed}
  >
    <div className='header'>
      <MainTitle>
        {`${service.name} Settings`}
      </MainTitle>
    </div>
    <LayoutSwitch active={service.key} fallback={<StripeSettings id='lc_offlinePayment' />}>
      <StripeSettings id='lc_stripe' service={service} />
    </LayoutSwitch>
  </Modal>
);

export default ServicesSettingsModal;
