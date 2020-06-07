import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';

const {
  FlexBox,
  MediumCard,
  Button,

  // PayPalConnectContainer
} = common;

const defaultDescription = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste accusamus maiores quam reiciendis!';

// const CardHandler = ({ children }) => <div className='card-handler'>{children}</div>;

const IntegrationsGrid = ({
  onDisconnect,
  onConnect,
  list
}) => (
  <FlexBox wrappable baseline>
    {list.map((service) => {
      const {
        key,
        name = 'Untitled',
        // label = name,
        connected,
        brandLogo,
        active,
        description = defaultDescription
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
          // onClick={onEditService}
          isActive={active}
          // error={errors.stripe}
          imgSrc={brandLogo}
          headline={(
            <Button
              fallback-data='Disconnect'
              // type={active ? 'primary' : 'secondary'}
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
          // isLoading={onProgress.stripe}
        />
      );
    })}
  </FlexBox>
);

IntegrationsGrid.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
};
IntegrationsGrid.defaultProps = {
  list: []
};

export default IntegrationsGrid;
