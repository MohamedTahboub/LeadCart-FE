import React from 'react';
import { MdDelete } from 'react-icons/md';
import { RiAddCircleFill } from 'react-icons/ri';
import Select from 'react-select';
import ToolTip from 'react-tooltip';
import { connect } from 'react-redux';

import common from 'components/common';
import { zones as defaultZones } from 'data/taxes';

const { FlexBox, Title, InputRow, Button } = common;
const { SmallInput } = InputRow;

const RatesPerZone = ({ ratesPerZone = [], otherZonesRate = 0, taxZones = [], onChange, taxId, onOpenZones }) => {
  const allZones = defaultZones.concat(taxZones);
  const selectedZones = ratesPerZone.map(({ zone }) => zone);
  const notSelectedZones = allZones.filter(({ _id }) => !selectedZones.includes(_id)).map(({ _id }) => _id);
  const zoneOptions = allZones.filter(({ _id }) => !selectedZones.includes(_id)).map(({ name, _id }) => ({ label: name, value: _id }));
  const hasZoneOptions = Boolean(notSelectedZones.length);

  const getZoneOption = (zoneId) => {
    const currentZone = allZones.find(({ _id }) => _id === zoneId) || {};
    return { label: currentZone?.name, value: zoneId };
  };


  const onAddZone = () => {
    const defaultZone = { zone: notSelectedZones[0], rate: 0 };
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
    <FlexBox column className='rates-per-zone' id={`rates-per-zone-${taxId}`}>
      <FlexBox className='mb-2 v-center h-center' spaceBetween>
        <Title>Rates Per Zone:</Title>
      </FlexBox>

      <FlexBox column>
        <FlexBox className='rates-per-zone-header px-1 v-center' spaceBetween >
          <Title className='white-text text-center'>Zone</Title>
          <Title className='white-text text-center'>Rate %</Title>
          <Title />
        </FlexBox>

        <FlexBox className='rates-per-zone-body' column>
          {ratesPerZone.map(({ zone, rate }) => (
            <FlexBox className='rates-per-zone-body-row v-center' key={zone} spaceBetween>
              <Select
                onChange={({ value }) => onChangeZone(zone, 'zone', value)}
                value={getZoneOption(zone)}
                className='mx-2'
                options={zoneOptions}
              />
              <SmallInput
                onChange={({ target: { value } }) => onChangeZone(zone, 'rate', Number(value))}
                value={rate}
                type='number'
                className='mr-0 rates-per-zone-body-input'
                min={0}
                max={100}
              />
              <MdDelete size={20} className='rates-per-zone-body-row-delete-icon' onClick={onDeleteZone(zone)} />
            </FlexBox>
          ))}

          <FlexBox className='rates-per-zone-body-row px-3 v-center' spaceBetween>
            <Title className='aligned-center-text' >Other zones</Title>
            <SmallInput
              value={otherZonesRate}
              name='otherZonesRate'
              type='number'
              className='rates-per-zone-body-input'
              style={{ marginRight: '25px ' }}
              onChange={({ target: { value, name } }) => onChange({ target: { name, value: Number(value) } })}
              min={0}
              max={100}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>


      <FlexBox
        data-tip="you selected all of your zones, You don't have more options"
        data-tip-disable={hasZoneOptions}
        data-place='left'
        className='h-center mt-3 py-1 v-center'
      >
        <Button className='primary-color' onClick={onAddZone} disabled={!hasZoneOptions} style={{ marginLeft: '90px' }}>
          <FlexBox className='v-center px-3 ' spaceBetween>
            <RiAddCircleFill size={16} className='mr-2' />
            Add Zone
          </FlexBox>
        </Button>

        <span className='ml-3 small-text gray-text underlined-text item-clickable' onClick={onOpenZones}>Manage Zones</span>
      </FlexBox>

      <ToolTip />
    </FlexBox>
  );
};

const mapStateToProps = ({ taxZones }) => ({ taxZones });
export default connect(mapStateToProps)(RatesPerZone);
