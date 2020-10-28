import React, { useState } from 'react';
import clx from 'classnames';
import Select from 'react-select';

import common from 'components/common';
import RatesPerZone from './RatesPerZone';

const { FlexBox, Button, InputRow } = common;
const { Label, NormalInput, Toggle } = InputRow;

const Expandable = ({ open, name, appliesTo, zoneDefinition, ratesPerZone, enabled, onSave, onCancelEdits }) => {
  const [fields, setFields] = useState({ appliesTo, zoneDefinition, name, enabled, ratesPerZone });

  const onChange = ({ target: { value, name } }) => setFields({ ...fields, [name]: value });

  const appliesOptions = [
    { label: 'Subtotal And Shipping', value: 'SubtotalAndShipping' },
    { label: 'Subtotal', value: 'Subtotal' }
  ];

  const zoneDefinitionOptions = [
    { label: 'IP Address', value: 'IPAddress' },
    { label: 'Shipping Address', value: 'ShippingAddress' }
  ];

  const defaultAppliesOption = appliesOptions.find(({ value }) => value === fields.appliesTo);
  const defaultZoneDefinitionOption = zoneDefinitionOptions.find(({ value }) => value === fields.zoneDefinition);

  return (
    <FlexBox className={clx('expandable px-3', { open, 'pt-2 pb-5': open })} column>
      <FlexBox flexEnd>
        <Toggle
          onToggle={() => onChange({ target: { name: 'enabled', value: !fields.enabled } })}
          value={fields.enabled}
          beforeLabel='Enabled'
          afterLabel='Disabled'
          className='mx-5'
        />
      </FlexBox>

      <InputRow>
        <Label>Tax Name:</Label>
        <NormalInput
          onChange={onChange}
          value={name}
          name='name'
        />
      </InputRow>

      <InputRow>
        <Label>Tax applies to:</Label>
        <Select
          target='appliesTo'
          onChange={({ value }) => onChange({ target: { value, name: 'appliesTo' } })}
          className='expandable-form-select'
          value={defaultAppliesOption}
          options={appliesOptions}
        />
      </InputRow>

      <InputRow>
        <Label>Zone defines by:</Label>
        <Select
          onChange={({ value }) => onChange({ target: { value, name: 'zoneDefinition' } })}
          value={defaultZoneDefinitionOption}
          className='expandable-form-select'
          options={zoneDefinitionOptions}
        />
      </InputRow>

      <InputRow>
        <Label>Rates Per Zone:</Label>
        <RatesPerZone ratesPerZone={fields.ratesPerZone} onChange={onChange} />
      </InputRow>


      <FlexBox flexEnd>
        <Button className='px-4 py-1 mr-3 light-btn' onClick={onCancelEdits} >Cancel</Button>
        <Button className='px-4 py-1 primary-color' onClick={onSave} >Save</Button>
      </FlexBox>
    </FlexBox>
  );
};

export default Expandable;
