import React from 'react';
import common from 'components/common';
import { useContext } from '../../../actions';

import { SettingBox } from './common';

const {
  MiniTwitterPicker,
  Tabs,
  Tab,
  InputRow
} = common;


const {
  Label,
  SelectOption
} = InputRow;

const PageSettings = () => {
  const {
    state: { product = {} },
    actions
  } = useContext();

  const { pageStyles = {} } = product;


  const onChange = ({ target }) => {
    actions.onProductFieldChange(target);
  };

  return (
    <Tabs active='settings' className='p-2 flex' tabsContentClassName='scrolling-70vh flex'>

      <Tab id='styles' title='Styles' >
        <SettingBox
          title='Size'
        >
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Product Width:
            </Label>
            <SelectOption
              value={pageStyles.widthMode}
              name='pageStyles.widthMode'
              onChange={onChange}
              options={[
                { label: 'Normal', value: 'normal' },
                { label: 'Wide', value: 'wide' }
              ]}
            />
          </InputRow>
        </SettingBox>
        <SettingBox
          title='Colors'
        >
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Screen Background Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.screenBackground'
              value={pageStyles.screenBackground}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Product Background Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.productBackground'
              value={pageStyles.productBackground}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Theme Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.themeColor'
              value={pageStyles.themeColor}
              onChange={onChange}
            />
          </InputRow>
        </SettingBox>

        <SettingBox title='Border Style'>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Border Radius:
            </Label>
            <SelectOption
              value={pageStyles.borderRadius}
              name='pageStyles.borderRadius'
              onChange={onChange}
              options={[
                { label: '0 px', value: '0' },
                { label: '1 px', value: '1' },
                { label: '2 px', value: '2' },
                { label: '3 px', value: '3' },
                { label: '4 px', value: '4' },
                { label: '5 px', value: '5' },
                { label: '6 px', value: '6' },
                { label: '7 px', value: '7' },
                { label: '8 px', value: '8' },
                { label: '9 px', value: '9' },
                { label: '10 px', value: '10' }
              ]}
            />
          </InputRow>
        </SettingBox>

      </Tab>
    </Tabs>
  );
};
PageSettings.propTypes = {};


export default PageSettings;
