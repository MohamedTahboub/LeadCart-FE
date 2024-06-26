import React, { useState } from 'react';

import { SlideModal } from 'components/Modals';
import common from 'components/common';
import { ServiceConnect, ServiceSelect } from './components';
import { LayoutSwitch } from '..';
import './style.css';

const { MainTitle, Step } = common;

const ConnectModal = ({
  open,
  onToggle
}) => {
  const [stage, setStage] = useState(1);
  const [service, setService] = useState();

  const onSelect = (service) => () => {
    setStage(2);
    setService(service);
  };

  return (
    <SlideModal
      contentClassName='integrations-modal'
      type='vertical'
      isVisible={open}
      onClose={onToggle}
    >
      <div className='header'>
        <MainTitle>Connect New Integrations</MainTitle>
      </div>
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
      <LayoutSwitch active={stage} className='integrations-steps-content'>
        <ServiceSelect id={1} onSelect={onSelect} />
        <ServiceConnect id={2} data={service} />
      </LayoutSwitch>
    </SlideModal>
  );
};

export default ConnectModal;
