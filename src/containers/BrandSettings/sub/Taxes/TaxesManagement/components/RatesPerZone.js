
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Select from 'react-select';
import ToolTip from 'react-tooltip';
import ids from 'shortid';

import common from 'components/common';
import { zones } from 'data/taxes';

const { FlexBox, Title, Button, InputRow } = common;
const { SmallInput } = InputRow;


const RatesPerZone = ({ ratesPerZone = [], onChange }) => {
  const selectedZones = ratesPerZone.map(({ name }) => name);
  const zonesOptions = zones.filter(({ zone }) => !selectedZones.includes(zone)).map(({ zone }) => ({ label: zone, value: zone }));
  const getZoneOption = (value) => ({ label: value, value });
  const hasDefaultZone = ratesPerZone.find(({ name }) => name === 'Americas');

  const defaultZone = {
    name: 'Americas',
    countries: ['US'],
    _id: ids.generate(),
    rate: 0
  };


  const onAddZone = () => onChange({ target: { value: [...ratesPerZone, defaultZone], name: 'ratesPerZone' } });

  const onDeleteZone = (zoneId) => () => {
    const updatedList = ratesPerZone.filter(({ _id }) => _id !== zoneId);
    onChange({ target: { value: updatedList, name: 'ratesPerZone' } });
  };

  const onChangeZone = (zoneId, name, value) => {
    const updatedList = ratesPerZone.map((zone) => {
      if (zone._id === zoneId)
        return ({ ...zone, [name]: value });
      else
        return zone;
    });

    onChange({ target: { value: updatedList, name: 'ratesPerZone' } });
  };


  return (
    <FlexBox column className='rates-per-zone h-center v-center'>
      <FlexBox className='rates-per-zone-header px-1 v-center' spaceBetween >
        <Title className='rates-per-zone-header-title' >Zone</Title>
        <Title className='rates-per-zone-header-title' >Rate, %</Title>
        <Title />
      </FlexBox>

      <FlexBox className='rates-per-zone-body-row px-3 v-center' spaceBetween>
        <Title className='aligned-center-text larger-text' >Other zones</Title>
        <SmallInput
          value={0}
          name='rate'
          type='number'
          className='rates-per-zone-body-input'
          style={{ marginRight: '30px ' }}
        />
      </FlexBox>


      {ratesPerZone.map(({ name, rate, _id }) => (
        <FlexBox className='rates-per-zone-body-row v-center' spaceBetween>
          <Select
            onChange={({ value }) => onChangeZone(_id, 'name', value)}
            value={getZoneOption(name)}
            className='mr-2'
            options={zonesOptions}
          />
          <SmallInput
            onChange={({ target: { value } }) => onChangeZone(_id, 'rate', value)}
            value={rate}
            type='number'
            className='mr-0 rates-per-zone-body-input'
          />
          <RiDeleteBin6Line size={20} className='rates-per-zone-body-row-delete-icon' onClick={onDeleteZone(_id)} />
        </FlexBox>
      ))}

      <FlexBox data-tip="You have a default zone and you can't duplicate it" data-tip-disable={!hasDefaultZone}>
        <Button className='primary-color min-width-200 mt-3 py-2 large-text' onClick={onAddZone} disabled={hasDefaultZone}>Add Zone</Button>
      </FlexBox>

      <ToolTip />
    </FlexBox>
  );
};

export default RatesPerZone;
