import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { useContext } from '../../../actions';

const {
  SideMenu,
  Tabs,
  EditableField,
  InputRow,
  MiniTwitterPicker,
  FlexBox,
  Tab
} = common;

const { TextField, SelectOption, Slider } = InputRow;

const Text = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const { styles = {}, actions: sectionActions = {} } = sectionSetting;

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
          <div className='large-text border-left-text'>Font</div>
          <div className='padding-left-20'>
            <FlexBox center='v-center' spaceBetween>
              <span className='gray-text'>Font Size</span>
              <TextField
                type='number'
                name='styles.fontSize'
                value={styles.fontSize}
                className='width-70'
                onChange={onChange}
              />
            </FlexBox>
            <FlexBox column center='v-center' flexStart>
              <span className='gray-text'>Font Family</span>
              <SelectOption
                name='styles.fontFamily'
                value={styles.fontFamily}
                onChange={onChange}
                options={[
                  { label: 'Helvetica', value: '\'Helvetica\', Arial, sans-serif' },
                  { label: 'Cairo', value: '\'Cairo\', sans-serif' },
                  { label: 'Modak', value: '\'Modak\', cursive' },
                  { label: 'Merriweather', value: '\'Merriweather\', serif' },
                  // { label: 'Calibri', value: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif' },
                  // { value: 'Georgia', label: 'Georgia' },
                  { value: 'Dancing Script, cursive', label: 'Dancing Script' },
                  // { value: 'Palatino Linotype', label: 'Palatino Linotype' },
                  // { value: 'Book Antiqua', label: 'Book Antiqua' },
                  { value: 'Courier New', label: 'Courier, monospace' }
                  // { value: 'Arial', label: 'Arial' },
                  // { value: 'Lucida Console', label: 'Lucida Console' },
                  // { value: 'Helvetica', label: 'Helvetica' },
                  // { value: 'Arial Black', label: 'Arial Black' },
                  // { value: 'Lucida Sans Unicode', label: 'Lucida Sans Unicode' },
                  // { value: 'Times New Roman', label: 'Times New Roman' }
                ]}
              />
            </FlexBox>
          </div>


          <div className='large-text border-left-text margin-top-20'>Colors</div>
          <div className='padding-left-20'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>BackGround Color</span>
              <MiniTwitterPicker
                name='styles.backgroundColor'
                value={styles.backgroundColor}
                onChange={onChange}
              />
            </FlexBox>
          </div>
        </Tab>
        <Tab id='actions' title='actions'>
          <div className='border-left-text margin-top-20'>On Section Click Open:</div>
          <div className='padding-left-20'>
            <TextField
              name='actions.onClick'
              value={sectionActions.onClick}
              onChange={onChange}
            // className='width-70'
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

Text.propTypes = {};

export default Text;
