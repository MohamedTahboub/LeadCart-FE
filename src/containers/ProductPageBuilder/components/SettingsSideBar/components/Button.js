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
  Tab,
} = common;

const { TextField, SelectOption, Slider } = InputRow;

const ButtonSection = (props) => {
  const {
    state: {
      modals: {
        sectionSetting = {}
      } = {}
    },
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
    <Tabs active='styles' className='padding-v-10 padding-h-10'>
      <Tab id='styles' title='styles'>
        <FlexBox center='v-center' spaceBetween>
          <span className='gray-text'>Position</span>
          <SelectOption
            name='styles.position'
            value={styles.position}
            onChange={onChange}
            options={[
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
              { label: 'Justified', value: 'justified' },
            ]}
          />
        </FlexBox>

        <FlexBox center='v-center margin-v-5' spaceBetween>
          <span className='gray-text'>Button Color</span>
          <MiniTwitterPicker
            name='styles.backgroundColor'
            value={styles.backgroundColor}
            onChange={onChange}
          />
        </FlexBox>
      </Tab>

      <Tab id='actions' title='actions'>
        <div className='border-left-text margin-top-20'>On Button Click Open:</div>
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
  );
};

ButtonSection.propTypes = {

};

export default ButtonSection;
