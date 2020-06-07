import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import * as integrationsActions from 'actions/integrations';
import { includesIgnoreCase, notification } from 'libs';
import servicesList from 'data/integrationsServices';
import queryString from 'querystring';

import {
  ConnectModal,
  ConnectingModal,
  IntegrationsGrid,
  IntegrationsTable,
  LayoutOptions,
  LayoutSwitch
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
  Currency,
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
    const hasMatched = values.find((v) => includesIgnoreCase(v, key));
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
        <MainTitle className='integration-category-title capitalized-text'>{key}</MainTitle>
        <LayoutSwitch active={layout}>
          <IntegrationsGrid id='grid' {...props} list={list} />
          <IntegrationsTable id='list' {...props} list={list} showHeader={!index} />
        </LayoutSwitch>
      </Fragment>
    );
  });
};


const checkConnecting = (searchUrl = '') => {
  const details = queryString.parse(searchUrl.replace('?', ''));
  return details;
};


const Integrations = ({ integrations, history, ...props }) => {
  const [activeLayout, setActiveLayout] = useState('list');
  const [openModal, setOpenModal] = useState(false);
  const [activeService, setActiveService] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [showConnected, setShowConnected] = useState('all');
  const [disconnectedDialog, setDisconnectDialog] = useState(false);
  const [connectStatus, setConnectStatus] = useState();

  const onLayoutChange = (value) => () => {
    setActiveLayout(value);
  };

  const onSearch = ({ target: { value } }) => {
    setSearchKey(value);
  };

  const onChangeConnectFilter = ({ target: { value } }) => {

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
      integrationId: activeService._id,
      remove: true
    }, {
      onSuccess: () => {
        notification.success(`You have Connected ${activeService.name} Successfully`);
        setActiveService({});
        onCloseDisconnectDialog();
      },
      onFailed: (message) => {
        setActiveService({});
        onCloseDisconnectDialog();
        notification.failed(message);
      }
    });
    // setOpenModal(true);
  };

  const onConnectOnProgress = (details) => {
    setConnectStatus(details);
  };
  const onConnectingStop = () => {
    setConnectStatus();
  };
  useEffect(() => {
    const isConnecting = checkConnecting(history.location.search);

    if (isConnecting) onConnectOnProgress(isConnecting);
  }, [history.location.search]);

  return (
    <Page>
      <PageHeader className='space-between-elements'>
        <MainTitle>Integrations</MainTitle>
      </PageHeader>
      <PageContent dflex>
        <FlexBox column flex>
          <FlexBox flexStart>
            <TextField
              name='search'
              prefix={<Currency value={<i className='fas fa-search' />} />}
              className='margin-h-10 integrations-search-input'
              onChange={onSearch}
              placeholder='Search Service/Categories'
              autoComplete='off'
              value={searchKey}
            />
            <LayoutOptions
              onChange={onLayoutChange}
              active={activeLayout}
              className='margin-h-10'
            />
          </FlexBox>
          <FlexBox column flex>
            <ActiveIntegrationLayout
              layout={activeLayout}
              list={filteredList}
              onConnect={onConnect}
              onDisconnect={onShowDisconnectDialog}
            />
          </FlexBox>
        </FlexBox>
        {openModal && (
          <ConnectModal
            open={openModal}
            onToggle={() => setOpenModal(false)}
            onConnectClosed={onConnectClosed}
            onConnect={onConnect}
            onDisconnect={onShowDisconnectDialog}
            service={activeService}
          />
        )}
        {(connectStatus && connectStatus.activation) && (
          <ConnectingModal
            open={connectStatus}
            data={connectStatus}
            onClose={onConnectingStop}
            history={history}
          />
        )
        }
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

Integrations.propTypes = {};
Integrations.defaultProps = { integrations: [] };
const mapStateToProps = ({ integrations = [] }) => {
  const integrationsServices = servicesList.map((service) => {
    const integrationExist = integrations.find((integration) => integration && (
      integration.key === service.key
      || integration.integrationKey === service.key
    ));
    if (integrationExist) {
      return {
        ...service,
        ...integrationExist,
        active: true
      };
    }
    return service;
  });

  return { integrations: integrationsServices };
};
export default connect(mapStateToProps, integrationsActions)(Integrations);
