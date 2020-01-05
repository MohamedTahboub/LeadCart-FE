import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { SlideModal } from 'components/Modals';
import servicesList from './components/servicesList';

import {
  LayoutSwitch,
  IntegrationsGrid,
  IntegrationsTable,
  LayoutOptions
} from './components';


const {
  MainTitle,
  Button,
  InputRow,
  Tabs
} = common;

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
      <SlideModal
        contentClassName='integrations-modal'
        type='vertical'
        isVisible={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className='header'>
          <MainTitle>connect new integrations</MainTitle>
        </div>

      </SlideModal>
    </div>
  );
};

Integrations.propTypes = {

};
Integrations.defaultProps = {
  integrations: servicesList
};

export default Integrations;
