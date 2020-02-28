import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import ids from 'shortid';
import { useContext } from '../../../actions';
import {
  SettingBox
} from './common';


const emptyTestimonial = {
  author: 'edit author name!',
  content: 'click on text to edit content',
};

const {
  SideMenu,
  Tabs,
  EditableField,
  InputRow,
  MiniTwitterPicker,
  Button,
  FlexBox,
  Tab,
} = common;

const { TextField, SelectOption } = InputRow;

const TestimonialsSection = (props) => {
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
    actions: sectionActions = {},
    content: {
      list = []
    } = {}
  } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };

  const addNewColumn = () => {
    if (list.length <= 4) {
      list.id = ids.generate();
      actions.onSectionSettingChange({
        section: sectionSetting,
        field: {
          name: 'content.list',
          value: [...list, emptyTestimonial]
        }
      });
    }
  };

  return (
    <div>
      <Tabs active='settings' className='padding-v-10 padding-h-10'>
        <Tab id='settings' title='settings'>
          <div className='large-text border-left-text margin-top-20'>Testimonials</div>
          <div className='padding-left-20'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span
                data-tip='number of nested sections'
                className='gray-text'
              >
                Current Testimonials:
                {list.length}
              </span>
              <Button
                data-tip={(list.length >= 4) ? 'you can\'t add more than 4 testimonials' : ''}
                disabled={list.length >= 4}
                className='primary-btn'
                onClick={addNewColumn}
              >
                Add New Section
              </Button>
            </FlexBox>
          </div>
        </Tab>
        <Tab id='styles' title='styles'>

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

TestimonialsSection.propTypes = {

};

export default TestimonialsSection;
