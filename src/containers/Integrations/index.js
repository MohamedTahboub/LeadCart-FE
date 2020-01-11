import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import servicesList from 'data/integrationsServices';

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
  // Select,
  PageContent
} = common;

const { TextField, SelectOption } = InputRow;

const filtersIntegrations = (list, key, connected) => list.filter((integration) => {
  if (connected === 'all') return true;
  if (connected === 'connected') return integration.connected;
  if (connected === 'disconnected') return !integration.connected;
})
  .filter((int) => {
    const values = [int.name, int.category];
    if (!key) return true;
    const hasMatched = values.find((v) => v.toLowerCase().includes(key));
    return hasMatched;
  });


const ActiveIntegrationLayout = ({ layout, ...props }) => (
  <LayoutSwitch active={layout}>
    <IntegrationsGrid id='grid' {...props} />
    <IntegrationsTable id='list' {...props} />
  </LayoutSwitch>
);


const Integrations = ({ integrations, ...props }) => {
  const [activeLayout, setActiveLayout] = useState('list');
  const [openModal, setOpenModal] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [showConnected, setShowConnected] = useState('all');


  const onLayoutChange = (value) => () => {
    setActiveLayout(value);
  };

  const onSearch = ({ target: { value } }) => {
    setSearchKey(value);
  };

  const onChangeConnectFilter = ({ target: { name, value } }) => {
    console.log(name, value);
    setShowConnected(value);
  };

  const filteredList = filtersIntegrations(integrations, searchKey, showConnected);

  return (
    <Page>
      <PageHeader className='space-between-elements'>
        <FlexBox center='v-center' flex>
          <MainTitle>Integrations</MainTitle>
          <TextField
            name='search'
            placeholder='Search'
            className='margin-h-10'
            onChange={onSearch}
          />
          <SelectOption
            value={showConnected}
            className='margin-h-10'
            onChange={onChangeConnectFilter}
            options={[
              { value: 'all', label: 'all' },
              { value: 'disconnected', label: 'Disconnected' },
              { value: 'connected', label: 'Connected' },
            ]}
          />
          <LayoutOptions
            onChange={onLayoutChange}
            active={activeLayout}
            className='margin-h-10'
          />
          {/*
        <FlexBox flex flexEnd>
        <Button
        // onClick={() => setOpenModal(true)}
        className='primary-color'
        >
        New Integration
        </Button>
        </FlexBox>
      */}
        </FlexBox>

      </PageHeader>
      <PageContent dflex>
        <ActiveIntegrationLayout
          layout={activeLayout}
          list={filteredList}
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
