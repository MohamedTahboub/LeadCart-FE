import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'querystring';

import common from 'components/common';
import * as integrationsActions from 'actions/integrations';
import { includesIgnoreCase, notification } from 'libs';
import servicesList from 'data/integrationsServices';
import { offlinePaymentLogo } from 'data/importBrands';

import {
  ConnectModal,
  ConnectingModal,
  IntegrationEditModal,
  IntegrationsLayouts,
  LayoutOptions
} from './components';


const {
  MainTitle,
  InputRow,
  FlexBox,
  Page,
  PageHeader,
  Currency,
  PageContent,
  Dialog,
  WarningMessage
} = common;

const defaultOfflinePayment = {
  name: 'Offline Payment Method',
  notes: 'Notes for your customers',
  logo: offlinePaymentLogo
};

const { TextField } = InputRow;

const filtersIntegrations = (list, key, connected = 'all') => list.filter((integration) => {
  if (connected === 'all') return true;
  if (connected === 'connected') return integration.connected;
  if (connected === 'disconnected') return !integration.connected;
  return true;
})
  .filter((int) => {
    const values = [int.name, int.category];
    if (!key) return true;
    const hasMatched = values.find((v) => includesIgnoreCase(v, key));
    return hasMatched;
  });

const checkConnecting = (searchUrl = '') => {
  const details = queryString.parse(searchUrl.replace('?', ''));
  return details;
};


const Integrations = ({ integrations, history, offlinePaymentsCount, ...props }) => {


  const [activeLayout, setActiveLayout] = useState('list');
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [activeService, setActiveService] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [disconnectedDialog, setDisconnectDialog] = useState(false);
  const [connectStatus, setConnectStatus] = useState();

  const onLayoutChange = (value) => () => {
    setActiveLayout(value);
  };

  const onSearch = ({ target: { value } }) => {
    setSearchKey(value);
  };


  const filteredList = filtersIntegrations(integrations, searchKey);


  const onConnect = (service) => {
    setActiveService(service);

    if (service && service.connectMode)
      setOpenEditModal(service.key);
    else if (service.action === 'create_offline_payment')
      setOpenEditModal(service.key);
    else
      setOpenModal(true);

  };

  const onConnectClosed = () => {
    setActiveService();
    setOpenModal(false);
    setOpenEditModal(false);
  };

  const onShowDisconnectDialog = (service) => {
    setDisconnectDialog(true);
    setActiveService(service);
  };

  const onCloseDisconnectDialog = () => {
    setDisconnectDialog(false);
    setActiveService({});
  };

  const onConfirmDisconnect = () => {
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
        <FlexBox center='v-center'>
          <MainTitle className='larger-text'>Integrations</MainTitle>
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
      </PageHeader>
      <PageContent dflex>
        <FlexBox column flex>
          <FlexBox column flex>
            <IntegrationsLayouts
              layout={activeLayout}
              list={filteredList}
              onConnect={onConnect}
              onDisconnect={onShowDisconnectDialog}
              offlinePaymentsCount={offlinePaymentsCount}
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
        )}
        {openEditModal && (
          <IntegrationEditModal
            open={openEditModal}
            onToggle={() => setOpenEditModal(false)}
            onConnectClosed={onConnectClosed}
            onConnect={onConnect}
            // onDisconnect={onShowDisconnectDialog}
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

Integrations.propTypes = {};
Integrations.defaultProps = { integrations: [] };
const mapStateToProps = ({ integrations = [] }) => {
  const offlinePaymentsCount = integrations.filter((integration) => integration.key === 'lc_offlinepayment').length;

  const integrationsServices = servicesList.map((service) => {
    const integrationExist = integrations.find((integration) => {
      const integrationKey = integration.key || integration.integrationKey;

      return integration && (
        integrationKey === service.key &&
        integrationKey !== 'lc_offlinepayment'
      );
    });

    if (integrationExist) {
      return {
        ...service,
        ...integrationExist,
        active: true
      };
    }
    return service;
  });

  return { integrations: integrationsServices, offlinePaymentsCount };
};
export default connect(mapStateToProps, integrationsActions)(Integrations);
