import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';
import common from 'components/common';
import './style.css';

import { ServiceConnect } from './components';

const { MainTitle } = common;


const ConnectModal = ({
  open,
  onConnectClosed,
  service,
  onToggle
}) => (
  <Modal
    className='integrations-modal'
    // contentClassName='integrations-modal'
    // type='vertical'
    isVisible={open}
    onClose={onConnectClosed}
  >
    <div className='header'>
      <MainTitle>
          Connect with
        {' '}
        {service.name}
      </MainTitle>
    </div>
    <ServiceConnect data={service} onModalToggle={onToggle}/>
  </Modal>
);
ConnectModal.propTypes = {};

export default ConnectModal;
