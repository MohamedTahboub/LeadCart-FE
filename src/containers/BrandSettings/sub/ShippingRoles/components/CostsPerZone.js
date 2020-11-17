import React from 'react';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { RiAddCircleFill } from 'react-icons/ri';
import Select from 'react-select';
import ToolTip from 'react-tooltip';

import common from 'components/common';
import { zones as defaultZones } from 'data/taxes';

const { FlexBox, Title, InputRow, Button } = common;
const { SmallInput } = InputRow;

const CostsPerZone = ({ costsPerZone = [], otherZonesCost = 0, taxZones = [], onChange, shippingRoleId }) => {
  const allZones = defaultZones.concat(taxZones);
  const selectedZones = costsPerZone.map(({ zone }) => zone);
  const notSelectedZones = allZones.filter(({ _id }) => !selectedZones.includes(_id)).map(({ _id }) => _id);
  const zoneOptions = allZones.filter(({ _id }) => !selectedZones.includes(_id)).map(({ name, _id }) => ({ label: name, value: _id }));
  const hasZoneOptions = Boolean(notSelectedZones.length);

  const getZoneOption = (zoneId) => {
    const currentZone = allZones.find(({ _id }) => _id === zoneId) || {};
    return { label: currentZone?.name, value: zoneId };
  };

  const onAddZone = () => {
    const defaultZone = { zone: notSelectedZones[0], cost: 0 };
    onChange({ target: { value: [...costsPerZone, defaultZone], name: 'costsPerZone' } });
  };

  const onDeleteZone = (zoneId) => () => {
    const updatedList = costsPerZone.filter(({ zone }) => zone !== zoneId);
    onChange({ target: { value: updatedList, name: 'costsPerZone' } });
  };


  const onChangeZone = (zoneId, name, value) => {
    const updatedList = costsPerZone.map((zone) => {
      if (zone.zone === zoneId)
        return ({ ...zone, [name]: value });
      else
        return zone;
    });

    onChange({ target: { value: updatedList, name: 'costsPerZone' } });
  };


  return (
    <FlexBox column className='costs-per-zone' id={`costs-per-zone-${shippingRoleId}`}>
      <FlexBox className='mb-2 v-center h-center' spaceBetween>
        <Title>Costs Per Zone:</Title>
      </FlexBox>

      <FlexBox column>
        <FlexBox className='costs-per-zone-header px-1 v-center' spaceBetween >
          <Title className='white-text text-center'>Zone</Title>
          <Title className='white-text text-center mr-4'>Cost</Title>
          <Title />
        </FlexBox>

        <FlexBox className='costs-per-zone-body' column>
          {costsPerZone.map(({ zone, cost }) => (
            <FlexBox className='costs-per-zone-body-row v-center' key={zone} spaceBetween>
              <Select
                onChange={({ value }) => onChangeZone(zone, 'zone', value)}
                value={getZoneOption(zone)}
                className='mx-2'
                options={zoneOptions}
              />
              <SmallInput
                onChange={({ target: { value } }) => onChangeZone(zone, 'cost', Number(value))}
                value={cost}
                type='number'
                className='mr-0 costs-per-zone-body-input'
                min={0}
              />
              <MdDelete size={20} className='costs-per-zone-body-row-delete-icon' onClick={onDeleteZone(zone)} />
            </FlexBox>
          ))}

          <FlexBox className='costs-per-zone-body-row px-3 v-center' spaceBetween>
            <Title className='aligned-center-text' >Other zones</Title>
            <SmallInput
              value={otherZonesCost}
              name='otherZonesCost'
              type='number'
              className='costs-per-zone-body-input'
              style={{ marginRight: '25px ' }}
              onChange={({ target: { value, name } }) => onChange({ target: { name, value: Number(value) } })}
              min={0}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>


      <FlexBox
        data-tip="you selected all of your zones, You don't have more options"
        data-tip-disable={hasZoneOptions}
        data-place='left'
        className='h-center mt-3 py-1'
      >
        <Button className='primary-color' onClick={onAddZone} disabled={!hasZoneOptions}>
          <FlexBox className='v-center px-3 ' spaceBetween>
            <RiAddCircleFill size={16} className='mr-2' />
            Add Zone
          </FlexBox>
        </Button>
      </FlexBox>

      <ToolTip />
    </FlexBox>
  );
};

const mapStateToProps = ({ taxZones }) => ({ taxZones });
export default connect(mapStateToProps)(CostsPerZone);
