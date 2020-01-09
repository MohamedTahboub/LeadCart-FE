import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames'

import common from 'components/common';
const {
  Card
} = common;

const ServiceCard = ({
  onSelect,
  brandLogo,
  name,
  disabled,
  className,
  ...props
}) => {
  const coverImageStyle = {
    backgroundImage: `url(${brandLogo})`,
    backgroundSize: '80% 80%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const classes = clx({
    [className]: className,
    disabled
  })

  return (
    <Card
      onClick={onSelect}
      style={coverImageStyle}
      className={`integration-service-card ${classes}`}
    >
      <span className='service-name'>{name}</span>
    </Card>
  );
};

ServiceCard.propTypes = {

};

export default ServiceCard;
