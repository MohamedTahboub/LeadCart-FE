import React from 'react';
import PropTypes from 'prop-types';

import common from 'components/common';
import clx from 'classnames';
import { openNewWindow } from 'libs';

const { FlexBox, MediumCard, Button } = common;

const navigateAction = ({ customCard: { linkPath } = {} }) => linkPath && openNewWindow(linkPath);


const getCustomActions = (action) => {
  if (action === 'link') return navigateAction;
  return () => null;
};

const IntegrationsGrid = ({
  onDisconnect,
  onConnect,
  list
}) => (<FlexBox wrappable baseline>
  {list.map((service) => {
    const {
      key,
      connected,
      brandLogo,
      active,
      customCard = {}
    } = service;

    let connectLabel = active ? connected ? 'connected' : 'disconnected' : 'connect';
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

    return (
      <MediumCard
        key={key}
        id={key}
        isActive={active}
        imgSrc={brandLogo}
        headline={(
          <Button
            fallback-data='Disconnect'
            className={connectBtnClasses}
            onClick={() => connectAction(service)}
            onHoverProps={hoverProps}
          >
            {connectLabel}
          </Button>
        )}
      />
    );
  })}
</FlexBox>);

IntegrationsGrid.propTypes = { list: PropTypes.arrayOf(PropTypes.object) };
IntegrationsGrid.defaultProps = { list: [] };

export default IntegrationsGrid;
