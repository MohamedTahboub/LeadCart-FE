import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux'
import * as integrationsActions from 'actions/integrations'
import { notification } from 'libs';
import servicesList from 'data/integrationsServices';

import {
  LayoutSwitch,
  IntegrationsGrid,
  IntegrationsTable,
  LayoutOptions,
  ConnectModal,
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
  PageContent,
  Dialog,
  WarningMessage
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


const ActiveIntegrationLayout = ({ layout, ...props }) => {
  const categories = props.list.reduce((cat, service) => {
    if (Array.isArray(cat[service.category])) cat[service.category].push(service);
    else cat[service.category] = [service];
    return cat;
  }, {});

  return Object.keys(categories).map((key, index) => {
    const list = categories[key];
    return (
      <Fragment>
        <MainTitle>{key.toUpperCase()}</MainTitle>
        <LayoutSwitch active={layout}>
          <IntegrationsGrid id='grid' {...props} list={list} />
          <IntegrationsTable id='list' {...props} list={list} showHeader={!index} />
        </LayoutSwitch>
      </Fragment>
    );
  });
};


const Integrations = ({ integrations, ...props }) => {
  const [activeLayout, setActiveLayout] = useState('list');
  const [openModal, setOpenModal] = useState(false);
  const [activeService, setActiveService] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [showConnected, setShowConnected] = useState('all');
  const [disconnectedDialog, setDisconnectDialog] = useState(false);


  const onLayoutChange = (value) => () => {
    setActiveLayout(value);
  };

  const onSearch = ({ target: { value } }) => {
    setSearchKey(value);
  };

  const onChangeConnectFilter = ({ target: { value } }) => {
    // console.log(name, value);

    setShowConnected(value);
  };

  const filteredList = filtersIntegrations(integrations, searchKey, showConnected);

  const onConnect = (service) => {
    setActiveService(service);
    setOpenModal(true);
    // alert(service.name);
  };
  const onConnectClosed = () => {
    setActiveService();
    setOpenModal(false);
  };

  const onShowDisconnectDialog = (service) => {
    setDisconnectDialog(true);
    setActiveService(service);
  };

  const onCloseDisconnectDialog = () => {
    setDisconnectDialog(false);
    setActiveService({});
  };

  const onConfirmDisconnect = (service) => {

    props.disconnectIntegrationService({
      integrationKey: activeService.key
    }, {
      onSuccess: () => {
        notification.success(`You have Connected ${activeService.name} Successfuly`)
        setActiveService({});
        onCloseDisconnectDialog()
      },
      onFailed: (message) => {
        setActiveService({});
        onCloseDisconnectDialog()
        notification.failed(message)
      }
    })
    // setOpenModal(true);
  };

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
        <FlexBox column flex>
          <ActiveIntegrationLayout
            layout={activeLayout}
            list={filteredList}
            onConnect={onConnect}
            onDisconnect={onShowDisconnectDialog}
          />
        </FlexBox>
        {openModal && (
          <ConnectModal
            open={openModal}
            // onToggle={() => setOpenModal(false)}
            onConnectClosed={onConnectClosed}
            onConnect={onConnect}
            onDisconnect={onShowDisconnectDialog}
            service={activeService}
          />
        )}
        {disconnectedDialog && (
          <Dialog
            onClose={onCloseDisconnectDialog}
            show={disconnectedDialog}
            confirmBtnText='Continue'
            confirmBtnIcon={null}
            title={`Disconnect ${activeService.name}?`}
            description={(
              <WarningMessage>
                Your connection Data will be deleted permanently from Leadcart, However you can reconnect it on the future at any time.
              </WarningMessage>
            )}
            onConfirm={onConfirmDisconnect}
          />
        )}
      </PageContent>

    </Page>
  );
};

Integrations.propTypes = {

};
Integrations.defaultProps = {
  integrations: servicesList
};

export default connect(null,integrationsActions)(Integrations);
