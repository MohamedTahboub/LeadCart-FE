import React from 'react';
import Slider from 'rc-slider';

import { isFunction } from 'libs/checks';
import { FlexBox } from '../boxes';

import './style.css';


const CustomSlider = ({ onChange, label, className, ...props }) => {

  const onSliderChange = (arg) => {
    if (isFunction(onChange))
      onChange(arg);
  };


  return (
    <FlexBox className={className} column>
      <FlexBox className='v-center'>
        <p className='flex-1 custom-slider-label' >{label}</p>

        <input
          type='number'
          className='text-center custom-slider-input'
          {...props}
          onChange={({ target: { value } }) => onSliderChange(Number(value))}
        />
      </FlexBox>

      <Slider
        {...props}
        onChange={onSliderChange}
      />
    </FlexBox>
  );
};

export default CustomSlider;

