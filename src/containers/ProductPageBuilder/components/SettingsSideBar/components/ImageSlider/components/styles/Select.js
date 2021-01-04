import React, { Fragment } from 'react';
import Select from 'react-select';

import common from 'components/common';
import { options } from 'data/imageSliderIcons';

const { InputRow, FlexBox } = common;
const { Label, AddImage } = InputRow;

const SelectInput = ({ onChange, sectionSetting, disabled }) => {
  const { content: { customArrows, customPrevArrow = '', customNextArrow = '' } } = sectionSetting;

  const onSelectIconChange = (selectedOption) => {
    const { value } = selectedOption;
    onChange({ target: { name: 'content.customArrows', value } });
  };

  const onPrevArrowChange = (img) => {
    onChange({ target: { name: 'content.customPrevArrow', value: img } });
  };

  const onNextArrowChange = (img) => {
    onChange({ target: { name: 'content.customNextArrow', value: img } });
  };

  const [currentValue = {}] = options.filter((ele) => ele.value === customArrows);
  const { value } = currentValue;

  return (
    <Fragment>
      <div className='margin-v-5'>
        <Label>Control Arrows</Label>
        <Select
          options={options}
          onChange={onSelectIconChange}
          value={currentValue}
          isDisabled={disabled}
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
