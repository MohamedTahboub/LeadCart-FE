import React from 'react';
// import PropTypes from 'prop-types'
import common from 'components/common';
import { openNewWindow } from 'libs';
import clx from 'classnames';
import { notification } from 'libs';
import * as integrationsActions from 'actions/integrations';
import { connect } from 'react-redux';
import { Card, Row } from './components';
import { offlinePaymentLogo } from 'data/importBrands';

const defaultOfflinePayment = {
  name: 'Offline Payment Method',
  notes: 'Notes for your customers',
  logo: offlinePaymentLogo
};
const { LayoutSwitch } = common;
const navigateAction = ({ customCard = {} }) => openNewWindow(customCard.linkPath);


const getCustomActions = (action, onConnect) => {

  if (action === 'link') return navigateAction;
  return onConnect;
};

const IntegrationItem = ({
  cardType,
  connected,
  brandLogo,
  active,
  onDisconnect,
  onConnect,
  id: itemId,
  customCard = {},
  ...restProps
}) => {


  let connectLabel = connected ? 'connected' : 'connect';
  let connectAction = connected ? onDisconnect : onConnect;
  let hasHover = true;
  if (customCard.enabled) {
    connectLabel = customCard.actionLabel;
    connectAction = getCustomActions(customCard.action, onConnect);
    hasHover = customCard.hasHover;
  }
  const connectBtnClasses = clx({
    'integration-toggle-btn': true,
    'uppercase-text': true,
    'primary-color': connected,
    'gray-btn': !connected
  });

  const hoverProps = (hasHover && connected) ?
    {
      children: 'Disconnect',
      className: `${connectBtnClasses} danger-btn`
    } : {};


  const props = {
    active,
    connectBtnClasses,
    hoverProps,
    connectLabel,
    connectAction,
    brandLogo,
    customCard,
    itemId,
    service: {
      id: itemId,
      ...restProps
    },
    ...restProps
  };

  return (
    <LayoutSwitch active={cardType}>
      <Row {...props} id='row' />
      <Card {...props} id='card' />
    </LayoutSwitch>
  );
};

IntegrationItem.propTypes = {};

export default connect(null, integrationsActions)(IntegrationItem);
