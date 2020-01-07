import React from 'react';
import PropTypes from 'prop-types';

import common from 'components/common';
const {
  Card
} = common;

const ServiceCard = ({
  onSelect,
  brandLogo,
  name,
  ...props
}) => {
  const coverImageStyle = {
    backgroundImage: `url(${brandLogo})`,
    backgroundSize: '80% 80%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <Card onClick={onSelect} style={coverImageStyle} className='integration-service-card'>
      <span className='service-name'>{name}</span>
    </Card>
  );
};

ServiceCard.propTypes = {

};

export default ServiceCard;
