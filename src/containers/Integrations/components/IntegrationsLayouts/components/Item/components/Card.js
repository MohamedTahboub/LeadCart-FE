import React from 'react';
import common from 'components/common';
const { MediumCard, Button } = common;

const Card = ({
  active,
  connectBtnClasses,
  connectAction,
  service,
  hoverProps,
  connectMode,
  connectLabel,
  brandLogo
}) => {


  const label = connectMode === 'modal' ? 'Edit' : connectLabel;

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
          {label}
        </Button>
      )}
    />
  );
};

Card.propTypes = {};

export default Card;
