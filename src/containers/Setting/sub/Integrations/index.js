import React, { useState } from 'react';

import common from 'components/common';
import servicesList from './components/servicesList';

import {
  ConnectModal,
  IntegrationsGrid,
  IntegrationsTable,
  LayoutOptions,
  LayoutSwitch
} from './components';

const { MainTitle, Button } = common;

const ActiveIntegrationLayout = ({ layout, ...props }) => (
  <LayoutSwitch active={layout}>
    <IntegrationsGrid id='grid' {...props} />
    <IntegrationsTable id='list' {...props} />
  </LayoutSwitch>
);


const Integrations = ({ integrations, ...props }) => {
  const [activeLayout, setActiveLayout] = useState('list');
  const [openModal, setOpenModal] = useState(false);

  const onLayoutChange = (value) => () => {
    setActiveLayout(value);
  };


  return (
    <div className='integrations-container'>
      <div className='flex-container fb-space-between'>
        <MainTitle>Service&apos;s Integrations</MainTitle>
        <LayoutOptions
          onChange={onLayoutChange}
          active={activeLayout}
        />
        <Button
          onClick={() => setOpenModal(true)}
          className='primary-color'
        >
          New Integration
        </Button>
      </div>
      <ActiveIntegrationLayout
        layout={activeLayout}
        list={integrations}
      />
      <ConnectModal
        open={openModal}
        onToggle={() => setOpenModal(false)}
      />

    </div>
  );
};

Integrations.defaultProps = { integrations: servicesList };

export default Integrations;
