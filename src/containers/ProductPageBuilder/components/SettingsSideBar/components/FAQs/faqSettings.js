import React from 'react';
import ids from 'shortid';
import { MdAddCircleOutline } from 'react-icons/md';

import common from 'components/common';
import { useContext } from '../../../../actions';
import SelectInput from './select';

const { Tabs, InputRow, FlexBox, Tab, MiniTwitterPicker } = common;
const { Label } = InputRow;
const newItem = { content: 'FAQ Text', title: 'FAQ Title' };


const FaqSettings = () => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const { styles = {}, content: { list = [] } = {} } = sectionSetting;
  const { iconsColor } = styles;

  const onChange = (field) => {
    return actions.onSectionSettingChange({
      section: sectionSetting,
      field
    });
  };

  const onAddNewItem = () => {
    onChange({
      name: 'content.list',
      value: [...list, { ...newItem, id: ids.generate() }]
    });
  };

  const onColorChange = ({ target: { value } }) => {
    onChange({
      name: 'styles.iconsColor',
      value
    });
  };

  return (
    <div className='faqs'>
      <Tabs active='settings' className='padding-v-10 padding-h-10'>
        <Tab id='settings' title='settings'>
          <FlexBox column center='h-center'>

            <FlexBox center='v-center margin-v-5 padding-right-20' spaceBetween>
              <Label>Add more:</Label>
              <FlexBox center='v-center' onClick={onAddNewItem}>
                <MdAddCircleOutline className='gray-text mx-2 item-clickable' />
                <span>
                  {list.length}
                </span>
              </FlexBox>
            </FlexBox>

            <FlexBox center='v-center margin-v-5 padding-right-20' spaceBetween>
              <Label>Points Color</Label>
              <MiniTwitterPicker
                value={iconsColor}
                onChange={onColorChange}
              />
            </FlexBox>

            <SelectInput onChange={onChange} />
          </FlexBox>
        </Tab>
      </Tabs>
    </div >
  );
};

export default FaqSettings;
