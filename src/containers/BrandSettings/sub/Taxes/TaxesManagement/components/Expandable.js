import React from 'react';
import clx from 'classnames';
import Select from 'react-select';

import common from 'components/common';
import RatesPerZone from './RatesPerZone';
import CancelModal from './CancelModal';

const { FlexBox, Button, InputRow } = common;
const { Label, NormalInput, Toggle } = InputRow;

const Expandable = ({ open, onSave, onConfirmCancelEdits, saveLoading, fields, onChange, onCloseCancelModal, cancelModalOpened, onCancelEdits }) => {
  const { zoneDefinition, enabled, name, appliesTo, ratesPerZone } = fields;

  const appliesOptions = [
    { label: 'Subtotal And Shipping', value: 'SubtotalAndShipping' },
    { label: 'Subtotal', value: 'Subtotal' }
  ];

  const zoneDefinitionOptions = [
    { label: 'Billing Details', value: 'BillingDetails' },
    { label: 'Shipping Details', value: 'ShippingDetails' },
    { label: 'IP Address', value: 'IPAddress' }
  ];

  const defaultAppliesOption = appliesOptions.find(({ value }) => value === appliesTo);
  const defaultZoneDefinitionOption = zoneDefinitionOptions.find(({ value }) => value === zoneDefinition);

  return (
    <FlexBox className={clx('expandable px-5 h-center', { open, 'py-3': open })} column spaceBetween>

      <FlexBox className='v-center' spaceBetween>
        <FlexBox className='mr-4 full-height' column spaceBetween >
          <Toggle
            onToggle={() => onChange({ target: { name: 'enabled', value: !enabled } })}
            value={enabled}
            beforeLabel='Enabled'
            afterLabel='Disabled'
            className='mx-5 my-3 '
          />

          <InputRow className='mb-4'>
            <Label>Tax Name:</Label>
            <NormalInput
              onChange={onChange}
              value={name}
              name='name'
            />
          </InputRow>

          <InputRow className='mb-4'>
            <Label>Tax applies to:</Label>
            <Select
              target='appliesTo'
              onChange={({ value }) => onChange({ target: { value, name: 'appliesTo' } })}
              className='expandable-form-select'
              value={defaultAppliesOption}
              options={appliesOptions}
            />
          </InputRow>

          <InputRow className='my-0'>
            <Label>Zone defines by:</Label>
            <Select
              onChange={({ value }) => onChange({ target: { value, name: 'zoneDefinition' } })}
              value={defaultZoneDefinitionOption}
              className='expandable-form-select'
              options={zoneDefinitionOptions}
            />
          </InputRow>
        </FlexBox>

        <RatesPerZone ratesPerZone={ratesPerZone} onChange={onChange} />
      </FlexBox>


      <FlexBox className='mt-5' spaceBetween>
        <Button
          className='px-5 py-2 mr-3 light-btn'
          onClick={onConfirmCancelEdits}
          disabled={saveLoading} onprogress={saveLoading}
        >
          Cancel
        </Button>

        <Button
          className='px-5 py-2 primary-color'
          onClick={onSave}
          disabled={saveLoading} onprogress={saveLoading}
        >
          Save
        </Button>
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
