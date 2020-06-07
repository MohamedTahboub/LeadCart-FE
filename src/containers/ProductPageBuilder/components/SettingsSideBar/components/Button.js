import React, { Fragment } from 'react';
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

const ButtonSection = (props) => {
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
              { label: 'Justified', value: 'justified' }
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
        <FlexBox center='v-center px-2' spaceBetween>
          <span className='gray-text bold-text'>Go To:</span>
          <SelectOption
            name='actions.type'
            value={sectionActions.type}
            onChange={onChange}
            options={[
              { label: 'Payment Form', value: 'paymentForm' },
              { label: 'External Link', value: 'external' }
            ]}
          />
        </FlexBox>
        {sectionActions.type === 'external' ? (
          <div className='px-2'>
            <span className='gray-text bold-text mb-2'>On Click Open:</span>
            <div className='padding-left-20'>
              <TextField
                name='actions.value'
                value={sectionActions.value}
                onChange={onChange}
              />
            </div>
          </div>
        ) : (sectionActions.type && (
          <span className='gray-text aligned-center mt-3'>
              When this Button clicked it will take the customer to the payment form section
          </span>
        ))}
      </Tab>


    </Tabs>
  );
};

ButtonSection.propTypes = {};

export default ButtonSection;
