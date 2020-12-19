import React from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';
import { LayoutSwitch } from 'components/common/Layout';
import { OfflinePayments } from './components';
import './style.css';

const { MainTitle } = common;
const ConnectModal = ({
  open,
  onConnectClosed,
  service
  // onToggle
}) => (
  <Modal
    className='offline-integration-modal'
    isVisible={open}
    onClose={onConnectClosed}
  >
    <div className='header'>
      <MainTitle>
        {`Update the ${service.name} Details`}
      </MainTitle>
    </div>
    <LayoutSwitch active={service.key} fallback={<OfflinePayments id='lc_offlinePayment' />}>
      <OfflinePayments id='lc_offlinePayment' service={service} />
    </LayoutSwitch>
  </Modal>
);

export default ConnectModal;
