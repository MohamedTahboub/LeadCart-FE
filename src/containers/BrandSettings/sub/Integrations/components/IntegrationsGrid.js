import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

const {
  // MainTitle,
  // WarningMessage,
  // Dialog,
  MediumCard,
  // PayPalConnectContainer
} = common;


const CardHandler = ({ children }) => <div className='card-handler'>{children}</div>;

const IntegrationsGrid = ({ list }) => (
  <div className='flex-container'>
    {list.map((service) => (
      <MediumCard
        key={service.key}
        id={service.key}
        // onClick={onEditService}
        isActive={service.active}
        // error={errors.stripe}
        imgSrc={service.brandLogo}
        headline={<CardHandler>{service.label}</CardHandler>}
      // isLoading={onProgress.stripe}
      />
    ))}
  </div>
);

IntegrationsGrid.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object)
};
IntegrationsGrid.defaultProps = {
  list: []
};

export default IntegrationsGrid;
