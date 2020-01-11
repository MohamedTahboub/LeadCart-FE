import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

const {
  FlexBox,
  MediumCard,
  Badge
  // PayPalConnectContainer
} = common;


const CardHandler = ({ children }) => <div className='card-handler'>{children}</div>;

const IntegrationsGrid = ({ list }) => (
  <FlexBox wrappable baseline>
    {list.map((service) => (
      <MediumCard
        key={service.key}
        id={service.key}
        // onClick={onEditService}
        isActive={service.active}
        // error={errors.stripe}
        imgSrc={service.brandLogo}
        headline={(
          <Badge type={service.connected ? 'primary' : 'secondary'} className='uppercase-text'>
            {service.active ? (
              service.connected ? 'Connected' : 'Disconnected'
            ) : 'connect'}
          </Badge>
        )}
      // isLoading={onProgress.stripe}
      />
    ))}
  </FlexBox>
);

IntegrationsGrid.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
};
IntegrationsGrid.defaultProps = {
  list: []
};

export default IntegrationsGrid;
