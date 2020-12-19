import React from 'react';
import common from 'components/common';
import { BiCog } from 'react-icons/bi';

const { Table, Button, FlexBox } = common;
const { Row, Cell } = Table;

const Card = ({
  connectBtnClasses,
  connectAction,
  service = {},
  name,
  hoverProps,
  connectLabel,
  connectMode,
  description,
  onOpenServiceSettingModal,
  hasSettings,
  brandLogo
}) => {
  const isConnected = service.connected;
  const label = connectMode === 'modal' ? 'Edit' : connectLabel;

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
        flexStart
        className='padding-h-20'
        mainCellClassName='flex'
        mainContent={
          (
            <FlexBox flex center='v-center'>
              <FlexBox flex className='integration-service-description truncate'>
                {description}
              </FlexBox>
              {(hasSettings && isConnected) && (
                <Button className='light-btn' onClick={() => onOpenServiceSettingModal(service)}>
                  <FlexBox center='v-center'>
                    <BiCog color='gray' size={16} />
                    <span className='ml-2'>Settings</span>
                  </FlexBox>
                </Button>
              )}
            </FlexBox>
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
            {label}
          </Button>
        )}
      />
    </Row>
  );
};

Card.propTypes = {};

export default Card;
