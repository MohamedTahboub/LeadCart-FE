import React from 'react';
import clx from 'classnames';
import Select from 'react-select';

import common from 'components/common';
import RatesPerZone from './RatesPerZone';
import { CancelModal } from '../components';

const { FlexBox, Button, InputRow } = common;
const { Label, NormalInput } = InputRow;

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

  const ratesPerZoneProps = {
    ratesPerZone,
    onChange,
    enabled
  };

  return (
    <FlexBox className={clx('expandable px-5 h-center', { open, 'py-3': open })} column spaceBetween>
      <FlexBox className='v-center' spaceBetween>
        <FlexBox className='mr-4' column spaceBetween style={{ height: '236px', alignSelf: 'flex-end' }}>
          <InputRow className='my-2 flex-box v-center'>
            <Label>Tax Name:</Label>
            <NormalInput
              onChange={onChange}
              value={name}
              name='name'
            />
          </InputRow>

          <InputRow className='mt-2 mb-0 flex-box v-center'>
            <Label>Zone defines by:</Label>
            <Select
              onChange={({ value }) => onChange({ target: { value, name: 'zoneDefinition' } })}
              value={defaultZoneDefinitionOption}
              className='expandable-form-select'
              options={zoneDefinitionOptions}
            />
          </InputRow>

          <InputRow className='my-2 flex-box v-center'>
            <Label>Tax applies to:</Label>
            <Select
              target='appliesTo'
              onChange={({ value }) => onChange({ target: { value, name: 'appliesTo' } })}
              className='expandable-form-select'
              value={defaultAppliesOption}
              options={appliesOptions}
            />
          </InputRow>
        </FlexBox>

        <RatesPerZone {...ratesPerZoneProps} />
      </FlexBox>


      <FlexBox className='mt-5' spaceBetween>
        <Button
          className='px-5 py-2 mr-3 light-btn'
          onClick={onConfirmCancelEdits}
          disabled={saveLoading}
        >
          Cancel
        </Button>

        <Button
          className='px-5 py-2 primary-color'
          onClick={onSave}
          disabled={saveLoading}
          onprogress={saveLoading}
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
