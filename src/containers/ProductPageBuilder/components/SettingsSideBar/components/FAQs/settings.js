import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

import common from 'components/common';
import SelectInput from './select';

const { InputRow, FlexBox } = common;
const { Label } = InputRow;


const FaqSettings = ({ onChange, onAddNewItem, list }) => {
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
      <SelectInput onChange={onChange} />
    </FlexBox>
  );
};

export default FaqSettings;
