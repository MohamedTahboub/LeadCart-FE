import React from 'react';
import common from 'components/common';
const { Table, Button } = common;
const { Row, Cell } = Table;

const Card = ({
  connectBtnClasses,
  connectAction,
  service,
  name,
  hoverProps,
  connectLabel,
  description,
  brandLogo
}) => {
  return (
    <Row className='integration-table-row'>
      <Cell
        flex={false}
        data-tip={name}
        data-type='light'
        data-delay-show={300}
        mainContent={(
          <img src={brandLogo} className='integrations-service-brand' alt={`${name} brand`} />
        )}
      />

      <Cell
        flex
        flexStart
        className='padding-h-20'
        mainContent={
          (
            <span className='integration-service-description truncate'>
              {description}
            </span>
          )
        }
      />

      <Cell
        flex={false}
        mainContent={(
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
    </Row>
  );
};

Card.propTypes = {};

export default Card;
