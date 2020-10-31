import React from 'react';
import { MdDelete } from 'react-icons/md';
import { RiAddCircleFill } from 'react-icons/ri';
import Select from 'react-select';
import ToolTip from 'react-tooltip';

import common from 'components/common';
import { zones } from 'data/taxes';

const { FlexBox, Title, InputRow, SmallButton } = common;
const { SmallInput, Label, Toggle } = InputRow;


const RatesPerZone = ({ ratesPerZone = [], onChange, enabled }) => {
  const selectedZones = ratesPerZone.map(({ zone }) => zone);
  const zonesOptions = zones.filter(({ _id }) => !selectedZones.includes(_id)).map(({ name, _id }) => ({ label: name, value: _id }));
  const hasDefaultZone = ratesPerZone.find(({ zone }) => zone === '5f9832cf9b9fd77d030af88c');


  const getZoneOption = (zoneId) => {
    const currentZone = zones.find(({ _id }) => _id === zoneId) || {};
    return { label: currentZone?.name, value: zoneId };
  };


  const onAddZone = () => {
    const defaultZone = { zone: '5f9832cf9b9fd77d030af88c', rate: 0 };
    onChange({ target: { value: [...ratesPerZone, defaultZone], name: 'ratesPerZone' } });
  };


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
    <FlexBox column className='rates-per-zone h-center'>
      <FlexBox className='pr-2 mb-2' flexEnd>
        <Toggle
          onToggle={() => onChange({ target: { name: 'enabled', value: !enabled } })}
          value={enabled}
          beforeLabel='Enabled'
          afterLabel='Disabled'
          className='mx-5 my-3 '
        />
      </FlexBox>


      <FlexBox className='full-width  mb-3 pl-2 v-center' spaceBetween>
        <Label>Rates Per Zone:</Label>
        <FlexBox data-tip="You have a default zone and you can't duplicate it" data-tip-disable={!hasDefaultZone} data-place='left'>
          <SmallButton className='primary-color ml-2 min-width-150  py-1 px-3' onClick={onAddZone} disabled={hasDefaultZone}>
            <FlexBox className='v-center' spaceBetween>
              <RiAddCircleFill size={16} className='mr-2'/>
              <Title className='white-text' >Add Zone</Title>
            </FlexBox>
          </SmallButton>
        </FlexBox>
      </FlexBox>

      <FlexBox className='rates-per-zone-container' column>
        <FlexBox className='rates-per-zone-header px-1 v-center' spaceBetween >
          <Title className='rates-per-zone-header-title'>Zone</Title>
          <Title className='rates-per-zone-header-title'>Rate %</Title>
          <Title />
        </FlexBox>

        <FlexBox className='rates-per-zone-body' column>
          {ratesPerZone.reverse().map(({ zone, rate }) => (
            <FlexBox className='rates-per-zone-body-row v-center' spaceBetween>
              <Select
                onChange={({ value }) => onChangeZone(zone, 'zone', value)}
                value={getZoneOption(zone)}
                className='mx-2'
                options={zonesOptions}
              />
              <SmallInput
                onChange={({ target: { value } }) => onChangeZone(zone, 'rate', value)}
                value={rate}
                type='number'
                className='mr-0 rates-per-zone-body-input'
              />
              <MdDelete size={20} className='rates-per-zone-body-row-delete-icon' onClick={onDeleteZone(zone)} />
            </FlexBox>
          ))}

          <FlexBox className='rates-per-zone-body-row px-3 v-center' spaceBetween>
            <Title className='aligned-center-text' >Other zones</Title>
            <SmallInput
              value={0}
              name='rate'
              type='number'
              className='rates-per-zone-body-input'
              style={{ marginRight: '30px ' }}
            />
          </FlexBox>
        </FlexBox>

      </FlexBox>


      <ToolTip />
    </FlexBox>
  );
};

export default RatesPerZone;
