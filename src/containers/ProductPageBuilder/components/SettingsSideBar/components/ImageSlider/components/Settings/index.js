import React, { useCallback } from 'react';
import clx from 'classnames';
import update from 'immutability-helper';


import common from 'components/common';
import { useContext } from '../../../../../../actions';
import InlinePopup from 'components/common/InlinePopup';
import AddItem from './AddItem';

import './style.css';

const { InputRow, FlexBox, Title } = common;
const { TextField, Toggle } = InputRow;

const ImageSliderSettings = () => {
  const {
    state:
     { modals: { sectionSetting = {} } = {} }
     = {},
    actions = {}
  } = useContext();

  const { content = {} } = sectionSetting;
  const {
    autoPlay,
    duration,
    transitionDuration,
    infinity,
    hasThumbnail,
    effect,
    list
  } = content;


  const effectsOptions = [
    { value: 'none', label: 'none' },
    { value: 'scale', label: 'Scale' },
    { value: 'opacity', label: 'Opacity' }
  ];

  const hasEffect = effect !== 'none';


  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };


  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const element = list[dragIndex];
    const newList = update(list, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, element]
      ]
    });

    onChange({ target: { name: 'list', value: newList } });
  }, [list]);


  return (
    <FlexBox className='image-slider-settings' column>
      <FlexBox className='mb-2 v-center'>
        <Title className='flex-1'>Has Thumbnails</Title>
        <Toggle
          value={hasThumbnail}
          onToggle={(target) => onChange({ target })}
          name='content.hasThumbnail'
        />
      </FlexBox>

      <FlexBox className='mb-2 v-center'>
        <Title className='flex-1'>Infinity Loop</Title>
        <Toggle
          value={infinity}
          onToggle={(target) => onChange({ target })}
          name='content.infinity'
        />
      </FlexBox>


      <InlinePopup
        title='Auto Play'
        popUpContent={(
          <FlexBox column>
            <FlexBox className='mb-2 v-center'>
              <Title className='flex-1'>Auto Play</Title>
              <Toggle
                value={autoPlay}
                onToggle={(target) => onChange({ target })}
                name='content.autoPlay'
              />
            </FlexBox>

            <FlexBox className='mb-2 v-center' >
              <Title className='flex-1'>Duration</Title>
              <TextField
                disabled={!autoPlay}
                value={duration}
                onChange={onChange}
                name='content.duration'
                type='number'
                min={0}
              />
            </FlexBox>
          </FlexBox>
        )}
      />

      <InlinePopup
        title='Effect'
        popUpContent={(
          <FlexBox column>
            <FlexBox center='mb-2 p-0' column>
              <Title>Effect Style</Title>
              <FlexBox className='v-center pl-2' spaceBetween>
                {effectsOptions.map(({ label, value }) => (
                  <FlexBox
                    className={clx('v-center h-center p-1 item-clickable mr-1 image-slider-effect-option', { 'active-image-slider-effect-option': value === effect })}
                    onClick={() => {onChange({ target: { value, name: 'content.effect' } });}}
                    flex
                  >
                    {label}
                  </FlexBox>
                ))}
              </FlexBox>
            </FlexBox>

            <FlexBox className='mb-2 v-center'>
              <Title className='flex-1'>Transition Duration</Title>
              <TextField
                disabled={!hasEffect}
                value={transitionDuration}
                onChange={onChange}
                name='content.transitionDuration'
                type='number'
                min={0}
              />
            </FlexBox>
          </FlexBox>
        )}
      />

      <AddItem moveCard={moveCard} />
    </FlexBox>
  );
};

export default ImageSliderSettings;
