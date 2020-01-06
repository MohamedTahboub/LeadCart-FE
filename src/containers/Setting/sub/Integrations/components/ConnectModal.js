import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SlideModal } from 'components/Modals';
import common from 'components/common';
import LayoutOptions from './LayoutOptions';
import IntegrationsGrid from './IntegrationsGrid';
import LayoutSwitch from './LayoutSwitch';
import IntegrationsTable from './IntegrationsTable';
import servicesList from './servicesList';


const CardsContainer = ({ className = '', children }) => (
  <div className={`crads-container-element ${className}`}>
    {children}
  </div>
);


const {
  MainTitle,
  Button,
  InputRow,
  Currency,
  Tabs
} = common;
const IntegrationServiceSelect = (props) => {
  const [activeLayout, setActiveLayout] = useState('list');
  const onSelect = () => {

  };
  const onLayoutChange = (value) => () => {
    setActiveLayout(value);
  };


  return (
    <div>
      <MainTitle>Select a service to connect...</MainTitle>
      <div className='flex-container'>
        <InputRow.TextField
          // className='products-search-field'
          //   onChange={onSelect}
          prefix={<Currency value={<i className='fas fa-search' />} />}
          // value={filterKeys.searchKey}
          name='service'
        />
        <LayoutOptions
          onChange={onLayoutChange}
          active={activeLayout}
        />
      </div>
      <CardsContainer>
        <LayoutSwitch active={activeLayout}>
          <IntegrationsGrid id='grid' list={servicesList} />
          <IntegrationsTable id='list' list={servicesList} />
        </LayoutSwitch>
      </CardsContainer>
    </div>
  );
};
const ConnectIntegration = (props) => <div>ConnectIntegration</div>;


const ConnectModal = ({
  open,
  onToggle
}) => (
  <SlideModal
    contentClassName='integrations-modal'
    type='vertical'
    isVisible={open}
    onClose={onToggle}
  >
    <div className='header'>
      <MainTitle>connect new integrations</MainTitle>
    </div>
    <IntegrationServiceSelect />
    <ConnectIntegration />
  </SlideModal>
);

ConnectModal.propTypes = {

};

export default ConnectModal;
