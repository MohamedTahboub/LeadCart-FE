import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';
import common from 'components/common';
import './style.css';

import {
  LayoutSwitch,
} from '..';


import {
  // ServiceCard,
  ServiceConnect,
  ServiceSelect
} from './components';

const {
  MainTitle,
  // Button,
  // InputRow,
  // Currency,
  // Tabs,
  // Card,
  Step
} = common;


const ConnectModal = ({
  open,
  onConnect,
  onConnectClosed,
  service,
  onToggle
}) =>
// const [stage, setStage] = useState(1);
// const [service, setService] = useState();

// const onSelect = (service) => () => {
//   setStage(2);
//   setService(service);
// };

  (
    <Modal
      contentClassName='integrations-modal'
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
      <ServiceConnect data={service} />
    </Modal>
  );
ConnectModal.propTypes = {

};

export default ConnectModal;


/*

      <LayoutSwitch active={stage} className='integrations-steps-content'>
        <ServiceSelect id={1} onSelect={onSelect} />
      </LayoutSwitch>


<div className='integrations-steps'>
        <Step
          value={stage}
          id={1}
        >
          Select a Service to Connect
        </Step>
        <Step
          value={stage}
          id={2}
        >
          Service Authentication
        </Step>
      </div>
*/
