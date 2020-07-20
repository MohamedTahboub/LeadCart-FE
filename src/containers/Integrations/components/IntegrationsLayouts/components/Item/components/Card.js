import React from 'react';
import common from 'components/common';
const { MediumCard, Button } = common;

const Card = ({
  active,
  connectBtnClasses,
  connectAction,
  service,
  hoverProps,
  connectLabel,
  brandLogo
}) => {
  return (
    <MediumCard
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
};

Card.propTypes = {};

export default Card;
