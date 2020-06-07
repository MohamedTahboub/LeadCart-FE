import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { useContext } from '../../../actions';

const {
  // SideMenu,
  Tabs,
  // EditableField,
  InputRow,
  // MiniTwitterPicker,
  FlexBox,
  Tab,
} = common;

const { TextField } = InputRow;

const Video = (props) => {
  const {
    state: {
      modals: {
        sectionSetting = {}
      } = {}
    },
    actions
  } = useContext();

  const {
    styles = {},
    content = {},
    // actions: sectionActions = {}
  } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };


  return (
    <div>
      <Tabs active='styles' className='padding-v-10 padding-h-10'>
        <Tab id='styles' title='styles'>
          <div className='large-text border-left-text'>Video</div>
          <div className='padding-left-20'>
            <FlexBox column center='v-center' flexStart>
              <span className='gray-text'>Video URL</span>
              <TextField
                name='content.value'
                value={content.value}
                onChange={onChange}
                // className='width-70'
              />
            </FlexBox>
          </div>

          <div className='large-text border-left-text margin-top-20'>Size</div>
          <div className='padding-left-20'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Video Height:</span>
              <TextField
                name='styles.height'
                type='number'
                value={styles.height}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Video Width:</span>
              <TextField
                type='number'
                name='styles.width'
                value={styles.width}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
          </div>

          <div className='large-text border-left-text margin-top-20'>Paddings</div>
          <div className='padding-left-20'>
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
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

Text.propTypes = {

};

export default Video;
