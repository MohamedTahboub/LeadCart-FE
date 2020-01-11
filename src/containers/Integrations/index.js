import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import servicesList from './components/servicesList';

import {
  LayoutSwitch,
  IntegrationsGrid,
  IntegrationsTable,
  LayoutOptions,
  ConnectModal
} from './components';


const {
  MainTitle,
  Button,
  InputRow,
  FlexBox,
  Tabs,
  Page,
  PageHeader,
  PageContent
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
    // setActiveLayout(value);
  };


  return (
    <Page>
      <PageHeader className='space-between-elements'>
        <FlexBox center='v-center' flex spaceBetween>
          <MainTitle>Integrations</MainTitle>

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
        </FlexBox>

      </PageHeader>
      <PageContent dflex>
        <ActiveIntegrationLayout
          layout={activeLayout}
          list={integrations}
        />
        <ConnectModal
          open={openModal}
          onToggle={() => setOpenModal(false)}
        />
      </PageContent>

    </Page>
  );
};

Integrations.propTypes = {

};
Integrations.defaultProps = {
  integrations: servicesList
};

export default Integrations;
