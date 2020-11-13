import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import Select from 'react-select';

import common from 'components/common';
import RatesPerZone from './RatesPerZone';
import { CancelModal } from '../components';

const { FlexBox, InputRow, Title } = common;
const { TextField, Toggle } = InputRow;

const Expandable = ({ open, onSave, saveLoading, fields, onChange, onCloseCancelModal, cancelModalOpened, onCancelEdits, taxId }) => {
  const [currentHeight, setCurrentHeight] = useState(0);

  const { zoneDefinition, enabled, name, appliesTo, ratesPerZone } = fields;

  useEffect(() => {
    const selectedElement = document?.getElementById(`rates-per-zone-${taxId}`);
    if (open && selectedElement)
      setCurrentHeight(selectedElement?.getBoundingClientRect()?.height);
  });


  const appliesOptions = [
    { label: 'Subtotal And Shipping', value: 'SubtotalAndShipping' },
    { label: 'Subtotal', value: 'Subtotal' }
  ];

  const zoneDefinitionOptions = [
  // { label: 'Billing Details', value: 'BillingDetails' },
    { label: 'Shipping Details', value: 'ShippingDetails' },
    { label: 'IP Address', value: 'IPAddress' }
  ];

  const defaultAppliesOption = appliesOptions.find(({ value }) => value === appliesTo);
  const defaultZoneDefinitionOption = zoneDefinitionOptions.find(({ value }) => value === zoneDefinition);

  const ratesPerZoneProps = {
    ratesPerZone,
    onChange,
    enabled,
    taxId
  };

  return (
    <FlexBox className={clx('expandable px-5 ', { open, 'py-4': open })} style={{ height: open ? `${currentHeight + 50}px` : 0, overflow: open ? 'unset' : 'hidden' }} column id={`expandable-${taxId}`} >
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

          <InputRow className='my-2 flex-box v-center'>
            <Title className='min-width-150'>Zone defines by:</Title>
            <Select
              onChange={({ value }) => onChange({ target: { value, name: 'zoneDefinition' } })}
              value={defaultZoneDefinitionOption}
              className='flex-item min-width-250'
              options={zoneDefinitionOptions}
            />
          </InputRow>

          <InputRow className='my-0 flex-box v-center'>
            <Title className='min-width-150'>Tax applies to:</Title>
            <Select
              target='appliesTo'
              onChange={({ value }) => onChange({ target: { value, name: 'appliesTo' } })}
              className='flex-item min-width-250'
              value={defaultAppliesOption}
              options={appliesOptions}
            />
          </InputRow>
        </FlexBox>

        <RatesPerZone {...ratesPerZoneProps} />
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
