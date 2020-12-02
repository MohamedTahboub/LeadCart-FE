import React from 'react';

import clx from 'classnames';
import common from 'components/common';

const { Card } = common;

const ServiceCard = ({
  brandLogo,
  name,
  disabled,
  onClick,
  className,
  ...props
}) => {
  const coverImageStyle = {
    backgroundImage: `url(${brandLogo})`,
    backgroundSize: '90% auto',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const classes = clx({
    [className]: className,
    disabled
  });

  return (
    <Card
      onClick={onClick}
      style={coverImageStyle}
      className={`integration-service-card ${classes}`}
    >
      <span className='service-name'>{name}</span>
    </Card>
  );
};

export default ServiceCard;
