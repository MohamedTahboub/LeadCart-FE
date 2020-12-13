import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import Toggle from 'react-toggle';

import common from 'components/common';
import SelectInput from './select';

const { FlexBox, Button, Title } = common;


const ImageSliderSettings = ({ onAddNewImage, onChange, content = {} }) => {
  const {
    images = [],
    autoplay = true,
    transitionDuration = 1000,
    duration = 5000,
    hasArrows = true,
    infinite = true,
    isCustom = '',
    indicators = true
  } = content;


  return (
    <FlexBox column center='h-center'>
      <Button onClick={onAddNewImage}>
        <FlexBox className='v-center'>
          <FlexBox className='v-center' flex>
            <MdAddCircleOutline size={16} />
            <p className='m-0 ml-2'>Add New Image</p>
          </FlexBox>

          <p className='m-0'>{images.length}</p>
        </FlexBox>
      </Button>


      <FlexBox className='v-center my-2' spaceBetween >
        <Title className='flex-1'>Duration (ms)</Title>
        <input
          type='number'
          name='content.duration'
          className='max-width-100'
          min={0}
          value={duration}
          onChange={({ target: { name, value } }) => onChange({ value: value, name })}
        />
      </FlexBox>


      <FlexBox className='v-center my-2' spaceBetween >
        <Title className='flex-1'>Transition Duration (ms)</Title>
        <input
          type='number'
          name='content.transitionDuration'
          className='max-width-100'
          min={0}
          value={transitionDuration}
          onChange={({ target: { name, value } }) => onChange({ value: value, name })}
        />
      </FlexBox>


      <FlexBox className='v-center my-2' spaceBetween >
        <Title>Infinite</Title>
        <Toggle
          onChange={({ target: { name } }) => onChange({ value: !infinite, name })}
          name='content.infinite'
          checked={infinite}
        />
      </FlexBox>


      <FlexBox className='v-center my-2' spaceBetween >
        <Title>Autoplay</Title>
        <Toggle
          onChange={({ target: { name } }) => onChange({ value: !autoplay, name })}
          name='content.autoplay'
          checked={autoplay}
        />
      </FlexBox>


      <FlexBox className='v-center my-2' spaceBetween >
        <Title>Has Indicators</Title>
        <Toggle
          onChange={({ target: { name } }) => onChange({ value: !indicators, name })}
          name='content.indicators'
          checked={indicators}
        />
      </FlexBox>


      <FlexBox className='v-center my-2' spaceBetween >
        <Title>Has Arrows</Title>
        <Toggle
          onChange={({ target: { name } }) => onChange({ value: !hasArrows, name })}
          name='content.hasArrows'
          checked={hasArrows}
        />
      </FlexBox>


      {hasArrows && <SelectInput onChange={onChange} />}
    </FlexBox>
  );
};

export default ImageSliderSettings;
