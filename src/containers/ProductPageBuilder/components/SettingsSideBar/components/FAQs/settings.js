import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

import common from 'components/common';
import SelectInput from './select';

const { InputRow, FlexBox, MiniColorPicker } = common;
const { Label } = InputRow;


const FaqSettings = ({ onChange, onColorChange, onAddNewItem, styles, list }) => {

  const { iconsColor } = styles;

  return (
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
        <MiniColorPicker
          value={iconsColor}
          name='styles.iconsColor'
          onChange={onColorChange}
        />
      </FlexBox>

      <SelectInput onChange={onChange} />
    </FlexBox>
  );
};

export default FaqSettings;
