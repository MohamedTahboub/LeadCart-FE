import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import Select from 'react-select';

import common from 'components/common';
import { CancelModal } from '../components/common';
import ShippingRates from './ShippingRates';
import TextArea from './TextArea';

const { FlexBox, InputRow, Note } = common;
const { TextField, Toggle, TextAreaInput } = InputRow;

const Title = ({ className, children, color = '#83898e' }) => <p style={{ color }} className={clx(`gray-text bold-text m-0 ${className}`)} >{children}</p>;


const Expandable = ({
  open,
  onSave,
  saveLoading,
  fields,
  onChange,
  onCloseCancelModal,
  cancelModalOpened,
  onCancelEdits,
  shippingRuleId,
  setHasInvalidRate,
  hasInvalidRate,
  zoneOptions,
  onOpenZones
}) => {
  const [currentHeight, setCurrentHeight] = useState(0);
  const [hasDisplayedNote, setHasDisplayedNote] = useState(true);
  const { enabled, name, shippingRates, description, shippingZone = 'allZones' } = fields;


  const onZoneChange = ({ value }) => onChange({ target: { value, name: 'shippingZone' } });
  const selectedShippingZone = zoneOptions.find(({ value }) => value === shippingZone);


  useEffect(() => {
    const selectedElement = document?.getElementById(`shipping-rates-${shippingRuleId}`);

    if (open && selectedElement && hasDisplayedNote)
      setCurrentHeight(selectedElement?.getBoundingClientRect()?.height + 170);
    else
      setCurrentHeight(selectedElement?.getBoundingClientRect()?.height);

  }, [open, shippingRates, hasDisplayedNote]);

  const shippingRatesProps = {
    shippingRates,
    onChange,
    setHasInvalidRate,
    shippingRuleId
  };


  return (
    <FlexBox
      className={clx('expandable px-5 ', { open, 'py-4': open })}
      style={{ height: open ? `${currentHeight + 330}px` : 0, overflow: open ? 'unset' : 'hidden' }}
      id={`expandable-${shippingRuleId}`}
      column
    >
      <FlexBox className='pr-2 mb-2' flexEnd>
        <Toggle
          onToggle={() => onChange({ target: { name: 'enabled', value: !enabled } })}
          value={enabled}
          beforeLabel='Enabled'
          afterLabel='Disabled'
          className='mx-5 my-0'
        />
      </FlexBox>

      <InputRow className=' flex-box v-center'>
        <Title className='mr-3'>Shipping Rule Name:</Title>
        <TextField
          onChange={onChange}
          value={name}
          name='name'
          inputClassName='min-width-250'
        />
      </InputRow>


      <FlexBox className='mb-2' column>
        <Title className='mb-1'>Add Description For Customers</Title>
        <Note className='max-width-600 my-3' onCloseNote={() => setHasDisplayedNote(false)} showOnce>
          <Title>
              What should customers know when choosing this shipping method for their order?
          </Title>
          <li>
            Specify the time it usually takes for orders to arrive.
          </li>
          <li>
            The way in which the shipment will be handed over to the buyer.
          </li>
          <li>
            Anything else you feel is important for customers to know about this shipping option.
          </li>

          <FlexBox className='mt-1'>
            <Title className='mr-1'>Note:</Title>This information will be displayed at checkout.
          </FlexBox>
        </Note>

        <TextArea
          onChange={onChange}
          value={description}
          name='description'
          placeholder='Description'
          className='max-width-600'
        />
      </FlexBox>

      <ShippingRates {...shippingRatesProps} />

      <FlexBox className='mt-4 v-center'>
        <Title>Shipping Zone: </Title>
        <Select className='mx-3 min-width-250' options={zoneOptions} value={selectedShippingZone} onChange={onZoneChange} />
        <span className='small-text gray-text underlined-text item-clickable' onClick={onOpenZones}>Manage Zones</span>
      </FlexBox>

      <CancelModal
        onSave={onSave}
        onClose={onCloseCancelModal}
        isVisible={cancelModalOpened}
        onCancelEdits={onCancelEdits}
        saveLoading={saveLoading}
        hasInvalidRate={hasInvalidRate}
      />
    </FlexBox>
  );
};

export default Expandable;
