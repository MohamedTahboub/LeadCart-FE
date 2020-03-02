import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { useContext } from '../../../actions';

import {
  SettingBox
} from './common';


const {
  // SideMenu,
  Tabs,
  // EditableField,
  InputRow,
  MiniTwitterPicker,
  FlexBox,
  Tab,
} = common;

const {
  TextField,
  // SelectOption
} = InputRow;

const ProgressBar = (props) => {
  const {
    state: {
      modals: {
        sectionSetting = {}
      } = {}
    },
    actions
  } = useContext();

  const { styles = {}, content = {} } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };


  return (
    <div>
      <Tabs active='settings' className='padding-v-10 padding-h-10'>
        <Tab id='settings' title='Settings'>
          <FlexBox center='v-center margin-v-5' spaceBetween>
            <span className='gray-text'>Progress Value:</span>
            <TextField
              type='number'
              name='content.value'
              min={0}
              max={100}
              value={content.value}
              onChange={onChange}
              className='width-70'
            />
          </FlexBox>
        </Tab>
        <Tab id='styles' title='styles'>
          <SettingBox title='Colors'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Bar Colors:</span>
              <MiniTwitterPicker
                name='styles.barColor'
                value={styles.barColor}
                onChange={onChange}
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Bar Background Colors:</span>
              <MiniTwitterPicker
                name='styles.barBackground'
                value={styles.barBackground}
                onChange={onChange}
              />
            </FlexBox>
          </SettingBox>
          <SettingBox title='Margins'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Margin Top:</span>
              <TextField
                name='styles.marginTop'
                type='number'
                value={styles.marginTop}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Margin bottom:</span>
              <TextField
                type='number'
                name='styles.marginBottom'
                value={styles.marginBottom}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
          </SettingBox>
          <SettingBox title='Paddings'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Padding Top:</span>
              <TextField
                name='styles.paddingTop'
                type='number'
                value={styles.paddingTop}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Padding bottom:</span>
              <TextField
                type='number'
                name='styles.paddingBottom'
                value={styles.paddingBottom}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
          </SettingBox>
        </Tab>
      </Tabs>
    </div>
  );
};

ProgressBar.propTypes = {

};

export default ProgressBar;
