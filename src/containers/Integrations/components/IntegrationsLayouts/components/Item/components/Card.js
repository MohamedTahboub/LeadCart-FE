import React from 'react';
import common from 'components/common';
import { BiCog } from 'react-icons/bi';
import Tooltip from 'components/common/Tooltip';
const { MediumCard, Button, FlexBox } = common;

const Card = ({
  active,
  connectBtnClasses,
  connectAction,
  service = {},
  hoverProps,
  connectMode,
  hasSettings,
  connectLabel,
  onOpenServiceSettingModal,
  brandLogo
}) => {

  const isConnected = service.connected;
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
    >
      {(hasSettings && isConnected) && (
        <FlexBox flex flexEnd className='mt-3 '>
          <Tooltip text='Advance Settings' placement='top'>
            <BiCog color='gray' size={20} onClick={() => onOpenServiceSettingModal(service)}/>
          </Tooltip>
        </FlexBox>
      )}
    </MediumCard>
  );
};

Card.propTypes = {};

export default Card;
