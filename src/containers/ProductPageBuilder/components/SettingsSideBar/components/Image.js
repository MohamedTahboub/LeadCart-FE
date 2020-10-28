import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { useContext } from '../../../actions';
import { SettingBox } from './common';
const {
  SideMenu,
  Tabs,
  EditableField,
  InputRow,
  MiniColorPicker,
  FlexBox,
  Tab,
} = common;

const { TextField, SelectOption, AddImage } = InputRow;

const Image = (props) => {
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

  const onImageChange = (image) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'content.value',
        value: image
      }
    });
  };

  return (
    <div>
      <Tabs active='styles' className='padding-v-10 padding-h-10'>
        <Tab id='styles' title='styles'>
          <SettingBox title='Image'>
            <FlexBox center='v-center' spaceBetween>
              <span className='gray-text'>Upload Image</span>
              <AddImage
                value={content.value}
                subLabel='Logo'
                source='product_image'
                name='logo'
                onUploaded={onImageChange}
              />
            </FlexBox>
          </SettingBox>


          <SettingBox title='Size'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Image Height:</span>
              <TextField
                name='styles.height'
                type='number'
                value={styles.height}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Image Width:</span>
              <TextField
                type='number'
                name='styles.width'
                value={styles.width}
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
              <span className='gray-text '>Padding bottom:</span>
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

Text.propTypes = {

};

export default Image;
