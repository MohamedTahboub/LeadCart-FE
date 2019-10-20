import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import {
  MenuItem, MenuTitle, MenuContent, MenuFlexContent
} from '../MenuElements';

import './style.css';

const {
  InputRow,
  MiniTwitterPicker,
  Collapse
} = common;

const { Panel } = Collapse;

const ConversionBoosters = ({
  product: {
    pagePreferences: {
      widgets: {
        progressBar = {},
        ...widgets
      } = {},
      features = {},
    } = {}
  } = {},
  ...props
}) => {
  const onChange = (name, value) => {
    props.onChange({
      target: {
        name,
        value
      }
    });
  };

  const onToggleFeatures = () => {
    onChange(
      'pagePreferences.features',
      { ...features, enabled: !features.enabled }
    );
  };
  const onProgressBarChange = ({ target: { name, value } }) => {
    if (name === 'enabled') value = value === 'on';
    onChange(
      'pagePreferences.widgets',
      {
        ...widgets,
        progressBar: {
          ...progressBar,
          [name]: value
        }
      }
    );
  };


  return (
    <MenuItem>
      <MenuTitle>Conversion Boosters</MenuTitle>
      <MenuContent>
        <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
          <Panel header='Features' key='1'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Show Section</InputRow.Label>
              <InputRow.SwitchInput
                value={features.enabled}
                name='enabled'
                onToggle={onToggleFeatures}
                className='sidebar-switch-input'
              />
            </InputRow>
          </Panel>
          <Panel header='Progress Bar' key='2'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Show Section</InputRow.Label>
              <InputRow.SwitchInput
                value={progressBar.enabled}
                name='enabled'
                onToggle={onProgressBarChange}
                className='sidebar-switch-input'
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Progress Bar Type:</InputRow.Label>
              <InputRow.SelectOption
                value={progressBar.type}
                name='type'
                // error={errors.assets && errors.assets.assetsType}
                onChange={onProgressBarChange}
                className='smooth-select'
                options={[
                  { label: 'Edgy Bar', value: 'edgy' },
                  { label: 'Rectangle Bar', value: 'rectangle' }
                ]}
              />
            </InputRow>
            <InputRow className='padding-v-10 '>
              <InputRow.Label className='sidebar-input-label'>Progress Bar Value(%):</InputRow.Label>
              <InputRow.TextField
                value={progressBar.value}
                type='number'
                min={0}
                max={100}
                name='value'
                className='progress-bar-input margin-left-20'
                onChange={onProgressBarChange}
              />
            </InputRow>
            <InputRow className='padding-v-10 '>
              <InputRow.Label className='sidebar-input-label'>Bar Label:</InputRow.Label>
              <InputRow.TextField
                value={progressBar.label}
                name='label'
                className='progress-bar-input margin-left-20'
                onChange={onProgressBarChange}
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
                Background:
              </InputRow.Label>
              <MiniTwitterPicker
                name='containerBackground'
                value={progressBar.color}
                onChange={onProgressBarChange}
              />
            </InputRow>
          </Panel>

        </Collapse>
      </MenuContent>
    </MenuItem>
  );
};

ConversionBoosters.propTypes = {

};

export default ConversionBoosters;
