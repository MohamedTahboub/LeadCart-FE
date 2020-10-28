
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
  const selectedZones = ratesPerZone.map(({ zone }) => zone);
  const zonesOptions = zones.filter(({ _id }) => !selectedZones.includes(_id)).map(({ name, _id }) => ({ label: name, value: _id }));
  const hasDefaultZone = ratesPerZone.find(({ zone }) => zone === '5f9832cf9b9fd77d030af88c');


  const getZoneOption = (zoneId) => {
    const currentZone = zones.find(({ _id }) => _id === zoneId) || {};
    return { label: currentZone?.name, value: zoneId };
  };


  const defaultZone = {
    zone: '5f9832cf9b9fd77d030af88c',
    rate: 0
  };


  const onAddZone = () => onChange({ target: { value: [...ratesPerZone, defaultZone], name: 'ratesPerZone' } });

  const onDeleteZone = (zoneId) => () => {
    const updatedList = ratesPerZone.filter(({ zone }) => zone !== zoneId);
    onChange({ target: { value: updatedList, name: 'ratesPerZone' } });
  };


  const onChangeZone = (zoneId, name, value) => {
    const updatedList = ratesPerZone.map((zone) => {
      if (zone.zone === zoneId)
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


      {ratesPerZone.map(({ zone, rate }) => (
        <FlexBox className='rates-per-zone-body-row v-center' spaceBetween>
          <Select
            onChange={({ value }) => onChangeZone(zone, 'zone', value)}
            value={getZoneOption(zone)}
            className='mr-2'
            options={zonesOptions}
          />
          <SmallInput
            onChange={({ target: { value } }) => onChangeZone(zone, 'rate', value)}
            value={rate}
            type='number'
            className='mr-0 rates-per-zone-body-input'
          />
          <RiDeleteBin6Line size={20} className='rates-per-zone-body-row-delete-icon' onClick={onDeleteZone(zone)} />
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
