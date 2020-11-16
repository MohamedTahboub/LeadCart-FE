import React, { useEffect, useState } from 'react';
import clx from 'classnames';

import common from 'components/common';
import CostsPerZone from './CostsPerZone';
import CancelModal from './CancelModal';

const { FlexBox, InputRow, Title } = common;
const { TextField, Toggle } = InputRow;

const Expandable = ({ open, onSave, saveLoading, fields, onChange, onCloseCancelModal, cancelModalOpened, onCancelEdits, shippingRoleId }) => {
  const [currentHeight, setCurrentHeight] = useState(0);
  const { enabled, name, costsPerZone, otherZonesRate } = fields;

  useEffect(() => {
    const selectedElement = document?.getElementById(`costs-per-zone-${shippingRoleId}`);
    if (open && selectedElement)
      setCurrentHeight(selectedElement?.getBoundingClientRect()?.height);
  }, [open, costsPerZone]);


  const costsPerZoneProps = {
    costsPerZone,
    otherZonesRate,
    onChange,
    enabled,
    shippingRoleId
  };

  return (
    <FlexBox className={clx('expandable px-5 ', { open, 'py-4': open })} style={{ height: open ? `${currentHeight + 50}px` : 0, overflow: open ? 'unset' : 'hidden' }} column id={`expandable-${shippingRoleId}`} >
      <FlexBox className='pr-2 mb-2' flexEnd>
        <Toggle
          onToggle={() => onChange({ target: { name: 'enabled', value: !enabled } })}
          value={enabled}
          beforeLabel='Enabled'
          afterLabel='Disabled'
          className='mx-5 my-0'
        />
      </FlexBox>

      <FlexBox spaceBetween>
        <FlexBox className='mr-4' column spaceBetween style={{ height: '170px', alignSelf: 'flex-start', marginTop: '40px' }}>
          <InputRow className='m-0 flex-box v-center'>
            <Title className='min-width-150'>Tax Name:</Title>
            <TextField
              onChange={onChange}
              value={name}
              name='name'
              inputClassName='min-width-250'
            />
          </InputRow>
        </FlexBox>

        <CostsPerZone {...costsPerZoneProps} />
      </FlexBox>

      <CancelModal
        onSave={onSave}
        onClose={onCloseCancelModal}
        isVisible={cancelModalOpened}
        onCancelEdits={onCancelEdits}
        saveLoading={saveLoading}
      />
    </FlexBox>
  );
};

export default Expandable;
