import React, { Fragment } from 'react';
import Select from 'react-select';

import common from 'components/common';
import { options } from 'data/imageSliderIcons';
import { useContext } from '../../../../actions';

const { InputRow, FlexBox } = common;
const { Label, AddImage } = InputRow;

const SelectInput = ({ onChange }) => {
  const { state: { modals: { sectionSetting = {} } = {} } } = useContext();
  const { content: { isCustom, customPrevArrow = '', customNextArrow = '' } } = sectionSetting;

  const onSelectIconChange = (selectedOption) => {
    const { value } = selectedOption;
    onChange({ name: 'content.isCustom', value });
  };

  const onPrevArrowChange = (img) => {
    onChange({ name: 'content.customPrevArrow', value: img });
  };

  const onNextArrowChange = (img) => {
    onChange({ name: 'content.customNextArrow', value: img });
  };

  const [currentValue = {}] = options.filter((ele) => ele.value === isCustom);
  const { value } = currentValue;

  return (
    <Fragment>
      <div className='margin-v-5'>
        <Label>Control Arrows</Label>
        <Select
          options={options}
          onChange={onSelectIconChange}
          value={currentValue}
        />
      </div>

      {value === true &&
        <div>
          <FlexBox center='v-center margin-v-5'>
            <Label>Previous Custom Arrow</Label>
            <AddImage
              onUploaded={onPrevArrowChange}
              value={customPrevArrow}
            />
          </FlexBox>

          <FlexBox center='v-center margin-v-5'>
            <Label>Next Custom Arrow</Label>
            <AddImage
              onUploaded={onNextArrowChange}
              value={customNextArrow}
            />
          </FlexBox>
        </div>
      }
    </Fragment>
  );
};


export default SelectInput;
