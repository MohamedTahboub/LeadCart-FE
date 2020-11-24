import React from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';
import { LayoutSwitch } from 'components/common/Layout';
import { OfflinePayment } from './components';
import './style.css';

const { MainTitle } = common;
const ConnectModal = ({
  open,
  onConnectClosed,
  service
  // onToggle
}) => (
  <Modal
    className='integrations-modal'
    isVisible={open}
    onClose={onConnectClosed}
  >
    <div className='header'>
      <MainTitle>
        {`Update the ${service.name} Details`}
      </MainTitle>
    </div>
    <LayoutSwitch active={service.key} fallback={<OfflinePayment id='lc_offlinePayment' />}>
      <OfflinePayment id='lc_offlinePayment' />
    </LayoutSwitch>
  </Modal>
);

export default ConnectModal;
