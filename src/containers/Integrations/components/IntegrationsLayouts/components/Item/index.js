import React from 'react';
// import PropTypes from 'prop-types'
import common from 'components/common';
import { openNewWindow } from 'libs';
import clx from 'classnames';

import { Card, Row } from './components';

const { LayoutSwitch } = common;
const navigateAction = ({ linkPath }) => linkPath && openNewWindow(linkPath);


const getCustomActions = (action) => {
  if (action === 'link') return navigateAction;
  return () => null;
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
    connectAction = getCustomActions(customCard.action);
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

export default IntegrationItem;
