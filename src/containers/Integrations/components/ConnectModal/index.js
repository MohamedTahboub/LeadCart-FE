import React from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';
import { ServiceConnect } from './components';
import './style.css';

const { MainTitle } = common;

const ConnectModal = ({
  open,
  onConnectClosed,
  service,
  onToggle
}) => (
    <Modal
      className='integrations-modal'
      isVisible={open}
      onClose={onConnectClosed}
    >
      <div className='header'>
        <MainTitle>
          Connect with
        {service.name}
        </MainTitle>
      </div>
      <ServiceConnect data={service} onModalToggle={onToggle} />
    </Modal>
  );

export default ConnectModal;
