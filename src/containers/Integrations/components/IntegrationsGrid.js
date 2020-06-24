import React from 'react';
import PropTypes from 'prop-types';

import common from 'components/common';
import clx from 'classnames';

const { FlexBox, MediumCard, Button } = common;

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
      active
    } = service;

    const connectLabel = active ? connected ? 'connected' : 'disconnected' : 'connect';
    const connectAction = connected ? onDisconnect : onConnect;

    const connectBtnClasses = clx({
      'integration-toggle-btn': true,
      'uppercase-text': true,
      'primary-color': connected,
      'danger-btn': !connected && active,
      'gray-btn': !active
    });


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
            onHoverProps={connected ? {
              children: 'Disconnect',
              className: `${connectBtnClasses} danger-btn`
            }
              : {}}
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
